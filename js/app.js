(function() {
  'use strict';
  angular
    .module('ContactsCatalog', ['ui.router', 'ngResource', 'ngMaterial'])
    .config(ContactsRouter)
    .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('green')
      .accentPalette('red')
      .warnPalette('blue');
  });

  function ContactsRouter($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('contactsIndex', {
        url: '/contacts',
        templateUrl: 'templates/contacts.index.html',
        controller: 'ContactsListController',
        controllerAs: 'contactListVm'
      })
      .state('contactsNew', {
        url: '/contacts/new',
        templateUrl: 'templates/contacts.new.html',
        controller: 'ContactsNewController',
        controllerAs: 'contactNewVm'
      })
      .state('contactsShow', {
        url: '/contacts/show/:id',
        templateUrl: 'templates/contacts.show.html',
        controller: 'ContactsShowController',
        controllerAs: 'contactShowVm'
      })
      .state('contactsEdit', {
        url: '/contacts/edit/:id',
        templateUrl: 'templates/contacts.edit.html',
        controller: 'ContactsEditController',
        controllerAs: 'contactEditVm'
      });
  }
}());
