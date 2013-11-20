//let's add some fake data for testing purposes

if (Events.find().count() === 0) {

  // create 4 users
  var danyId = Meteor.users.insert({
    profile: {   name: 'Daenerys Targaryen',
    status: 'approved',
    email:  'dany@dragonfi.re',
    rosterpref: 'public'},
  });
  var dany = Meteor.users.findOne(danyId);

  var olennaId = Meteor.users.insert({
    profile: { name: 'Olenna Redwyne',
    status: 'approved',
    email:  'olenna@highgarden.com',
    rosterpref: 'public'},
  });
  var olenna = Meteor.users.findOne(olennaId);

  var halId = Meteor.users.insert({
    profile: { name: 'Hallyne the Pyromancer' ,
    status: 'public',
    email:  'hallyne@pyroman.io',
    rosterpref: 'public'},
  });
  var hal = Meteor.users.findOne(halId);

  var samId = Meteor.users.insert({
    profile: { name: 'Samwell Tarley' ,
    status: 'approved',
    email:  'samtheslayer@thewall.com',
    rosterpref: 'public'},
  });
  var sam = Meteor.users.findOne(samId);

  
  var now = new Date().getTime();

  // create some events
  for (var i = 0; i < 3; i++) {
    Events.insert({
      theme: 'Upcoming LAN Party ' + i,
      users: [{  userId: samId,
      			comment: "sam likes Left4Dead 2",
      			snacks: true,
      			beverage: true,
      			alcohol: false,
      			beer:    false,
      			visible: 'admin',
      			prob: 'definitely',
      			presence: 'droppingby',
      			playing: 'hangout'}, 
      			{userId: danyId,
      			comment: "Hoard! Dragons! Dragonfire!",
      			snacks: false,
      			beverage: false,
      			alcohol: true,
      			beer:    false,
      			visible: 'admin',
      			prob: 'definitely',
      			presence: 'attending',
      			playing: 'playing'}, 
      			{userId: olennaId,
      			comment: "Cyvasse is the best!",
      			snacks: false,
      			beverage: false,
      			alcohol: true,
      			beer:    false,
      			visible: 'admin',
      			prob: 'probably',
      			presence: 'attending',
      			playing: 'playing'}],
      date:  now + i * 7 * 24 * 3600 * 1000,
    });
  }

};

