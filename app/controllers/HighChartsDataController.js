'use strict';

angular.module('myApp.controllers.HighChartsDataController', ['myApp.services.JsonDataService','myApp.services.interControllerCommunication','highcharts-ng'])
    .controller('HighChartsDataController', [ 'JsonDataService', 'InterControllerCommunication','$scope',function(jsonDataService, icc, $scope) {
        $scope.callService =function(url) {
            console.log(url);
            jsonDataService.request(url);
        } ;

        $scope.chartTypes = [
            {"id": "line", "title": "Line"},
            {"id": "spline", "title": "Smooth line"},
            {"id": "area", "title": "Area"},
            {"id": "areaspline", "title": "Smooth area"},
            {"id": "column", "title": "Column"},
            {"id": "bar", "title": "Bar"},
            {"id": "pie", "title": "Pie"},
            {"id": "scatter", "title": "Scatter"}
        ];

        $scope.dashStyles = [
            {"id": "Solid", "title": "Solid"},
            {"id": "ShortDash", "title": "ShortDash"},
            {"id": "ShortDot", "title": "ShortDot"},
            {"id": "ShortDashDot", "title": "ShortDashDot"},
            {"id": "ShortDashDotDot", "title": "ShortDashDotDot"},
            {"id": "Dot", "title": "Dot"},
            {"id": "Dash", "title": "Dash"},
            {"id": "LongDash", "title": "LongDash"},
            {"id": "DashDot", "title": "DashDot"},
            {"id": "LongDashDot", "title": "LongDashDot"},
            {"id": "LongDashDotDot", "title": "LongDashDotDot"}
        ];

        $scope.chartSeries = [
            {"name": "Some data", "data": [1, 2, 4, 7, 3], id: 's1'},
            {"name": "Some data 3", "data": [3, 1, null, 5, 2], connectNulls: true, id: 's2'}
        ];

        $scope.chartStack = [
            {"id": '', "title": "No"},
            {"id": "normal", "title": "Normal"},
            {"id": "percent", "title": "Percent"}
        ];

        $scope.addPoints = function () {
            var seriesArray = $scope.chartConfig.series;
            var rndIdx = Math.floor(Math.random() * seriesArray.length);
            seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
        };


        var seriesId = 0;

        $scope.addSeries = function () {
            var rnd = []
            for (var i = 0; i < 10; i++) {
                rnd.push(Math.floor(Math.random() * 20) + 1)
            }
            var sId = '__series' + seriesId++;
            $scope.chartConfig.series.push({
                data: rnd,
                id: sId
            });
        }

        $scope.removeRandomSeries = function () {
            var seriesArray = $scope.chartConfig.series;
            var rndIdx = Math.floor(Math.random() * seriesArray.length);
            seriesArray.splice(rndIdx, 1);
        }

        $scope.removeSeries = function (id) {
            var seriesArray = $scope.chartConfig.series;
            seriesArray.splice(id, 1);
        }

        $scope.toggleHighCharts = function () {
            this.chartConfig.useHighStocks = !this.chartConfig.useHighStocks;
        }

        $scope.replaceAllSeries = function () {
            var data = [
                { name: "first", data: [10], id: 'a' },
                { name: "second", data: [3], id: 'b' },
                { name: "third", data: [13], id: 'c' }
            ];
            $scope.chartConfig.series = data;
        };

        $scope.chartConfig = {

            chart: {
                height: 500,
                width: 500,
                type: 'areaspline'
            },
            plotOptions: {
                series: {
                    stacking: ''
                }
            },
            series: $scope.chartSeries,
            title: {
                text: 'Cycle vs Saturation'
            }
        }

        $scope.reflow = function () {
            $scope.$broadcast('highchartsng.reflow');
        };

    }]);
/**
 * Created by abd_salam_shaikh on 2/2/2017.
 */
/**
 * Created by abd_salam_shaikh on 4/27/2017.
 */