// subscriptions to Events collection
Meteor.subscribe('events');

// Template.header.rendered=function() {
//     $('.datepicker').datepicker();
// }

Session.setDefault('event-id', getFirstEventId);
// for some reason, trying to set a default sets off a type error when
// the same line works for Session.set. Worry about this later.

// by default, you're looking at the first event
// when done with testing, fix to next upcoming event (from 'now')


// had trouble with Session.setDefault, so we're setting it early
// on the landing page
Template.landingpage.rendered = function(){
  Session.set('event-id', Events.findOne()._id);
}
// here too, in case they didn't come via the landing page
// actually, no, it'll prevent the nextbtn from working b/c it keeps resetting
Template.header.rendered = function(){ 
  if (typeof Session.get('event-id') != 'string') {
    Session.set('event-id', Events.findOne()._id);
  };
}

Template.header.helpers({
  eventTheme: function(){
    return myEvent().theme;
  },
  eventDate: function(){
    // thisevent = getEvent();
    // console.log(myEvent());
    // var mydate = new Date(myEvent().date);
    return myDate();
  },
  isDisabledPrev: function(){//hides prevbtn if last event
    if (getPrevEvent() === undefined) {
      return "invisible";
    };
  },
  isDisabledNext: function(){//hides nextbtn if last event
    if (getNextEvent() === undefined) {
      return "invisible";
    };
  }
});

myEvent = function(){ //gets the event from the session variable
    console.log(Session.get('event-id'));
    return Events.findOne({_id: Session.get('event-id')});
}
myDate = function(){
  var mydate = new Date(myEvent().date);
  return mydate.toDateString();
}


function getFirstEventId(){ //gets the event from the session variable
    return Events.findOne()._id;
}

function getNextEvent(){
  return Events.findOne({date: {$gt: myEvent().date}},{sort:{date: 1}});
}

function getPrevEvent(){
  return Events.findOne({date: {$lt: myEvent().date}},{sort:{date: -1}});
}

Template.header.events({
  'click .nextbtn': function(e){
    e.preventDefault();
    Session.set('event-id',getNextEvent()._id);
  }
});

Template.header.events({
  'click .prevbtn': function(e){
    e.preventDefault();
    Session.set('event-id',getPrevEvent()._id);
  }
});

// console.log("event rendered");
//   $('#when').datepicker();
//   $('#when').datepicker("option", "dateFormat", "yy-mm-dd" );


///////////////////TODO///////////////////

// Xdate in header
// Xheader sets session variable for active event

// iterate to display users for active event
// admin view


///////////////////Iron-Router///////////////////
Router.configure({
  layoutTemplate: 'layout',
});


Router.map(function () {

  // the home page is "Yes" or "No page"
  this.route('home', {
    path: '/', // match the root path
    template: 'landingpage'
  });

  // the registration form
  this.route('register', {
    path: '/register', // match the root path
    template: 'registration'
  });

  // the page with the roster, etc., also, admin page
  this.route('eventpage', {
    path: '/event',
    template: 'eventpage'
  });

});
