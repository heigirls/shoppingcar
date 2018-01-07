var con = function ($scope, userFactory) {
    userFactory.getJson().then(function (results) {
        $scope.data = results;
    });
};
con.$injest = ['$scope', 'userFactory'];
app.controller('fromController', con);