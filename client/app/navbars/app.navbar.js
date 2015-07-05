Template.navbarHeaderNav.events({
  'click #navbarBrandLink':function(){
    $('#westPanel').sidebar('toggle');
  },
  'click #eastPanelToggleLink':function(){
    $('#eastPanel').sidebar('toggle');
  }
});


Template.navbarFooterNav.events({
  'click #fullScreenToggleLink':function(){
    $('#errorPanel').sidebar('toggle');
  },
  "click .toggleInfoPanel": function(event, template){
    Session.toggle('isHidden');
  },
  'click #dataSubmitButton':function(){

    StatsCounter.incrementTodayCount()

    /*var todaySats = DailyStats.find({dateIncrement: moment().format('YYYYMMDD')});

    if(todaySats.count() === 0){
      DailyStats.insert({
        date: moment().format("MM-DD-YYYY"),
        dateIncrement: moment().format('YYYYMMDD'),
        daily_total: 1
      });
    }else{
      todaySats.forEach(function(doc){
        DailyStats.update({_id: doc._id}, {$inc: {
          daily_total: 1
        }});
      });
    }*/


  }
});
