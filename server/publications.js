
Meteor.startup(function(){
  Meteor.publish('interactionsDaily', function(){
    return DailyStats.find();
  });
});
