
Template.eventlist.helpers({
	events: function(){
		return Events.find({});
	},
	eventTheme: function(){
		return this.theme;
	},
	eventDate: function(){
		// mydate = this.date;
		var mydate = new Date(this.date);
		return mydate.toDateString();
		// return mydate.format('dddd, MMMM ,yyyy');
	},
	rsvps: function(){
		return this.users.length;
	},
	users: function(){
		myusers = this.users;
		console.log(myusers);
		// return this.users;
	},
	userId: function(){
		return this.userId;
	},
	// username: function(){
	// 	myuser = Meteor.users.find({_id: this.userId});
	// 	// console.log(myuser);
	// 	return myuser.profile.name;
	// }
});



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