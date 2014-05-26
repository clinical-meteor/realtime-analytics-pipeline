Meteor.startup(function(){
  if(DailyStats.find().count() === 0){

    var data = [
      {
          "date" : "05-06-2014",
          "dateIncrement" : 20140506,
          "daily_total" : 3
      },
      {
          "date" : "05-07-2014",
          "dateIncrement" : 20140507,
          "daily_total" : 4
      },
      {
          "date" : "05-8-2014",
          "dateIncrement" : 20140508,
          "daily_total" : 10
      },
      {
          "date" : "05-9-2014",
          "dateIncrement" : 20140509,
          "daily_total" : 8
      },
      {
          "date" : "05-10-2014",
          "dateIncrement" : 20140510,
          "daily_total" : 12
      },
      {
          "date" : "05-11-2014",
          "dateIncrement" : 20140511,
          "daily_total" : 15
      },
      {
          "date" : "05-12-2014",
          "dateIncrement" : 20140512,
          "daily_total" : 14
      },
      {
          "date" : "05-13-2014",
          "dateIncrement" : 20140513,
          "daily_total" : 15
      },
      {
          "date" : "05-14-2014",
          "dateIncrement" : 20140514,
          "daily_total" : 8
      },
      {
          "date" : "05-15-2014",
          "dateIncrement" : 20140515,
          "daily_total" : 13
      },
      {
          "date" : "05-16-2014",
          "dateIncrement" : 20140516,
          "daily_total" : 15
      },
      {
          "date" : "05-17-2014",
          "dateIncrement" : 20140517,
          "daily_total" : 16
      },
      {
          "date" : "05-18-2014",
          "dateIncrement" : 20140518,
          "daily_total" : 20
      },
      {
          "date" : "05-19-2014",
          "dateIncrement" : 20140519,
          "daily_total" : 40
      },
      {
          "date" : "05-20-2014",
          "dateIncrement" : 20140520,
          "daily_total" : 32
      },
      {
          "date" : "05-21-2014",
          "dateIncrement" : 20140521,
          "daily_total" : 34
      },
      {
          "date" : "05-22-2014",
          "dateIncrement" : 20140522,
          "daily_total" : 24
      },
      {
          "date" : "05-23-2014",
          "dateIncrement" : 20140523,
          "daily_total" : 23
      },
      {
          "date" : "05-24-2014",
          "dateIncrement" : 20140524,
          "daily_total" : 35
      },
      {
          "date" : "05-25-2014",
          "dateIncrement" : 20140525,
          "daily_total" : 52
      }





    ];

    for (var i = 0; i < data.length; i++) {
      DailyStats.insert(data[i]);
    }

  }
});
