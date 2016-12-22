app.controller('telephoneCtrl', ['$scope','$http',function($scope,$http) {
 
  $scope.status = true;
  $scope.icon1 = "glyphicon glyphicon-chevron-up" + " pull-right";
  $scope.toggle = function(){
    if( $scope.status == true){
      $scope.status = false;
       $scope.icon1 = "glyphicon glyphicon-chevron-down"+ " pull-right";
    }else{
      $scope.status = true;
      $scope.icon1 = "glyphicon glyphicon-chevron-up" + " pull-right";
    }
  }
  //模拟通过后台获取的json数据
  var path = '/telephone/list';
  $http.get(path).then(function (response) {
    $scope.department = response.data.department;
  });
}]);

      
app.controller('telephoneListCtrl', ['$scope','$http','$stateParams','utilsService',function($scope, $http, $stateParams,utilsService) {
  $scope.avatar = function(url, title, size){
    return utilsService.avatar(url,title,size);
  }
  $scope.dpName = $stateParams.dpName;//部门名字
  var id = new Object($stateParams.dpId1);
  var path = '/log/log1/departmentId.json';
  //模拟获取后台传过来的json数据
  $http.get(path).then(function (response) {
    var list1 = [];
    var list = response.data.template;
    for(var i = 0; i < list.length; i++){
      if(list[i].id == id)
        list1.push(list[i]);
    }
    $scope.dList = list1;
    }
  );
 }]);

