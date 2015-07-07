Session.setDefault('resize', null);

Meteor.startup(function(){
  $(window).resize(function(evt) {
    Session.set("resize", new Date());
  });

  DailyStats.configure({
    totalDataBucketConfig: {
      color: "#45b76f",
      label: "Total"
    },
    bucketA: {
      color: "#E68A2E",
      label: "Foo"
    },
    bucketB: {
      color: "#80B2FF",
      label: "Bar"
    },
    bucketC: {
      color: "#DB4D4D",
      label: "Squee"
    }
  });

});
