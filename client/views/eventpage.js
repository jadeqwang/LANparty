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
		myuserIds = getUserIds(myEvent().users);
		// myusers = Meteor.users.find({_id: {$in: myuserIds}});
		myusers = Meteor.users.find({_id: myuserIds});
		console.log(myusers);
		return myusers;

		// return this.users;
	},
	userId: function(){
		// return this.userId;
		console.log(this);
		return this.profile.name;
	},
})

function getUserIds(myusers){
	var myuserIds = new Array();
		for(var x = 0; x < myusers.length; x++){
			myuserIds[x] = myusers[x].userId;
		}
		console.log(myuserIds);
		return myuserIds;
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
        //
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