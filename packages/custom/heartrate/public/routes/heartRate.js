'use strict';

angular.module('mean.heartRate').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('heart rate calculator', {
      url: '/heartRate/calculator',
      templateUrl: 'heartRate/views/index.html'
    });
  }
]);
