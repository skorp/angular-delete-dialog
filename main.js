var app = angular.module('myApp', []);

app.controller('myCtrl',function($scope) {
    $scope.openDialog = false;
    $scope.deleteit = function(){
        /*
            delete
            ....
            ....
         */
        alert('clicked on Delete button')
        $scope.openDialog= false;
    };
});

app.directive('dialog', ["$parse","$timeout",function($parse,$timeout) {
    return {
        restrict:'E',
        replace:true,
        scope: {
            modalid: '@id',
            title:'@',
            message:'@',
            callmethod:"&",
            showDialog:'='
        },
        link: function(scope,element,attrs) {
            scope.showModal = function (visible, elem) {
                if (!elem)
                    elem = element;

                if (visible)
                    $(elem).modal("show");
                else
                    $(elem).modal("hide");
            }


            scope.$watch('showDialog', function(value){
                scope.showModal(value, attrs.$$element);
            });
            $(element).bind("hide.bs.modal", function () {
                $parse('showDialog').assign(scope, false);
                $timeout(function(){
                    scope.$apply();
                });
            });
        },
        template:'<div id="{{modalid}}" class="modal fade">'+
            '<div class="modal-dialog">'+
            '<div class="modal-content">'+
            '<div class="modal-header">'+
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
            '<h4 class="modal-title">{{title}}</h4>'+
            '</div>'+
            '<div class="modal-body">'+
            '<p>{{message}}</p>'+
            '</div>'+
            '<div class="modal-footer">'+
            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
            '<button type="button" class="btn btn-danger" ng-click="callmethod()">delete</button>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>',

    }
}]);