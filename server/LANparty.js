var admin = function () {
    return Meteor.user() &&
           Meteor.user().emails &&
           (Meteor.user().emails[0].address == "kenton@kentonshouse.com" ||
           Meteor.user().emails[0].address == "jade@kentonshouse.com" ||
           Admin.findOne({admin: Meteor.user().emails[0].address}));
}

if (Meteor.isServer) {
  	Meteor.publish("admin", function () {
    	return Admin.find();
	});

	Meteor.startup(function() {
	   Admin.insert({admin: "kenton@kentonshouse.com"});
	   Admin.insert({admin: "jade@kentonshouse.com"});
	 });
};