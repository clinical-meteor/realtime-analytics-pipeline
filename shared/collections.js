// InteractionsDaily = new Meteor.Collection("interactionsDaily");
// InteractionsDaily.allow({
//   insert: function(){
//     return true;
//   },
//   update: function () {
//     return true;
//   },
//   remove: function(){
//     return true;
//   }
// });
// Interactions = new Meteor.Collection("interactions");
// Interactions.allow({
//   insert: function(){
//     return true;
//   },
//   update: function () {
//     return true;
//   },
//   remove: function(){
//     return true;
//   }
// });


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
