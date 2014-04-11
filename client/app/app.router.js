
//--------------------------------------------------------------
// Routes

Router.configure({
  layoutTemplate: 'appLayout',
  notFoundTemplate: 'notFoundPage'
});
Router.before(function() {
  if (! Meteor.loggingIn() && ! Meteor.user()) {
    this.redirect('/sign-in');
  }
}, {except: 'entrySignInPage'});


Router.map(function(){
 try{
   this.route('introRoute', {
     path: '/',
     template:"introPage",
     yieldTemplates: areYieldsVisible(),
     onBeforeAction: function(){
       console.log('routing to: /');
       checkUserSignedIn(this);
       Session.set('currentPage', 'introPage');
     },
     onAfterAction: function() {
       Session.set('isOnListPage', false);
       setPageTitle("Thinaire - Insights");
     }
   });

   this.route('introRoute', {
     path: '/dashboard',
     template:"introPage",
     yieldTemplates: areYieldsVisible(),
     onBeforeAction: function(){
       console.log('routing to: /dashboard');
       checkUserSignedIn(this);
       Session.set('currentPage', 'introPage');
     },
     onAfterAction: function() {
       Session.set('isOnListPage', false);
       setPageTitle("Welcome");
     }
   });
 }catch(message){
   console.error(message);
 }
});
