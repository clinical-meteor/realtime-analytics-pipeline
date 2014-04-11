renderDailyInteractionsLineChart = function(){
  console.log('renderDailyInteractionsLineChart');

  var nullrecord = [
    {x:0, y:0}
  ];

  if(Meteor.user()){
    var campaignRecord = Campaigns.findOne({_id: Meteor.user().profile.selected_campaign_id });
    console.log('campaignRecord: ' + campaignRecord);

    var totalData = InteractionsDaily.find({},{sort:{dateIncrement: -1}}).fetch();
    var firefoxData = InteractionsDaily.find({},{sort:{dateIncrement: -1}}).fetch();
    var safariData = InteractionsDaily.find({},{sort:{dateIncrement: -1}}).fetch();
    var chromeData = InteractionsDaily.find({},{sort:{dateIncrement: -1}}).fetch();
    var blackberryData = InteractionsDaily.find({},{sort:{dateIncrement: -1}}).fetch();
    var msieData = InteractionsDaily.find({},{sort:{dateIncrement: -1}}).fetch();
    var otherData = InteractionsDaily.find({},{sort:{dateIncrement: -1}}).fetch();

    firefoxData.map(function(doc, i){
      doc.daily_total = doc.firefox_total;
    });
    safariData.map(function(doc, i){
      doc.daily_total = doc.safari_total;
    });
    chromeData.map(function(doc, i){
      doc.daily_total = doc.chrome_total;
    });
    blackberryData.map(function(doc, i){
      doc.daily_total = doc.blackberry_total;
    });
    msieData.map(function(doc, i){
      doc.daily_total = doc.msie_total;
    });
    otherData.map(function(doc, i){
      doc.daily_total = doc.other_total;
    });

    var data = [{
      color: "#45b76f",
      key: "Total",
      values: totalData
    },
    {
      color: "#a7a2af",
      key: "Safari",
      values: safariData
    },
    {
      color: "#616387",
      key: "Firefox",
      values: firefoxData
    },
    {
      color: "#7e7fae",
      key: "Chrome",
      values: chromeData
    },
    {
      color: "#969ac8",
      key: "Blackberry",
      values: blackberryData
    },
    {
      color: "#abbbce",
      key: "Internet Explorer",
      values: msieData
    },
    {
      color: "#aec7e8",
      key: "Other",
      values: otherData
    }
    ];



    var chart;
    nv.addGraph({
      generate: function(){
        console.log('generating dailyInteractionsLineChart...');

        var width = $('#dailyInteractionsLineChart').width();

        $('#dailyInteractionsLineChart').height($('#dailyInteractionsLineChartPanel').height() - 20);
        var height = $('#dailyInteractionsLineChart').height();
        if(height > 380){
          height = 380;
        }
        width = width - 40;

        chart = nv.models.lineChart()
          .x(function(d) { return moment(d.date); })
          .y(function(d) { return d.daily_total; })
          .color(d3.scale.category20().range())
          .useInteractiveGuideline(true)
          .clipVoronoi(false);

        chart.xAxis
          .tickFormat(function(d) {
            return d3.time.format('%x')(new Date(d));
          });

        chart.yAxis
          .tickFormat(d3.format(''));

        d3.select('#dailyInteractionsLineChart svg')
          .attr('width', width)
          .attr('height', height)
          .datum(data)
          .call(chart);

        nv.utils.windowResize(chart.update);

        chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

        return chart;
      },
      callback: function(graph){
        window.onresize = function () {
          var width = $('#dailyInteractionsLineChart').width();
          var height =  $('#dailyInteractionsLineChart').height();
          var margin = graph.margin();

          if (width < margin.left + margin.right + 20){
            width = margin.left + margin.right + 20;
          }else{
            width = width - 40;
          }

          if (height < margin.top + margin.bottom + 20){
            height = margin.top + margin.bottom + 20;
          }
          if(height > 380){
            height = 380;
          }

          graph.width(width).height(height);

          d3.select('#dailyInteractionsLineChart svg')
            .attr('width', width)
            .attr('height', height)
            .call(graph);
        };
      }
    });
  }
};
