Template.register.events({
	'submit form': function (e, template) {
		e.preventDefault();

		// generally needed 
		var user = Meteor.user();
		var myUsers = myEvent().users;

		var deleteMe = $(e.target).find('[name=delete]').val();
		console.log(deleteMe);

		//if deletion is needed
		if (deleteMe === 'delete') {
			myUsers.splice(getMyIndex(user._id), 1);
			console.log(myUsers);
			Events.update(Session.get('event-id'), {$set: {users: myUsers}});
			return;
		};

		var contributions = [];
	    $('input[name=contribution]:checked').each(function() {
	      contributions.push($(this).val());
	    });

		//build the registration from its parts
		var myRegistration = {
	      userId:        user._id,
	      name:          $(e.target).find('[name=guestname]').val(),
	      comment:       $(e.target).find('[name=comments]').val(),
	      nguests:       $(e.target).find('[name=nguests]').val(),
	      contribution:  contributions,
	      visible:       $(e.target).find('[name=visible]').val(),
	      prob:          $(e.target).find('[name=probability]').val(),
	      presence:      $(e.target).find('[name=attending]').val(),
	    }

		if (amRegistered()) { // if it's a revision, update current user array
			myUsers[getMyIndex(myRegistration.userId)] = myRegistration;
			console.log(myUsers);
			Events.update(Session.get('event-id'), {$set: {users: myUsers}});
		} else{ // it's a new registration
			Events.update(Session.get('event-id'), {$push: {users: myRegistration}});
		};
	},
	// 'delete form': function (e, template) { // cancels registration
	// 	e.preventDefault();
	// 	console.log('delete form');

	// 	var myUsers = myEvent().users;
	// 	// console.log(getMyIndex(myRegistration.userId));
	// 	// myUsers.splice(getMyIndex(myRegistration.userId), 1);
	// 	// console.log(myUsers);
	// 	// Events.update(Session.get('event-id'), {$set: {users: myUsers}});
	// },
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
		return getMyUser(Meteor.userId()).comment;
	},
	nguests: function(){
		if (amRegistered()) {
			return getMyUser(Meteor.userId()).nguests;
		} else{
			return "0";
		};
	},
	presence: function(myPresence){
		return dropdownSelect(myPresence, getMyUser(Meteor.userId()).attending);
	},
	prob: function(myProb){
		return dropdownSelect(myProb, getMyUser(Meteor.userId()).prob);
	},
	visible: function(visibility){
		return dropdownSelect(visibility, getMyUser(Meteor.userId()).visible);
	},
	check: function(thisContribution){ //if contribution is listed
		var myContribution = getMyUser(Meteor.userId()).contribution;
		if (myContribution != undefined) {
			if (myContribution.indexOf(thisContribution) >= 0) {
				return 'checked="checked"';
			};
		};
		return '';
	},
	myRegistration: function() {
	    return amRegistered();
  	},
});

function dropdownSelect(myOption, recordedOption){
	if (myOption === recordedOption) {
			return 'selected="selected"';
		} else{
			return '';
		};
}