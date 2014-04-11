renderHourlyInteractionsBarGraph = function(){
  console.log('renderHourlyInteractionsBarGraph');


  var nullrecord = [
    {x:0, y:0},
    {x:1, y:0},
    {x:2, y:0},
    {x:3, y:0},
    {x:4, y:0},
    {x:5, y:0},
    {x:6, y:0},
    {x:7, y:0},
    {x:8, y:0},
    {x:9, y:0},
    {x:10, y:0},
    {x:11, y:0},
    {x:12, y:0},
    {x:13, y:0},
    {x:14, y:0},
    {x:15, y:0},
    {x:16, y:0},
    {x:17, y:0},
    {x:18, y:0},
    {x:19, y:0},
    {x:20, y:0},
    {x:21, y:0},
    {x:22, y:0},
    {x:23, y:0}
  ];

  if(Meteor.user()){
    var hourlyStats = null;
    var campaignRecord = Campaigns.findOne({_id: Meteor.user().profile.selected_campaign_id });
    console.log('campaignRecord: ' + campaignRecord);

    if(campaignRecord){
      if(campaignRecord.statistics){
        hourlyStats = [
          {x:0, y:campaignRecord.statistics.hourly_interactions.a_oclock},
          {x:1, y:campaignRecord.statistics.hourly_interactions.b_oclock},
          {x:2, y:campaignRecord.statistics.hourly_interactions.c_oclock},
          {x:3, y:campaignRecord.statistics.hourly_interactions.d_oclock},
          {x:4, y:campaignRecord.statistics.hourly_interactions.e_oclock},
          {x:5, y:campaignRecord.statistics.hourly_interactions.f_oclock},
          {x:6, y:campaignRecord.statistics.hourly_interactions.g_oclock},
          {x:7, y:campaignRecord.statistics.hourly_interactions.h_oclock},
          {x:8, y:campaignRecord.statistics.hourly_interactions.i_oclock},
          {x:9, y:campaignRecord.statistics.hourly_interactions.j_oclock},
          {x:10, y:campaignRecord.statistics.hourly_interactions.k_oclock},
          {x:11, y:campaignRecord.statistics.hourly_interactions.l_oclock},
          {x:12, y:campaignRecord.statistics.hourly_interactions.m_oclock},
          {x:13, y:campaignRecord.statistics.hourly_interactions.n_oclock},
          {x:14, y:campaignRecord.statistics.hourly_interactions.o_oclock},
          {x:15, y:campaignRecord.statistics.hourly_interactions.p_oclock},
          {x:16, y:campaignRecord.statistics.hourly_interactions.q_oclock},
          {x:17, y:campaignRecord.statistics.hourly_interactions.r_oclock},
          {x:18, y:campaignRecord.statistics.hourly_interactions.s_oclock},
          {x:19, y:campaignRecord.statistics.hourly_interactions.t_oclock},
          {x:20, y:campaignRecord.statistics.hourly_interactions.u_oclock},
          {x:21, y:campaignRecord.statistics.hourly_interactions.v_oclock},
          {x:22, y:campaignRecord.statistics.hourly_interactions.w_oclock},
          {x:23, y:campaignRecord.statistics.hourly_interactions.x_oclock}
        ]
      }else{
        hourlyStats = nullrecord;
      }
    }else{
      hourlyStats = nullrecord;
    }

    var data = [{
      color: "#aec7e8",
      key: "Number Interaction",
      values: hourlyStats.map(function(record){
        return {x: record.x, y: record.y};
      })
      //values: MultiBarData.find({},{$sort: {x: 1}}).fetch()
    }];

    var chart;
    nv.addGraph({
      generate: function(){
        console.log('generating multiChart...');

          var width = $('#hourlyInteractionsBarChart').width();

          $('#hourlyInteractionsBarChart').height($('#hourlyInteractionsBarChartPanel').height() - 20);
          var height = $('#hourlyInteractionsBarChart').height();
          if(height > 400){
            height = 400;
          }
          width = width - 40;

          chart = nv.models.multiBarChart()
            .x(function(d) { return d.x })
            .y(function(d) { return d.y })
            .tooltips(false);
          //.showControls(false);

          chart.xAxis
            .showMaxMin(true)
            .tickFormat(d3.format(',f'));

          chart.yAxis
            .tickFormat(d3.format(',.1f'));

          d3.select('#hourlyInteractionsBarChart svg')
            .datum(data)
            //.transition().duration(500)
            .attr('width', width)
            .attr('height', height)
            .call(chart);

          nv.utils.windowResize(chart.update);

        return chart;
      },
      callback: function(graph){
        console.log('hourlyInteractionsBarChart callback');
        window.onresize = function () {
          console.log('hourlyInteractionsBarChart callback | window.onresize');
          try{
            var width = $('#hourlyInteractionsBarChart').width();
            var height = $('#hourlyInteractionsBarChart').height();

            var margin = graph.margin();

            if (width < margin.left + margin.right + 20){
              width = margin.left + margin.right + 20;
            }else{
              width = width - 40;
            }
            console.log('hourlyInteractionsBarChart.width: ' + width);

  //        if (height < margin.top + margin.bottom + 20){
  //          height = margin.top + margin.bottom + 20;
  //        }
  //        if(height > 400){
  //          height = 400;
  //        }

            graph.width(width).height(height);

            d3.select('#hourlyInteractionsBarChart svg')
              .attr('width', width)
              //.attr('height', height)
              .call(graph);
          }catch(message){
            console.error(message);
          }



        };
     }
    });
  }
};
