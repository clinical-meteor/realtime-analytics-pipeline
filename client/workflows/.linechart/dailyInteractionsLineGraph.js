Graphs.renderDailyInteractionsDailyStats = function(){
  console.log('Graphs.renderDailyInteractionsDailyStats');

  // var nullrecord = [
  //   {x:0, y:0}
  // ];

  //if(Meteor.user()){
    //var campaignRecord = Campaigns.findOne({_id: Meteor.user().profile.selected_campaign_id });
    //console.log('campaignRecord: ' + campaignRecord);

    //var totalData = DailyStats.find({},{sort:{dateIncrement: 'asc'}}).fetch();
    //var totalData = DailyStats.find({},{sort: {dateIncrement: -1}}).fetch();
    //var firefoxData = DailyStats.find({},{sort:{dateIncrement: -1}}).fetch();
    //var safariData = DailyStats.find({},{sort:{dateIncrement: -1}}).fetch();


    var data = [{
      color: "#45b76f",
      key: "Total",
      values: DailyStats.find().fetch()
    }
    ];



    var chart;
    nv.addGraph({
      generate: function(){
        console.log('generating dailyInteractionsDailyStats...');

        var width = $('#dailyInteractionsDailyStats').width();

        $('#dailyInteractionsDailyStats').height($('#dailyInteractionsDailyStatsPanel').height() - 20);
        var height = $('#dailyInteractionsDailyStats').height();
        if(height > 380){
          height = 380;
        }
        width = width - 40;

        chart = nv.models.lineChart()
          .x(function(d) { return moment(d.date); })
          .y(function(d) { return d.daily_total; })
          .forceY([0,100])
          .color(d3.scale.category20().range())
          .useInteractiveGuideline(true)
          .clipVoronoi(false);

        chart.xAxis
          .tickFormat(function(d) {
            return d3.time.format('%x')(new Date(d));
          });

        chart.yAxis
          .tickFormat(d3.format(''));

        d3.select('#dailyInteractionsDailyStats svg')
          .attr('width', width)
          .attr('height', height)
          .datum(data)
          .call(chart);

        nv.utils.windowResize(chart.update);

        //chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

        return chart;
      },
      callback: function(graph){
        window.onresize = function () {
          var width = $('#dailyInteractionsDailyStats').width();
          var height =  $('#dailyInteractionsDailyStats').height();
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

          d3.select('#dailyInteractionsDailyStats svg')
            .attr('width', width)
            .attr('height', height)
            .call(graph);
        };
      }
    });
  //}
};
