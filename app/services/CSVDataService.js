'use strict';

angular.module('myApp.services.CSVDataService', ['papa-promise','myApp.services.restApiService','myApp.services.interControllerCommunication','highcharts-ng'])
    .factory('CSVDataService', ['Papa', 'RestApiService', 'InterControllerCommunication', function(Papa, restApiService, icc) {

        var service={};
        var columnSelectors;
        service.request = function (url) {
            //return restApiService.request("/utils/tmp-out.csv",updateHandler);
            return restApiService.request(url,updateHandler);


        }
        function handleParseResult(result) {
            var returnList = [];
            var csvData = result.data;
            var columnHeaders = extractFirstRow(csvData);
            var cellContent;
            var columnSet;
            console.log(columnHeaders);
            for(var rowIndex in csvData) {
                if(rowIndex == 0) {
                    continue;
                } else {
                    columnSet = csvData[rowIndex];
                    var json = {
                        currentCycle: columnSet[0],
                        detectorId : columnSet[1],
                        totalSpaceTime : columnSet[2],
                        nov : columnSet[3],
                        optimumSpaceTime : columnSet[4],
                        greenPhaseTime: columnSet[5],
                        saturationDegree: columnSet[6]
                    }
                     returnList.push(json);
                }
            }
            icc.publish('list.update', returnList);
        }

        var extractFirstRow = function(csvData) {
            return csvData[0];
        }

        function handleParseError(result) {
            // display error message to the user
        }

        function parsingFinished() {
        }
        
        var updateHandler = function(data) {
             Papa.parse(data)
                .then(handleParseResult)
                .catch(handleParseError)
                .finally(parsingFinished);
        }

        return service;

    }]);