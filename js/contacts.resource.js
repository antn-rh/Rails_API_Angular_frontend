(function() {
  'use strict';
  angular
    .module('ContactsCatalog')
    .factory('ContactsResource', ContactsResource);

  ContactsResource.$inject = ['$resource'];

  function ContactsResource($resource) {
    return $resource(
      'https://rails-api-contact-catalog.herokuapp.com/api/v1/contacts/:id',
      { id: '@id' },
      { 'update': { method: 'PATCH', isArray:false } }
    );
  }
}());
