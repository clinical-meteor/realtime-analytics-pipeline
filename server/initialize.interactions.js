Meteor.startup(function(){
  if(DailyStats.find().count() === 0){

    var data = [
      {
          "date" : "06-06-2013",
          "dateIncrement" : 20130606,
          "daily_total" : 3
      },
      {
          "date" : "06-07-2013",
          "dateIncrement" : 20130607,
          "daily_total" : 3
      },
      {
          "date" : "06-10-2013",
          "dateIncrement" : 20130610,
          "daily_total" : 4
      },
      {
          "date" : "06-11-2013",
          "dateIncrement" : 20130611,
          "daily_total" : 5
      },
      {
          "date" : "06-12-2013",
          "dateIncrement" : 20130612,
          "daily_total" : 3
      },
      {
          "date" : "06-13-2013",
          "dateIncrement" : 20130613,
          "daily_total" : 4
      },
      {
          "date" : "06-14-2013",
          "dateIncrement" : 20130614,
          "daily_total" : 4
      },
      {
          "date" : "06-17-2013",
          "dateIncrement" : 20130617,
          "daily_total" : 5
      },
      {
          "date" : "06-18-2013",
          "dateIncrement" : 20130618,
          "daily_total" : 8
      },
      {
          "date" : "06-19-2013",
          "dateIncrement" : 20130619,
          "daily_total" : 3
      },
      {
          "date" : "10-11-2013",
          "dateIncrement" : 20131011,
          "daily_total" : 7
      },
      {
          "date" : "10-17-2013",
          "dateIncrement" : 20131017,
          "daily_total" : 4
      },
      {
          "date" : "10-31-2013",
          "dateIncrement" : 20131031,
          "daily_total" : 2
      }

    ];

    for (var i = 0; i < data.length; i++) {
      DailyStats.insert(data[i]);
    }

  }
});
