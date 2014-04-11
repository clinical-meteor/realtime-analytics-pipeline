Meteor.startup(function(){

  Meteor.publish('clients', function(){
    return Clients.find({name: {$ne: "Default Deployment"}});
  });
  Meteor.publish('visitors', function(){
    return Visitors.find({},{limit:20});
  });
  Meteor.publish('experiences', function(){
    return Experiences.find({},{limit:20});
  });
  Meteor.publish('switchboard', function(){
    return Switchboard.find({});
  });
  Meteor.publish('interactions', function(){
    return Interactions.find({},{limit:20, sort: {$natural: -1}});;
  });
  Meteor.publish('interactionsDaily', function(campaignId){
    console.log('subscribing to interactionsDaily! ' + campaignId);
    console.log('interactionsDaily.count() ' + InteractionsDaily.find({campaign_id: campaignId}).count());
    return InteractionsDaily.find({campaign_id: campaignId});
  });

  Meteor.publish('statistics', function(){
    return Statistics.find({},{limit:20});
  });
  Meteor.publish('creatives', function(){
    return Creatives.find({},{limit:20});
  });

  Meteor.publish('stores', function(){
    return Stores.find({},{limit:20});
  });

  Meteor.publish('content', function(employerId){
    console.log('content publication function recevied employerId: ' + employerId);
    if(employerId){
      return Content.find({client_id: employerId},{limit:40, sort: {_id: -1}});
      //return Content.find({client_id: employerId},{limit:40});
    }else{
      return Content.find({},{limit:40, sort: {_id: -1}});
      //return Content.find({},{limit:40});
    }
  });
  Meteor.publish('engagements', function(employerId){
    if(employerId){
      return Engagements.find({client_id: employerId},{limit:20});
    }else{
      return Engagements.find({},{limit:20});
    }
  });
  Meteor.publish('products', function(employerId){
    if(employerId){
      return Products.find({client_id: employerId},{limit:40, sort: {$natural: -1}});
    }else{
      return Products.find({},{limit:40, sort: {$natural: -1}});
    }
  });

  Meteor.publish('employerCampaigns', function (employerId) {
    return Campaigns.find({client_id: employerId });
  });
  Meteor.publish('adminCampaigns', function () {
    return Campaigns.find();
  });





  Meteor.publish('clientEmployees', function (clientId) {
    try{
      return Meteor.users.find({'profile.employer_id': clientId}, {fields: {
        '_id': true,
        'username': true,

        'profile.title': true,
        'profile.avatar': true,

        'profile.employer': true,
        'profile.employer_id': true,
        'profile.employer_invitation': true,
        'profile.employer_invitation_id': true,
        'profile.selected_campaign_id': true,

        'profile.selected_campaign_id': true,

        'emails': true,
        'emails[0].address': true
      }});
    }catch(error){
      console.log(error);
    }
  });

  Meteor.publish('userProfile', function (userId) {
    try{
      return Meteor.users.find({_id: this.userId}, {fields: {
        '_id': true,
        'username': true,
        'password': true,
        'access_token': true,
        'profile.role': true,

        'profile.name': true,
        'profile.title': true,
        'profile.company': true,
        'profile.avatar': true,

        // TODO: inactive_hidden should be moved to a preferences object
        'profile.inactive_hidden': true,

        'profile.selected_campaign': true,
        'profile.selected_campaign_name': true,
        'profile.selected_campaign_id': true,

        'profile.employer': true,
        'profile.employer_id': true,
        'profile.employer_invitation': true,
        'profile.employer_invitation_id': true,

        'profile.phone': true,
        'profile.website': true,
        'profile.address': true,
        'profile.city': true,
        'profile.state': true,
        'profile.zip': true,

        'emails': true,
        'emails[0].address': true
      }});
    }catch(error){
      console.log(error);
    }
  });

// Publish users directory and user profile
  Meteor.publish("usersDirectory", function () {
    try{
      return Meteor.users.find({}, {fields: {
        '_id': true,
        'username': true,
        'createdAt': true,
        'profile.role': true,

        'profile.name': true,
        'profile.title': true,
        'profile.company': true,
        'profile.avatar': true,

        'profile.employer': true,
        'profile.employer_id': true,
        'profile.employer_invitation': true,
        'profile.employer_invitation_id': true,

        'profile.selected_campaign_id': true,


        'profile.phone': true,
        'profile.website': true,
        'profile.address': true,
        'profile.city': true,
        'profile.state': true,
        'profile.zip': true,

        'emails': true,
        'emails[0].address': true
      }});
    }catch(error){
      console.log(error);
    }
  });


  // Publish users directory and user profile
  Meteor.publish("usersAdmin", function () {
    return Meteor.users.find({}, {fields: {

      '_id': true,
      'username': true,
      'createdAt': true,
      'profile.role': true,

      'profile.name': true,
      'profile.title': true,
      'profile.company': true,
      'profile.avatar': true,

      'profile.selected_campaign': true,
      'profile.selected_campaign_name': true,
      'profile.selected_campaign_id': true,

      'profile.employer': true,
      'profile.employer_id': true,
      'profile.employer_invitation': true,
      'profile.employer_invitation_id': true,

      'profile.phone': true,
      'profile.website': true,
      'profile.address': true,
      'profile.city': true,
      'profile.state': true,
      'profile.zip': true,

      'emails': true,
      'emails[0].address': true

    }});
  });

// Publish site settings
  Meteor.publish("settings", function () {
    try{
      return Settings.find({_id: 'production'}, {fields: {
        name: true,
        installed: true,
        live: true,
        maintenance: true,
        interactions_count: true
      }});
    }catch(error){
      console.log(error);
    }
  });
});

