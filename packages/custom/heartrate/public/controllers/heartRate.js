'use strict';

/* jshint -W098 */
angular.module('mean.heartRate').controller('HeartRateController', ['$scope', 'Global', 'HeartRate',
  function($scope, Global, HeartRate) {
    $scope.global = Global;
    $scope.package = {
      name: 'heartRate'
    };
    $scope.hrData = {};
    $scope.hrZones = {};


    $scope.$watch('hrData.age', function(newValue, oldValue) {
      var age = $scope.hrData.age;
      if (age){
        $scope.hrData.classic = 220-age;
        $scope.hrData.miller = 217-0.85*age;
        $scope.hrData.tanaka = 208-0.7*age;
      }
    });

    $scope.$watch('hrData.preferred', function(newValue, oldValue) {
      calculateZones();
    });

    $scope.$watch('hrData. manual', function(newValue, oldValue) {
      if($scope.hrData.preferred == "manual"){
        calculateZones();
      }      
    });

    var calculateZones = function () {
      var preferred = $scope.hrData.preferred;
      var max = 0
      switch (preferred){
        case "classic": 
          max = $scope.hrData.classic;
          break;
        case "miller": 
          max = $scope.hrData.miller;
          break;
        case "tanaka": 
          max = $scope.hrData.tanaka;
          break;
        case "manual": 
          max = $scope.hrData.manual;
          break;
      }
      
      if(max){
         $scope.hrZones.abcc = {};
         $scope.hrZones.abcc["Zone 6"] = {"min": Math.round(0.94 * max), "max" : Math.round(max), "description" : "Sprint training, anaerobic, maximal effort"}
         $scope.hrZones.abcc["Zone 5"] = {"min": Math.round(0.89 * max), "max" : Math.round(0.94 * max), "description" : "Near maximal effort, anaerobic"}
         $scope.hrZones.abcc["Zone 4"] = {"min": Math.round(0.82 * max), "max" : Math.round(0.89 * max), "description" : "Aerobic/anaerobic threshold, intensive effort"}
         $scope.hrZones.abcc["Zone 3"] = {"min": Math.round(0.75 * max), "max" : Math.round(0.82 * max), "description" : "Aerobic zone for building stamina"}
         $scope.hrZones.abcc["Zone 2"] = {"min": Math.round(0.65 * max), "max" : Math.round(0.75 * max), "description" : "Aerobic, long steady effort, for endurance"}
         $scope.hrZones.abcc["Zone 1"] = {"min": Math.round(0.60 * max), "max" : Math.round(0.65 * max), "description" : "Recovery (aerobic)"}
      }
    };
  }
]);
