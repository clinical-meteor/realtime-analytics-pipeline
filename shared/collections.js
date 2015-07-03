


DailyStats = new Meteor.Collection('interactionsDaily');
DailyStats.allow({
  insert: function(){
    return true;
  },
  update: function () {
    return true;
  },
  remove: function(){
    return true;
  }
})
