Template.register.events({
	'submit form': function (e, template) {
		e.preventDefault();

		//build the registration from its parts
		var $comments = $(e.target).find(['name=comments']);
	}
})