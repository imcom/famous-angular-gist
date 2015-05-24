'use strict';

angular.module('famousAngularStarter')
  .controller('MainCtrl', function ($scope, $famous, $state) {
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Timer = $famous['famous/utilities/Timer'];
    var Easing = $famous['famous/transitions/Easing'];
    var MouseSync = $famous['famous/inputs/MouseSync'];
    var ScrollSync = $famous['famous/inputs/ScrollSync'];
    var GenericSync = $famous['famous/inputs/GenericSync'];
    var EventHandler = $famous['famous/core/EventHandler'];

    $scope.spinner = {
      speed: 55
    };
    $scope.rotateY = new Transitionable(0);

    $scope.navBarEntryAn = new Transitionable(0);
    $scope.navBarEntryAn.set(0.9, {'duration': 2000, 'curve': Easing.inExpo});

    $scope.titleBarEntryAn = new Transitionable([0, -200, 0]);
    $scope.titleBarEntryAn.set([0, 0, 0], {'duration': 1200, 'curve': Easing.outBack});

    $scope.leftOneAn = new Transitionable([0, -200, 0]);
    $scope.leftOneAn.set([0, 0, 0], {'duration': 1000, 'curve': Easing.inQuart});
    $scope.leftOneOpAn = new Transitionable(0);
    $scope.leftOneOpAn.set(0.9, {'duration': 1000, 'curve': Easing.inQuart});

    $scope.left2An = new Transitionable([0, -200, 0]);
    $scope.left2An.set([0, 0, 0], {'duration': 1300, 'curve': Easing.inQuart});
    $scope.left2OpAn = new Transitionable(0);
    $scope.left2OpAn.set(0.9, {'duration': 1300, 'curve': Easing.inQuart});

    $scope.left3An = new Transitionable([0, -200, 0]);
    $scope.left3An.set([0, 0, 0], {'duration': 1500, 'curve': Easing.inQuart});
    $scope.left3OpAn = new Transitionable(0);
    $scope.left3OpAn.set(0.9, {'duration': 1500, 'curve': Easing.inQuart});

    $scope.bannerAn = new Transitionable([0, 0]);
    $scope.bannerRotateAn = new Transitionable(0);
    $scope.bannerAn.set([1, 1], {'duration': 1200, 'curve': Easing.inOut}, function() {
        $scope.bannerRotateAn.set(-Math.PI/5, {'duration': 200, 'curve': Easing.inOut}, function() {
            $scope.bannerRotateAn.set(Math.PI/5, {'duration': 200, 'curve': Easing.inOut}, function() {
                $scope.bannerRotateAn.set(0, {'duration': 300, 'curve': Easing.inOut});
            });
        });
    });


    //run function on every tick of the Famo.us engine
    Timer.every(function(){
      var adjustedSpeed = parseFloat($scope.spinner.speed) / 1200;
      $scope.rotateY.set($scope.rotateY.get() + adjustedSpeed);
    }, 1);

    $scope.myEventHandler = new EventHandler();

    $scope.indexOpacity = new Transitionable(0.9);
    $scope.indexScale = new Transitionable([1, 1]);

    $scope.options = {
      scrollViewTwo: {
        direction: 1,
        paginated: true
      }
    };

    GenericSync.register({
        // 'mouse': MouseSync,
        'scroll': ScrollSync
    });

    $scope.mySync = new GenericSync(['scroll'],
        {'direction': ScrollSync.DIRECTION_Y});

    $scope.mySync.on('start', function(event) {
        // Fires when a pointer action starts
        // (When the mouse goes down or a touch begins)
    });

    $scope.mySync.on('update', function(event) {
        if (event.position > 0) {
            return;
        }

        if (Math.abs(event.position) < 50) {
            return;
        }

        var x_opa = Math.abs(event.position) * 0.1;
        $scope.indexOpacity.set(1 / x_opa);
        $scope.navBarEntryAn.set(1 / x_opa);

        var x_sca = Math.abs(event.position);
        var base_scale = 1;

        var scale = [base_scale + (x_sca / 2000), base_scale + (x_sca / 2000)];

        $scope.indexScale.set(scale);
    });

    $scope.mySync.on('end', function(event) {
        // Fires when the pointer action ends
        // (When the mouse/touch is released)
        if (event.position < -700) {
            // go to next scene
            console.log(event);
            $state.go("service");
            return;
        }

        $scope.indexOpacity.set(0.9, {'duration': 600});
        $scope.navBarEntryAn.set(0.9, {'duration': 600});
        $scope.indexScale.set([1, 1], {'duration': 600});
    });

  });
