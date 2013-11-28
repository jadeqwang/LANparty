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
		// if new registration
		if (amRegistered()) {
			console.log(myEvent().users);
			myUsers = myEvent().users;
			myUsers[getMyIndex(myRegistration.userId)] = myRegistration;
			//update myUsers
			Events.update(Session.get('event-id'), {$set: {users: myUsers}});
			// Events.update(Session.get('event-id'), {$set: {users: myRegistration}});
		} else{
			Events.update(Session.get('event-id'), {$push: {users: myRegistration}});
		};
		// Events.update(Session.get('event-id'), {$push: {users: myRegistration}});
		// else don't push; edit
		// console.log(Events.find({}));
	}
});

Template.register.helpers({
	yourname: function() {
		if (amRegistered()) {
			return getMyUser(Meteor.userId()).name;
		} else{
			return Meteor.user().profile.name;
		};
	},
	comment: function(){
		console.log(getMyUser(Meteor.userId()));
		return getMyUser(Meteor.userId()).comment;
	},
	nguests: function(){
		if (amRegistered()) {
			return getMyUser(Meteor.userId()).nguests;
		} else{
			return "0";
		};
	},
	presence: function(){
		return getMyUser(Meteor.userId()).attending;
	},
	prob: function(){
		return getMyUser(Meteor.userId()).prob;
	},
	visible: function(thisVisibility){
		visibility = getMyUser(Meteor.userId()).visible;
		console.log(visibility);
		if (thisVisibility === visibility) {
			return 'selected="selected"';
		} else{
			return '';
		};

		// actually, do this by registering a handlebars helper and pass in variables
		// console.log(getMyUser(Meteor.userId()).visible);
		// return getMyUser(Meteor.userId()).visible;
		// return 'selected="selected"';
	},
	contributions: function(){
		//
	},
	myRegistration: function() {
	    return amRegistered();
  	},
});