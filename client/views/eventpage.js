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