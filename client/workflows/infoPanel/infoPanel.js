Session.setDefault("isHidden", true);


Router.route("/info", {
  name:"infoPanel",
  template:"infoPanel"
});

Template.registerHelper("isHidden", function(argument){
  if(Session.get("isHidden")){
    return "isHidden";
  }else{
    "";
  }
});
