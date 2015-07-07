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
    //StatsCounter.incrementTodayCount();
    StatsCounter.incrementCount("dailyTotal");
  },
  'click #addBucketA':function(){
    StatsCounter.incrementCount("bucketA");
  },
  'click #addBucketB':function(){
    StatsCounter.incrementCount("bucketB");
  },
  'click #addBucketC':function(){
    StatsCounter.incrementCount("bucketC");
  }
});
