Meteor.startup(function(){
  console.log('starting statistics writer....');

  var queryObject = { _id: { $gt: objectIdWithTimestamp(moment().format('YYYY/MM/DD'))}};
  console.log(queryObject);

  var dataCursor = Interactions.find(queryObject,{limit:20, sort: {$natural: -1}});

  var initFinished = false;
  var handle = dataCursor.observeChanges({
    added: function (id, record) {
      if(initFinished){
        console.log("Received an interaction! " + id);
        console.log(record);

        if(!/monitis/.test(record.user_agent)){

          // it's a valid record; solets add it to our stats
          Campaigns.update({_id: record.campaign_id}, {$inc:{
            'statistics.total_interactions': 1
          }});

          updateHourlyInteractions(id, record.campaign_id);
          updateEngagementData(record.campaign_id, record);
          updateDailyInteractions(id, record);
        }

      }
    },
    removed: function () {
      console.log("Lost one.");
    }
  });
  initFinished = true;

});

updateDailyInteractions = function(id, record){


  // we have a new record; first thing to do is discard it if its a monitoring interaction
  if(!/monitis/.test(record.user_agent)){

    // now lets set some default values for each browser type
    var safariCount = 0;
    var chromeCount = 0;
    var androidCount = 0;
    var firefoxCount = 0;
    var msieCount = 0;
    var blackberryCount = 0;
    var otherCount = 0;

    // and parse the user agent string, and figure out which browser to increment
    if(/Safari/.test(record.user_agent)){
      safariCount = 1;
    }else if(/Chrome/.test(record.user_agent)){
      chromeCount = 1;
    }else if(/Android/.test(record.user_agent)){
      androidCount = 1;
    }else if(/Firefox/.test(record.user_agent)){
      firefoxCount = 1;
    }else if(/MSIE/.test(record.user_agent)){
      msieCount = 1;
    }else if(/BlackBerry/.test(record.user_agent)){
      blackberryCount = 1;
    }else{
      otherCount = 1;
    }

    // next, we get the timestamp from the record _id
    var date = new Date(parseInt(id._str.slice(0,8), 16) *1000);

    // and see if we've already created a daily total for that date in this campaign
    var dateRecord = InteractionsDaily.findOne({
      //date: (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear(),
      dateIncrement: date.getFullYear() + (date.getMonth() + 1) + date.getDate(),
      campaign_id: record.campaign_id._str
    });


    if(dateRecord){
      // if there's a date record, we update it with the stats
      InteractionsDaily.update({_id: dateRecord._id},{$inc:{
        daily_total: 1,
        safari_total: safariCount,
        chrome_total: chromeCount,
        blackberry_total: blackberryCount,
        msie_total: msieCount,
        firefox_total: firefoxCount,
        android_total: androidCount,
        other_total: otherCount
      }});
    }else{
      // otherwise, we need to create a new record
      InteractionsDaily.insert({
        // and assign it some date info that we can later lookup and sort against
        date: (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear(),
        dateIncrement: date.getFullYear() + (date.getMonth() + 1) + date.getDate(),
        campaign_id: record.campaign_id._str,

        // and then assign some default stats
        daily_total: 1,
        safari_total: safariCount,
        chrome_total: chromeCount,
        blackberry_total: blackberryCount,
        msie_total: msieCount,
        firefox_total: firefoxCount,
        android_total: androidCount,
        other_total: otherCount
      });
    }

  }
}



updateEngagementData = function(selectedCampaignId, record){
  // lets check that it's not a monitoring record
  //if(!/monitis/.test(record.user_agent)){

    // operating system
    if(/Macintosh/.test(record.user_agent)){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.operating_system.macintosh': 1
      }});
    }else if(/Android/.test(record.user_agent)){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.operating_system.android': 1
      }});
    }else if(/iPhone/.test(record.user_agent)){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.operating_system.iphone': 1
      }});
    }else if(/iPad/.test(record.user_agent)){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.operating_system.ipad': 1
      }});
    }else if(/Windows/.test(record.user_agent)){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.operating_system.windows': 1
      }});
    }else if(/BlackBerry/.test(record.user_agent)){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.operating_system.blackberry': 1
      }});
    }else{
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.operating_system.other': 1
      }});
    }



    // browsers
    if(/Safari/.test(record.user_agent)){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.browser_types.safari': 1
      }});
    }else if(/Chrome/.test(record.user_agent)){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.browser_types.chrome': 1
      }});
    }else if(/Android/.test(record.user_agent)){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.browser_types.android': 1
      }});
    }else if(/Firefox/.test(record.user_agent)){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.browser_types.firefox': 1
      }});
    }else if(/MSIE/.test(record.user_agent)){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.browser_types.msie': 1
      }});
    }else if(/BlackBerry/.test(record.user_agent)){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.browser_types.blackberry': 1
      }});
    }else{
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.browser_types.other': 1
      }});
    }

  //}
};





updateHourlyInteractions = function(interactionId, selectedCampaignId){

  // lets check that it's not a monitoring record
  //if(!/monitis/.test(record.user_agent)){

  var date = new Date(parseInt(interactionId._str.slice(0,8), 16) * 1000);

    if(date.getHours() === 0){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.hourly_interactions.a_oclock': 1
      }});
    }
    if(date.getHours() === 1){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.hourly_interactions.b_oclock': 1
      }});
    }
    if(date.getHours() === 2){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.hourly_interactions.c_oclock': 1
      }});
    }
    if(date.getHours() === 3){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.hourly_interactions.d_oclock': 1
      }});
    }
    if(date.getHours() === 4){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.hourly_interactions.e_oclock': 1
      }});
    }
    if(date.getHours() === 5){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.hourly_interactions.f_oclock': 1
      }});
    }
    if(date.getHours() === 6){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.hourly_interactions.g_oclock': 1
      }});
    }
    if(date.getHours() === 7){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.hourly_interactions.h_oclock': 1
      }});
    }
    if(date.getHours() === 8){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.hourly_interactions.i_oclock': 1
      }});
    }
    if(date.getHours() === 9){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.hourly_interactions.j_oclock': 1
      }});
    }
    if(date.getHours() === 10){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.hourly_interactions.k_oclock': 1
      }});
    }
    if(date.getHours() === 11){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.hourly_interactions.l_oclock': 1
      }});
    }
    if(date.getHours() === 12){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.hourly_interactions.m_oclock': 1
      }});
    }
    if(date.getHours() === 13){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.hourly_interactions.n_oclock': 1
      }});
    }
    if(date.getHours() === 14){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.hourly_interactions.o_oclock': 1
      }});
    }
    if(date.getHours() === 15){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.hourly_interactions.p_oclock': 1
      }});
    }
    if(date.getHours() === 16){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.hourly_interactions.q_oclock': 1
      }});
    }
    if(date.getHours() === 17){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.hourly_interactions.r_oclock': 1
      }});
    }
    if(date.getHours() === 18){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.hourly_interactions.s_oclock': 1
      }});
    }
    if(date.getHours() === 19){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.hourly_interactions.t_oclock': 1
      }});
    }
    if(date.getHours() === 20){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.hourly_interactions.u_oclock': 1
      }});
    }
    if(date.getHours() === 21){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.hourly_interactions.v_oclock': 1
      }});
    }
    if(date.getHours() === 22){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.hourly_interactions.w_oclock': 1
      }});
    }
    if(date.getHours() === 23){
      Campaigns.update({_id: selectedCampaignId}, {$inc:{
        'statistics.hourly_interactions.x_oclock': 1
      }});
    }

  //}
};
