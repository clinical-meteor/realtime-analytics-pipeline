renderEngagementsPieChartData = function(){
  console.log('renderEngagementsPieChartData...');

  var data = null;
  if(Meteor.user()){
    var campaignRecord = Campaigns.findOne({_id: Meteor.user().profile.selected_campaign_id });
    console.log('campaignRecord');
    console.log(campaignRecord);

    if(campaignRecord){
      console.log('campaignRecord exists...');
      if(campaignRecord.statistics){
        console.log('campaignRecord.statistics exists...');
        data = [
          {engagement_type: "Android", count: campaignRecord.statistics.operating_system.android},
          {engagement_type: "iPad", count: campaignRecord.statistics.operating_system.ipad},
          {engagement_type: "iPhone", count: campaignRecord.statistics.operating_system.iphone},
          {engagement_type: "Blackberry", count: campaignRecord.statistics.operating_system.blackberry},
          {engagement_type: "Windows", count: campaignRecord.statistics.operating_system.windows},
          {engagement_type: "Macintosh", count: campaignRecord.statistics.operating_system.macintosh},
          {engagement_type: "Other", count: campaignRecord.statistics.operating_system.other}
        ];
      }else{
        console.log('initializing campaignRecord.statistics...');
        data = [
          {engagement_type: "Android", count: campaignRecord.statistics.operating_system.android},
          {engagement_type: "iPad", count: campaignRecord.statistics.operating_system.ipad},
          {engagement_type: "iPhone", count: campaignRecord.statistics.operating_system.iphone},
          {engagement_type: "Blackberry", count: campaignRecord.statistics.operating_system.blackberry},
          {engagement_type: "Windows", count: campaignRecord.statistics.operating_system.windows},
          {engagement_type: "Macintosh", count: campaignRecord.statistics.operating_system.macintosh},
          {engagement_type: "Other", count: campaignRecord.statistics.operating_system.other}
        ];
      }
    }else{
      console.log('campaignRecord didnt exist.  initializing empty object...');
      data = [
        {engagement_type: "Android", count: 0},
        {engagement_type: "iPad", count: 0},
        {engagement_type: "iPhone", count: 0},
        {engagement_type: "Blackberry", count: 0},
        {engagement_type: "Windows", count: 0},
        {engagement_type: "Macintosh", count: 0},
        {engagement_type: "Other", count: 0}
      ];
    }

    console.log('engagement data[]');
    console.log(data);

    var chart;
    nv.addGraph({
      generate:function() {
        var width = $('#pieChart').width();
        var height = $('#pieChart').height();

        if (height > 400){
          height = 400;
        }


        chart = nv.models.pieChart()
          .x(function(d) { return d.engagement_type })
          .y(function(d) { return d.count })
          .showLabels(true)     //Display pie labels
          // .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
          .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
          // .donutRatio(0.35)     //Configure how big you want the donut hole size to be.
          .donut(true)
          .color(['#a7a2af', '#a2b0d1', '#7a94cd', '#99a8cb', '#abbbce', '#aec7e8', '#b2cfee'])
          .width(width)
          .height(height);

        d3.select("#pieChart svg")
          .datum(data)
          //.transition().duration(1200)
          .attr('width', width)
          .attr('height', height)
          .call(chart);

        nv.utils.windowResize(chart.update);


        //chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

        return chart;
      },
      callback: function(graph){
        window.onresize = function () {
          console.log('hourlyInteractionsBarChart callback | window.onresize');

          var width = $('#pieChart').width();
          var height = $('#pieChart').height();
          var margin = graph.margin();


          if (width < margin.left + margin.right + 20)
            width = margin.left + margin.right + 20;

          if (height < margin.top + margin.bottom + 20){
            height = margin.top + margin.bottom + 20;
          }
          if (height > 400){
            height = 400;
          }


          graph.width(width).height(height);

          d3.select('#pieChart svg')
            .attr('width', width)
            .attr('height', height)
            .call(graph);
        };
      }
    });
  }
};

