app.controller('WorksCtrl', ['$scope', function($scope) {
  $scope.folds = [{
    name: '待办',
    filter: ''
  }, {
    name: '已办',
    filter: 'starred'
  }, {
    name: '待阅',
    filter: 'sent'
  }, {
    name: '已阅',
    filter: 'important'
  }, ];

  $scope.labels = [{
    name: '流程委托',
    filter: 'launched'
  }, {
    name: '我的委托',
    filter: 'draft'
  }];

  $scope.addLabel = function() {
    $scope.labels.push({
      name: $scope.newLabel.name,
      filter: angular.lowercase($scope.newLabel.name),
      color: '#ccc'
    });
    $scope.newLabel.name = '';
  };

  $scope.labelClass = function(label) {
    return {
      'b-l-info': angular.lowercase(label) === 'angular',
      'b-l-primary': angular.lowercase(label) === 'bootstrap',
      'b-l-warning': angular.lowercase(label) === 'client',
      'b-l-success': angular.lowercase(label) === 'work'
    };
  };
}]);

<<<<<<< .mine
app.controller('WorksListCtrl', ['$scope', "$aside", 'mails','$stateParams','$filter','$location','utilsService',function($scope, $aside, mails, $stateParams,$filter,$location,utilsService) {
  $scope.fold = $stateParams.fold;
   mails.all().then(function(mails){
    $scope.mails = mails;
||||||| .r448
app.controller('WorksListCtrl', ['$scope', "$aside", 'mails','$stateParams','$filter','$location','utilsService',function($scope, $aside, mails, $stateParams,$filter,$location,utilsService) {
    $scope.fold = $stateParams.fold;
  mails.all().then(function(mails){
    $scope.mails = mails;
=======
app.controller('WorksListCtrl', ['$scope', '$resource', "$aside", 'mails', '$stateParams', '$filter', '$location', 'utilsService', function($scope, $resource, $aside, mails, $stateParams, $filter, $location, utilsService) {
  $scope.fold = $stateParams.fold;

  var requestService = {
    'query': $scope.app.hosts.baseUrl + 'mail/mails.json'
  };

  var list = $resource(requestService.query, {}, $scope.app.actions);
  list.query({}, function(resp) {
    $scope.mails = resp.mails;
>>>>>>> .r474
  });


  $scope.color = function(title) {
    return utilsService.color(title);
  }

  angular.forEach($scope.folds, function(value, i) {
    if (value.filter == $scope.fold) {
      if (value.name == '待办') {
        $scope.overtime = '超时待办';
      }
      $scope.identify = value.name;
    }
  });
  angular.forEach($scope.labels, function(value, i) {
    if (value.filter == $scope.fold) {
      $scope.identify = value.name;
    }
  });

  if ($scope.fold == '') {
    $scope.overtimeFlag = true;
    $scope.number = "4";
  } else {
    $scope.overtimeFlag = false;
    $scope.number = "2";
  }

  if ($scope.fold == "sent") {
    $scope.showSort = true;
    $scope.showFilter = true;
  } else if ($scope.fold == "") {
    $scope.showSort = true;
    $scope.showFilter = false;
  } else {
    $scope.showSort = false;
    $scope.showFilter = false;
  }

  var isShowSearchModal = true;
  $scope.isShowSearchModal = false;
  $scope.showSearchModal = function() {
    if (isShowSearchModal) {
      $scope.isShowSearchModal = true;
      isShowSearchModal = false;
    } else {
      $scope.isShowSearchModal = false;
      isShowSearchModal = true;
    }
  };

  $scope.refresh = function() {
    //   $location.path("/app/works/inbox/sent");
    window.location.reload();
  };

  $scope.week = "";
  $scope.str = new Date().getDay();

  if ($scope.str == 0) {
    $scope.week = "周日";
  } else if ($scope.str == 1) {
    $scope.week = "周一";
  } else if ($scope.str == 2) {
    $scope.week = "周二";
  } else if ($scope.str == 3) {
    $scope.week = "周三";
  } else if ($scope.str == 4) {
    $scope.week = "周四";
  } else if ($scope.str == 5) {
    $scope.week = "周五";
  } else if ($scope.str == 6) {
    $scope.week = "周六";
  }

  var dayArr = $filter('date')(new Date(), 'yyyy-MM-dd').split('-');
  $scope.year = dayArr[0] + '年';
  $scope.today = dayArr[1] + '月' + dayArr[2] + '日';

  $scope.avatar = function(url, title, size) {
    return utilsService.avatar(url, title, size);
  };

  $('.triangle_btn').first().css('background', '#0d54a2');
  $('.triangle_btn').first().children().css('display', 'block');
  $('.triangle_btn').on('click', function() {
    $(this).css('background', '#0d54a2');
    $(this).children().css('display', 'block');
    $('.triangle_btn').not($(this)).css('background', '#146fbe');
    $('.triangle_btn').not($(this)).children().css('display', 'none');
  });

  $scope.openFlow = function(position) {
    $aside.open({
      templateUrl: 'asideContent.html',
      placement: position,
      size: 'lg',
      backdrop: true,
      controller: function($scope, $modalInstance) {
        $scope.ok = function(e) {
          $modalInstance.close();
          e.stopPropagation();
        };
        $scope.cancel = function(e) {
          $modalInstance.dismiss();
          e.stopPropagation();
        };
      }
    });
  };

}]);

app.controller('WorksDetailCtrl', ['$scope', 'mails', '$stateParams', 'utilsService', function($scope, mails, $stateParams, utilsService) {
  mails.get($stateParams.mailId).then(function(mail) {
    $scope.mail = mail;
  });
}]);

app.controller('MailNewCtrl', ['$scope', function($scope) {
  $scope.mail = {
    to: '',
    subject: '',
    content: ''
  }
  $scope.tolist = [{
    name: 'James',
    email: 'james@gmail.com'
  }, {
    name: 'Luoris Kiso',
    email: 'luoris.kiso@hotmail.com'
  }, {
    name: 'Lucy Yokes',
    email: 'lucy.yokes@gmail.com'
  }];
}]);

app.controller('CustomTabController', ['$scope', function($scope) {
  $scope.tabs = [true, false];
  $scope.tab = function(index) {
    angular.forEach($scope.tabs, function(i, v) {
      $scope.tabs[v] = false;
    });
    $scope.tabs[index] = true;
  };
}]);

angular.module('app').directive('labelColor', function() {
  return function(scope, $el, attrs) {
    $el.css({
      'color': attrs.color
    });
  };
});