app.controller('NoteCtrl', ['$scope', 'SweetAlert', '$resource', 'utilsService', function($scope, SweetAlert, $resource, utilsService) {
  var requestService = {
    'query': $scope.app.hosts.baseUrl + 'note/notes.json',
    'save': $scope.app.hosts.baseUrl + 'note/save.json',
    'delete': $scope.app.hosts.baseUrl + 'note/delete/:id',
    'update': $scope.app.hosts.baseUrl + 'note/update/:id'
  };

  $scope.notes = [];

  //列表获取
  var list = $resource(requestService.query, {}, $scope.app.actions);
  list.query({}, function(resp) {
    $scope.notes = resp.notes;
    $scope.note = $scope.notes[0];
    $scope.notes[0].selected = true;
  });

  $scope.colors = ['primary', 'info', 'success', 'warning', 'danger', 'dark'];

  //新增
  $scope.createNote = function() {
    var note = {
      content: 'New note',
      color: $scope.colors[Math.floor((Math.random() * 3))],
      date: Date.now()
    };
    $scope.notes.push(note);
    $scope.selectNote(note);

    // 新增开始
    var dataSave = $resource(requestService.save, {key: '测试一哈'}, $scope.app.actions);
    dataSave.save(note, function(resp) {
      if (resp.code == 200) {
        utilsService.success();
      } else {
        utilsService.error();
      }
    });
    // 新增结束
  }

  //删除
  $scope.deleteNote = function(note) {
    SweetAlert.swal({
      title: "确认要删除吗？",
      text: "删除的数据将不能恢复!",
      type: "warning",
    }, function(isConfirm) {
      if (isConfirm) {
        $scope.notes.splice($scope.notes.indexOf(note), 1);
        if (note.selected) {
          $scope.note = $scope.notes[0];
          $scope.notes.length && ($scope.notes[0].selected = true);
        }

        //删除开始
        var dataDelete = $resource(requestService.delete, {id: '@id'}, $scope.app.actions);
        dataDelete.delete({id: '1234232323'}, function(resp) {
          if (resp.code == 200) {
            utilsService.success();
          } else {
            utilsService.error();
          }
        });
        //删除结束
      }
    });
  }

  $scope.selectNote = function(note) {
    angular.forEach($scope.notes, function(note) {
      note.selected = false;
    });
    $scope.note = note;
    $scope.note.selected = true;
  }

  //修改
  $scope.updateNote = function(note) {
    //修改开始
    var dataUpdate = $resource(requestService.update, {key: '测试一哈',id: '@id'}, $scope.app.actions);
    dataUpdate.update({id: '1234'}, note, function(resp) {
      if (resp.code == 200) {
        utilsService.success();
      } else {
        utilsService.error();
      }
    });
    //修改结束
  }

}]);