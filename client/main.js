// subscriptions to Events collection
Meteor.subscribe('events');

// Template.header.rendered=function() {
//     $('.datepicker').datepicker();
// }

// Session.setDefault('event-id', Events.findOne()._id);
// for some reason, trying to set a default sets off a type error when
// the same line works for Session.set. Worry about this later.

// by default, you're looking at the first event
// when done with testing, fix to next upcoming event (from 'now')


Template.header.rendered = function(){
  // console.log(Events.findOne());
  // myevent = Events.findOne();
  Session.set('event-id', Events.findOne()._id);
  // myeventid = Session.get('event-id');
  // console.log(myeventid);
}

Template.header.helpers({
  events: function(){
    // console.log(Events.findOne());
    // myevent = Events.findOne();
    // Session.set('event-id', Events.findOne()._id);
    myeventid = Session.get('event-id');
    console.log(myeventid);
    return Events.find({});
  },
  eventTheme: function(){
    return this.theme;
  },
  eventDate: function(){
    var mydate = new Date(this.date);
    console.log(mydate);
    return mydate.toDateString();
    // return mydate.format('dddd, MMMM ,yyyy');
  },
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
