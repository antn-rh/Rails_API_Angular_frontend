(function() {
  'use strict';
  angular
    .module('ContactsCatalog')
    .controller('ContactsListController', ContactsListController)
    .controller('ContactsNewController', ContactsNewController)
    .controller('ContactsShowController', ContactsShowController)
    .controller('ContactsEditController', ContactsEditController)

  ContactsListController.$inject = ['ContactsResource'];
  ContactsNewController.$inject = ['ContactsResource', '$state'];
  ContactsShowController.$inject = ['ContactsResource', '$stateParams', '$state'];
  ContactsEditController.$inject = ['ContactsResource', '$stateParams', '$state'];

  //
  // CONTACTS LIST CONTROLLER
  //
  function ContactsListController(ContactsResource) {
    var vm = this;
    vm.contacts = [];

    ContactsResource.query().$promise.then(function(data) {
      data.forEach(function(contact) {
        vm.contacts.push(contact);
      });
      // console will show all the contacts stored in the Rails API
      console.log(vm.contacts);
    });
  }

  //
  // CONTACTS NEW CONTROLLER
  //
  function ContactsNewController(ContactsResource, $state) {
    var vm = this;
    vm.newContact = {};
    vm.addContact = addContact;

    function addContact() {
      ContactsResource.save(vm.newContact).$promise.then(function(jsonContact) {
        vm.newContact = {};
        $state.go('contactsIndex');
      });
    }
  }

  //
  // CONTACTS SHOW CONTROLLER
  //
  function ContactsShowController(ContactsResource, $stateParams, $state) {
    var vm = this;
    vm.contact = {};
    vm.jsonContact;
    vm.deleteContact = deleteContact;

    ContactsResource.get({ id: $stateParams.id }).$promise.then(function(jsonContact) {
      vm.contact = jsonContact;
      // once vm.contact gets assigned the json data from the server, stringify it
      vm.jsonContact = JSON.stringify(vm.contact, null, 2);
    });

    function deleteContact() {
      ContactsResource.delete({ id: $stateParams.id }).$promise.then(function(response) {
        // outside of resource $state.go will not refresh the view.
        $state.go('contactsIndex');
        if(response.message) {
          console.log(response.message);
        }
      });
    }
  }

  //
  // CONTACTS EDIT CONTROLLER
  //
  function ContactsEditController(ContactsResource, $stateParams, $state) {
    var vm = this;
    vm.contact = {};
    vm.updateContact = updateContact;

    ContactsResource.get({ id: $stateParams.id }).$promise.then(function(jsonContact) {
      vm.contact = jsonContact;
    });

    function updateContact() {
      ContactsResource.update(vm.contact).$promise.then(function(editedContact) {
        vm.contact = editedContact;
        console.log(editedContact)
        $state.go('contactsIndex');
      });
    }
  }
}());
