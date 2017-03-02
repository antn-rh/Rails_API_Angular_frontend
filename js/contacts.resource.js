(function() {
  'use strict';
  angular
    .module('ContactsCatalog')
    .factory('ContactsResource', ContactsResource);

  ContactsResource.$inject = ['$resource'];

  function ContactsResource($resource) {
    return $resource(
      'http://localhost:3000/api/v1/contacts/:id',
      { id: '@_id' },
      { 'update': { method: 'PATCH', isArray:false } }
    );
  }
}());
