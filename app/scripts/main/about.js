'use strict';

angular.module('famousAngularStarter')
  .controller('AboutCtrl', function ($scope, $famous, $state) {
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Timer = $famous['famous/utilities/Timer'];
    var Easing = $famous['famous/transitions/Easing'];
    var MouseSync = $famous['famous/inputs/MouseSync'];
    var ScrollSync = $famous['famous/inputs/ScrollSync'];
    var GenericSync = $famous['famous/inputs/GenericSync'];
    var EventHandler = $famous['famous/core/EventHandler'];

    $scope.indexOpacity = new Transitionable(0.9);
    $scope.indexScale = new Transitionable([1, 1]);

    GenericSync.register({
        // 'mouse': MouseSync,
        'scroll': ScrollSync
    });

    $scope.mySync = new GenericSync(['scroll'],
        {'direction': ScrollSync.DIRECTION_Y});


    $scope.mySync.on('update', function(event) {
        var scale;

        if (Math.abs(event.position) < 50) {
            return;
        }

        var x_opa = Math.abs(event.position) * 0.1;
        $scope.indexOpacity.set(1 / x_opa);

        var x_sca = Math.abs(event.position);
        var base_scale = 1;

        if (event.position > 0) {
            scale = [base_scale - (x_sca / 2000), base_scale - (x_sca / 2000)];
        } else {
            scale = [base_scale + (x_sca / 2000), base_scale + (x_sca / 2000)];
        }

        $scope.indexScale.set(scale);
    });

    $scope.mySync.on('end', function(event) {
        // Fires when the pointer action ends
        // (When the mouse/touch is released)
        if (event.position < -700) {
            // go to next scene
            $state.go("contact");
            return;
        }

        if (event.position > 700) {
            // back to previous scene
            $state.go("service");
            return;
        }

        $scope.indexOpacity.set(0.9, {'duration': 600});
        $scope.indexScale.set([1, 1], {'duration': 600});
    });

  });
