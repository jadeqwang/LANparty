Template.register.events({
	'submit form': function (e, template) {
		e.preventDefault();

		//build the registration from its parts
		var $comments = $(e.target).find(['name=comments']);

		//Events.update(eventId, {blah blah});
		//insert the user into the event
	}
});

Template.register.helpers({
	yourname: function() {
		var user = Meteor.user();
		console.log(user.profile.name);
		return user.profile.name;
	}
});