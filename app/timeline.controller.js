/**
 * Created by luoxiao on 2017/1/20.
 */
angular.module('app', []).controller('timelineController', function ($scope) {

    var nodes = [
        {
            name: "审批1",
            date: "01/04/2016"
        }, {
            name: "审批2",
            date: "01/06/2016"
        },
        {
            name: "审批3",
            date: "01/10/2016"
        },
        {
            name: "审批4",
            date: "01/15/2016"
        },
        {
            name: "审批5",
            date: "01/20/2016"
        }, {
            name: "审批6",
            date: "01/22/2016"
        },
        {
            name: "审批7",
            date: "01/23/2016"
        }, {
            name: "审批8",
            date: "01/25/2016"
        }];

    console.log("??");

    $scope.nodes = nodes;

    $scope.remove = function () {
        $scope.nodes.splice(0, 1);
    };
});
