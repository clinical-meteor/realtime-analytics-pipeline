





Template.DailyStats.events({
  "click #elementId": function(event, template){

  }
});


Template.DailyStats.helpers({
  getMostRecentDate:function(){
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
  }
});
