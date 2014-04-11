
Deps.autorun(function(){
  if(Meteor.userId()){
    if(Meteor.user()){
      if(Meteor.user().profile.role == "Admin"){
        Meteor.subscribe('cumulativeLineData');
        Meteor.subscribe('scatterChartData');
      }
    }
  }
});


