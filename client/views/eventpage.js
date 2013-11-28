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
	myName: function(){
		return this.profile.name;
	},
	myContributions: function(){
		return getContributions(getMyUser(this._id));
	},
	myComment: function(){
		return getMyUser(this._id).comment;
	}
})

function getUserIds(){
	myusers = myEvent().users;
	var myuserIds = new Array();
		for(var x = 0; x < myusers.length; x++){
			myuserIds[x] = myusers[x].userId;
		}
		return myuserIds;
}

function getContributions(myUser){
	var contribArray = new Array();
	if (myUser.prob != 'definitely') {
		contribArray[contribArray.length] = myUser.prob;
	};
	if (myUser.snacks) {
		contribArray[contribArray.length] = 'snacks';
	};
	if (myUser.alcohol) {
		contribArray[contribArray.length] = 'alcohol';
	};
	if (myUser.beer) {
		contribArray[contribArray.length] = 'beer';
	};
	if (myUser.beverage) {
		contribArray[contribArray.length] = 'beverages';
	};
	return contribArray.join("; ");
}

function getMyUser(myuserId){
	var myusers   = myEvent().users;
		for(var x = 0; x < myusers.length; x++){
			if (myusers[x].userId === myuserId) {
				return myusers[x];
			};
		}
	return 'user not found';
}

//mongo selector
//// Matches documents where fruit is one of three possibilities
//{fruit: {$in: ["peach", "plum", "pear"]}}



/////////////Registration Modal////////////////////

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
    }
});

Template.modalparent.events({
    "click .show-modal-button":function(){
        Session.set("showMyModal",true);
    }
});