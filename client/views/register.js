Template.register.events({
	'submit form': function (e, template) {
		e.preventDefault();

		var user = Meteor.user();

		var contributions = [];
	    $('input[name=contribution]:checked').each(function() {
	      contributions.push($(this).val());
	    });

		//build the registration from its parts
		var myRegistration = {
	      userId: user._id,
	      name:          $(e.target).find('[name=guestname]').val(),
	      comment:       $(e.target).find('[name=comments]').val(),
	      nguests:       $(e.target).find('[name=nguests]').val(),
	      contribution:  contributions,
	      visible:       $(e.target).find('[name=visible]').val(),
	      prob:          $(e.target).find('[name=probability]').val(),
	      presence:      $(e.target).find('[name=attending]').val(),
	    }

		// console.log(myRegistration);
		Events.update(Session.get('event-id'), {$push: {users: myRegistration}});
		// console.log(Events.find({}));
	}
});

Template.register.helpers({
	yourname: function() {
		var user = Meteor.user();
		console.log(user.profile.name);
		return user.profile.name;
	}
});