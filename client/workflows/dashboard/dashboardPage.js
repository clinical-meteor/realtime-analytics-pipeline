
Session.setDefault('selected_campaign_record', false);


//------------------------------------------------
// ROUTING

Router.map(function(){
  this.route('dashboardPageRoute', {
    path: '/',
    template: 'dashboardPage',
    waitOn: function(){
      Meteor.subscribe ('interactionsDaily');
    },
    // data: function () {
    //   //return Campaigns.findOne({_id: new Meteor.Collection.ObjectID(this.params.id)});
    //   return DailyStats.find();
    // },
    onAfterAction: function() {
      //renderEngagementsPieChartData();
      //renderHourlyInteractionsBarGraph();
      renderDailyInteractionsLineChart();
    }
  });
});

//------------------------------------------------
// HELPERS

Template.dashboardPage.helpers({
  campaignRecord: function(){
    if (Session.get('selected_campaign_record')) {
      return Campaigns.findOne(Session.get('selected_campaign_record'));
    } else {
      return {
        name: "---",
        decription: "---",
        accounts: [],
        _users: []
      };
    }
  },
  accountTags: function() {
    return _.map(this._accounts || [], function(account) {
      return {
        account_id: this._id,
        account: account._str
      };
    });
  },
  userTags: function() {
    return _.map(this._users || [], function(user) {
      return {
        user_id: this._id,
        account: user._str
      };
    });
  },
  selectedCampaignId: function() {
    return Meteor.user().profile.selected_campaign_id;
  },
  getStartDate: function() {
    if (this.start_date) {
      return this.start_date;
    } else {
      return '---';
    }
  },
  getEndDate: function() {
    if (this.end_date) {
      return this.end_date;
    } else {
      return '---';
    }
  },
  getTotalInteractions: function() {
    if (this.statistics) {
      return this.statistics.total_interactions;
    } else {
      return 0;
    }
  },
  getAvgInteractionsPerDay: function() {
    if (this.statistics) {
      return this.statistics.avg_interactions_per_day;
    } else {
      return 0;
    }
  },
  getTotalConnections: function() {
    if (this.total_connections) {
      return this.total_connections;
    } else {
      return 'No Interactions Tracked';
    }
  },
  getTotalConversions: function() {
    if (this.total_conversions) {
      return this.total_conversions;
    } else {
      return 'No Interactions Tracked';
    }
  },
  getUniqueUsers: function() {
    if (this.unique_users) {
      return this.unique_users;
    } else {
      return 'No Interactions Tracked';
    }
  },
  resized: function() {
    renderDailyInteractionsLineChart();
    return Session.get('resize');
  },
  destroyed: function() {
    this.handle && this.handle.stop();
    $('#dailyInteractionsLineChart').html('<svg id="dailyInteractionsLineChartCanvas"></svg>');
  }
});
