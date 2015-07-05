
Session.setDefault('selected_campaign_record', false);


//------------------------------------------------
// ROUTING

Router.map(function(){
  this.route('dashboardPageRoute', {
    path: '/',
    template: 'dashboardPage',
    waitOn: function(){
      Meteor.subscribe ('interactionsDaily');
    },
    onAfterAction: function() {
      Graphs.renderDailyInteractionsDailyStats();
    }
  });
});

//------------------------------------------------
// HELPERS


Template.dashboardPage.helpers({
  /*getMostRecentDate:function(){
    var record = DailyStats.find({},{sort:{dateIncrement: -1}}).fetch()[0];

    if(record){
      var date = moment(record.date);
      return date.add('days',1).format('MM-DD-YYYY');
    }else{
      return "";
    }
  },
  dailyStatsResized: function() {
    Graphs.renderDailyInteractionsDailyStats();
    return Session.get('resize');
  },
  destroyed: function() {
    this.handle && this.handle.stop();
    $('#dailyInteractionsDailyStats').html('<svg id="dailyInteractionsDailyStatsCanvas"></svg>');
  }*/
});

Template.dashboardPage.events({
  /*'click #dataSubmitButton':function(){
    var date = moment($('#dateInput').val(), "MM-DD-YYYY");

    var dataObject = {
      date: $('#dateInput').val(),
      daily_total: $('#valueInput').val(),
      dateIncrement: date.format('YYYYMMDD')
    }
    if(dataObject.daily_total < 0){
      alert('Value must be above 0 and below 100!');
    }else if(dataObject.daily_total > 100){
      alert('Value must be above 0 and below 100!');
    }else{
      DailyStats.insert(dataObject);
    }
  }*/
});
