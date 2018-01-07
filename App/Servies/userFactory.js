app.factory('userFactory', ['img', function(img) {
    return {
        getJson: function () {
            return img.ajax('http://localhost:8008/index');
        }
    }
}]);