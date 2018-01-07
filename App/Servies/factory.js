app.factory('img', function ($q, $http) {
    return {
        ajax: function (url, type) {
            var def = $q.defer();
            $http({
                url: url,
                method:type||'get'
            }).success(function (result) {
                def.resolve(result);
            }).error(function(error) {
                def.reject(error);
            });
            return def.promise;
        }
    }
});