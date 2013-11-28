Template.eventdetails.helpers({
	eventTheme: function(){
		return myEvent().theme;
	},
	eventDate: function(){
		return myDate();
	},
})

Template.roster.helpers({
	rsvps: function(){
		return myEvent().users.length;
	},
	users: function(){
		return Meteor.users.find({_id: {$in: getUserIds()}},{multi: true});
	},
})


Template.rsvpItem.helpers({
	myName: function(){ // returns the user-entered name
		myName = getMyUser(this._id).name;
		if (myName != undefined) {
			return myName;
		} else{         // or the name from the userID
			return this.profile.name;
		};
	},
	myContributions: function(){
		return getMyUser(this._id).contribution.join("; ");
	},
	myComment: function(){
		return getMyUser(this._id).comment;
	},
	myRegistration: function() {
	    return this._id === Meteor.userId();
  	},
})

////////////////////Helpers for helpers////////////////////

function getUserIds(){
	myusers = myEvent().users;
	var myuserIds = new Array();
		for(var x = 0; x < myusers.length; x++){
			myuserIds[x] = myusers[x].userId;
		}
		return myuserIds;
}

function getMyUser(myuserId){
	var myusers   = myEvent().users;
		for(var x = 0; x < myusers.length; x++){
			if (myusers[x].userId === myuserId) {
				return myusers[x];
			};
		}
	return '';
}


////////////////////Registration Modal////////////////////

Template.myModal.events({
    "click .close, click .cancel":function(){
        Session.set("showMyModal",false);
    },
    "submit form":function(event){
        event.preventDefault();
        Session.set("showMyModal",false);
    }
});

Template.modalparent.created=function(){
    // this is necessary to initially set (and reset on future page load) the Session variable
    Session.set("showMyModal",false);
};

Template.modalparent.helpers({
    showMyModal:function(){
        return Session.get("showMyModal");
    },
    myRegistration: function() {
	    return getMyUser(Meteor.userId()) != '';
  	},
});

Template.modalparent.events({
    "click .show-modal-button":function(){
        Session.set("showMyModal",true);
    }
});

Template.modalparentedit.created=function(){
    // this is necessary to initially set (and reset on future page load) the Session variable
    Session.set("showMyModal",false);
};

Template.modalparentedit.helpers({
    showMyModal:function(){
        return Session.get("showMyModal");
    }
});

Template.modalparentedit.events({
    "click .show-modal-button": function(){
        Session.set("showMyModal",true);
    }
});