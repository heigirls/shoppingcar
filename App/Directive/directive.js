
//自定义指令
app.directive('shopping', function () {
    return {
        scope: true,
        restrict: 'EA',
        templateUrl: 'App/views/shopping/shopping.html',
        controller: function ($scope) {
            $scope.change =  function () {
                $scope.amount = 0;
                $scope.total = 0;
                $scope.data.map(function(item, index) {
                    if (item.flag) {
                        $scope.amount += item.pic * item.num;
                        $scope.total += item.num;
                    }
                });
            }
            $scope.bgchange = function (obj) {
                $scope.pics = 0;
                obj.flag = !obj.flag;
                if (obj.flag) {
                    $('.bg')[obj.id].style='background: red';
                    $scope.change();
                } else {
                    $('.bg')[obj.id].style='background: #fff';
                }
            }
            $scope.adds =  function (obj) {
                $scope.data.map(function(item, index) {
                    if (index == obj.id) {
                        item.num += 1;
                    }
                });
                $scope.change();
            }
            $scope.dels =  function (obj) {
                $scope.proddataucts.map(function(item, index) {
                    if (index == obj.id) {
                        if (item.num < 1) return;
                        item.num -= 1;
                    }
                });
                $scope.change();
            }
        }
    }
});