var admin = function () {
    return Meteor.user() &&
           Meteor.user().emails &&
           (Meteor.user().emails[0].address == "kenton@kentonshouse.com" ||
           Meteor.user().emails[0].address == "jade@kentonshouse.com" ||
           Admin.findOne({admin: Meteor.user().emails[0].address})||
           Admin.findOne({admin: Meteor.user().services.github.email}));
}

if (Meteor.isServer) {
  	Meteor.publish("admin", function () {
    	return Admin.find();
	});

	Meteor.startup(function() {
		createUserAdminRoles();

		//find _id of admins and add them if they're not already there
		//Roles.addUsersToRoles("xxx", ["admin", "user-admin"]);


	   // Admin.insert({admin: "kenton@kentonshouse.com"});
	   // Admin.insert({admin: "jade@kentonshouse.com"});
	   // Admin.insert({admin: "jade@meteor.com"});
	 });
};