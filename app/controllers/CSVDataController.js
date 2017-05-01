'use strict';

angular.module('myApp.controllers.CSVDataController', ['myApp.services.CSVDataService','myApp.services.interControllerCommunication'])
    .controller('CSVDataController', [ 'CSVDataService', 'InterControllerCommunication','$scope',function(csvDataService, icc, $scope) {
       var jsonData;
        var detectorList = ["D06","D07","D08","D09","D10"]
        function plotSaturationDegree(jsonData, id, fieldName) {
            var list = [];
            for (var i = 0; i < jsonData.length; i++) {
                if (jsonData[i].detectorId == id) {
                    var json = jsonData[i];
                    var val = parseInt(json[fieldName]);
                    if(val < 0) {
                        val = 0;
                    }
                    list.push(val);
                    //list.push(parseInt(jsonData[i].currentCycle));
                }
            }
            return list;
        }

        var handler = function (e, json) {
            $scope.json = json;
            jsonData = json;
            var item;
            for (item in detectorList) {
                var detStats = plotSaturationDegree(jsonData,detectorList[item],"saturationDegree");
                $scope.chartConfig.series.push({
                    name: detectorList[item],
                    data: detStats,
                    id: detStats.detectorId,
                    type: "spline"
                });
            }
        }
        var list = icc.subscribe('list.update', handler);



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
            /*{"name": "Some data", "data": [1, 2, 4, 7, 3,5,8,5,10,65,25,65,6,99], id: 's1'},
            {"name": "Some data 3", "data": [3, 1, null, 5, 2], connectNulls: true, id: 's2'}*/
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
            csvDataService.request("/utils/data.csv");
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
