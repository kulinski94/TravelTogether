// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [
    'ionic',
    'app.controllers',
    'app.services',
    'user.controllers',
    'user.services',
    'travel.controllers',
    'travel.services',
    'messages.controllers',
    'messages.services',
    'search.controllers',
    'search.services'
  ])
  /**
   * see documentation: https://www.parse.com/apps/quickstart#parse_data/web/existing
   *
   * SET THESE VALUES IF YOU WANT TO USE PARSE, COMMENT THEM OUT TO USE THE DEFAULT
   * SERVICE
   *
   * parse constants
   */
   //server: "http://78.90.20.186:1337/parse"
   //server: "https://together-674.nodechef.com/parse"
  .value('ParseConfiguration', {
    applicationId: "72aea5331b9ec078be85cb57f5e7f282",
    server: "https://traveltogether-743.nodechef.com/parse"
  })
  /**
   *
   */
  .config(function($stateProvider, $urlRouterProvider) {

    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
    // create account state
      .state('app-signup', {
        url: "/signup",
        templateUrl: "templates/user/signup.html",
        controller: "SignUpController"
      })
      // login state that is needed to log the user in after logout
      // or if there is no user object available
      .state('app-login', {
        url: "/login",
        templateUrl: "templates/user/login.html",
        controller: "LoginController"
      })

    // setup an abstract state for the tabs directive, check for a user
    // object here is the resolve, if there is no user then redirect the
    // user back to login state on the changeStateError
    .state('travel', {
        url: "/travel",
        abstract: true,
        templateUrl: "templates/tabs.html",
        resolve: {
          user: function(UserService) {
            var value = UserService.init();
            return value;
          }
        }
      })
      // Each tab has its own nav history stack:
      .state('travel.list', {
        url: '/list',
        views: {
          'travel-list': {
            templateUrl: 'templates/travel/list.html',
            controller: 'TravelListCtrl'
          }
        }
      })

    .state('travel.list-detail', {
      url: '/list/:travelId',
      views: {
        'travel-list': {
          templateUrl: 'templates/travel/detail.html',
          controller: 'TravelDetailCtrl'
        }
      }
    })

    .state('travel.create', {
      url: '/create',
      views: {
        'travel-create': {
          templateUrl: 'templates/travel/create.html',
          controller: 'TravelCreateCtrl'
        }
      }
    })
    .state('travel.account', {
        url: '/account',
        views: {
          'account-view': {
            templateUrl: 'templates/account/account.html',
            controller: 'AccountCtrl'
          }
        }
      })
      .state('travel.search', {
        url: '/search-profile',
        views: {
          'search-profile-view': {
            templateUrl: 'templates/search/search-profile.html',
            controller: 'SearchCtrl'
          }
        }
      })
      .state('travel.send-message', {
        url: '/send-message/:profileId',
        views: {
          'account-view': {
            templateUrl: 'templates/account/send-message.html',
            controller: 'SendMessageCtrl'
          }
        }
      })
      .state('travel.account-details', {
        url: '/account/details',
        views: {
          'account-view': {
            templateUrl: 'templates/account/details.html',
            controller: 'DetailsCtrl'
          }
        }
      })
      .state('travel.account-password', {
        url: '/account/password',
        views: {
          'account-view': {
            templateUrl: 'templates/account/password.html',
            controller: 'ChangePasswordCtrl'
          }
        }
      })
      .state('travel.account-messages', {
        url: '/account/messages',
        cache: false,
        views: {
          'account-view': {
            templateUrl: 'templates/account/messages.html',
            controller: 'MessagesCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/travel/list');

  })
  .run(function($ionicPlatform, $rootScope, $state) {


    $rootScope.$on('$stateChangeError',
      function(event, toState, toParams, fromState, fromParams, error) {

        console.log('$stateChangeError ' + error && (error.debug || error.message || error));

        // if the error is "noUser" the go to login state
        if (error && error.error === "noUser") {
          event.preventDefault();

          $state.go('app-login', {});
        }
      });

    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
