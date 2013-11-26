// subscriptions to Events collection
Meteor.subscribe('events');

// Template.header.rendered=function() {
//     $('.datepicker').datepicker();
// }

// Session.setDefault('event-id', getFirstEventId);
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
// Template.header.rendered = function(){
//   Session.set('event-id', Events.findOne()._id);
// }

Template.header.helpers({
  eventTheme: function(){
    return getEvent().theme;
  },
  eventDate: function(){
    var mydate = new Date(getEvent().date);
    console.log(mydate);
    return mydate.toDateString();
  },
  isDisabledPrev: function(){
    //
  },
  isDisabledNext: function(){
    //returns "disabled" if it's the last event
    if (getNextEvent() === undefined) {
      return "invisible";
    } else{
      return '';
    };
  }
});

function getEvent(){ //gets the event from the session variable
    return Events.findOne({_id: Session.get('event-id')});
}

function getFirstEventId(){ //gets the event from the session variable
    return Events.findOne()._id;
}

function getNextEvent(){
  return Events.findOne({date: {$gt: getEvent().date}},['date', "asc"]);
}

//sort specifier ["a", "asc"]
//collection.find(selector, [options])
//selector is mongo query, $gt is greater than


Template.header.events({
  'click .nextbtn': function(e){
    e.preventDefault();
    nextEvent = getNextEvent();
    console.log(nextEvent);
    Session.set('event-id',nextEvent._id);
  }
});

Template.header.events({
  'click .prevbtn': function(e){
    e.preventDefault();
    currentEvent = getEvent();
    console.log(currentEvent);
    console.log(currentEvent.date);
    prevEvent = Events.findOne({date: {$lt: currentEvent.date}},['date', "desc"]);
    console.log(prevEvent);
    Session.set('event-id',prevEvent._id);
  }
});

// console.log("event rendered");
//   $('#when').datepicker();
//   $('#when').datepicker("option", "dateFormat", "yy-mm-dd" );


///////////////////TODO///////////////////

// With internet:
// date in header
// header sets session variable for active event
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
