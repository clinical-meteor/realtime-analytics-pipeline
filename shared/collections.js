Interactions = new Meteor.Collection("interactions");
Interactions.allow({
  insert: function(){
    return true;
  },
  update: function () {
    return true;
  },
  remove: function(){
    return true;
  }
});

InteractionsDaily = new Meteor.Collection("interactionsDaily");
InteractionsDaily.allow({
  insert: function(){
    return true;
  },
  update: function () {
    return true;
  },
  remove: function(){
    return true;
  }
});

