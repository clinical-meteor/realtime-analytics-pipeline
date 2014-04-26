
//--------------------------------------------------------------
// Routes

Router.configure({
  layoutTemplate: 'appLayout',
});


Router.map(function(){
 this.route('dashboardPageRoute', {
   path: '/',
   template:"dashboardPage",
   onAfterAction: function() {
     Session.set('isOnListPage', false);
   }
 });
});
