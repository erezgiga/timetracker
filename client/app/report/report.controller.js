'use strict';

angular.module('timetrackerApp')
    .controller('ReportCtrl', function ($scope, $http, $location) {
        $http.get('/api/employees/' + $location.search()['id']).success(function(employee) {
            $scope.month = employee.month;
            $scope.employee = employee.data;
        });

        $scope.getTime = function(timestamp) {
            var hours = new Date(parseInt(timestamp)).getHours();
            var minutes = new Date(parseInt(timestamp)).getMinutes();

            if (hours < 10) {
                hours = '0' + hours;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }

            return  hours + ':' + minutes;
        };

        $scope.getTotal = function(timeIn, timeOut) {
            return  diff(timeIn, timeOut);
        };

        function diff(timeIn, timeOut) {
            var startDate = new Date(timeIn);
            var endDate = new Date(timeOut);
            var diff = endDate.getTime() - startDate.getTime();
            var hours = Math.floor(diff / 1000 / 60 / 60);
            diff -= hours * 1000 * 60 * 60;
            var minutes = Math.floor(diff / 1000 / 60);

            if (hours < 0) {
                hours = hours + 24;
            }

            return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
        }
    });
