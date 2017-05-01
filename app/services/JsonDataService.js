'use strict';

angular.module('myApp.services.JsonDataService', ['myApp.services.restApiService','myApp.services.interControllerCommunication'])
    .factory('JsonDataService', ['RestApiService', 'InterControllerCommunication', function(restApiService, icc) {

        var service={};
        var columnSelectors;
        service.request = function (url) {
            //return restApiService.request("/utils/tmp-out.csv",updateHandler);
            return restApiService.request(url,updateHandler);


        }
        var updateHandler = function(data) {
            console.log(data);
        }

        return service;

    }]);