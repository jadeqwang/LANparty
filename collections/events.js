Events = new Meteor.Collection('events');
Admin = new Meteor.Collection('admin');

/* Clients should never edit admin. */
Admin.deny({
  update: function (userId, docs, fields, modifier) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  },
  insert: function (userId, doc) {
    return true;
  },
});