/**
 * Created by gukun on 2016/11/18.
 */
app.controller('chatCtrl',["$scope","$window","$state","utilsService",function($scope,$window,$state,utilsService){
    angular.element($window).ready(function() {
        $(".sidebar").height($(window).height()-102);
        $(".sidebarScroll").height($(window).height()-204);
    });

    $scope.items1 = [
        {id:1,name:"王五",image:"assets/img/b10.jpg",content:"Joge Lucky",small:"Art director, Movie Cut",badge:16,type:"签发"},
        {id:2,name:"李四",image:"assets/img/b7.jpg",content:"Joge",small:"",badge:10,type:"签批"},
        {id:3,name:"刘二",image:"assets/img/b6.jpg",content:"Lucky",small:"Art director, Movie Cut",badge:12,type:"审批"},
        {id:4,name:"张三",image:"",content:"Joge Lucky",small:"",badge:4,type:"审批"},
        {id:5,name:"张三",image:"assets/img/b5.jpg",content:"Joge Lucky",small:"",badge:6,type:"签批"}
    ];
    $scope.item1_l = $scope.items1.length;
    $scope.items2 = [
        {id:1,name:"王五",image:"assets/img/b1.jpg",content:"Joge Lucky",small:"Art director, Movie Cut",badge:16,type:"签发"},
        {id:2,name:"李四",image:"assets/img/b3.jpg",content:"Joge",small:"",badge:10,type:"审批"},
        {id:3,name:"刘二",image:"",content:"Lucky",small:"Art director, Movie Cut",badge:12,type:"签批"},
        {id:4,name:"张三",image:"assets/img/b4.jpg",content:"Joge Lucky",small:"",badge:4,type:"审批"},
        {id:5,name:"张三",image:"assets/img/b1.jpg",content:"Joge Lucky",small:"",badge:6,type:"签发"}
    ];
    $scope.item2_l = $scope.items2.length;
    $scope.items3 = [
        {id:1,name:"王五",image:"assets/img/b1.jpg",content:"Joge Lucky",small:"Art director, Movie Cut",badge:16,type:"签批"},
        {id:2,name:"李四",image:"",content:"Joge",small:"",badge:10,type:"签发"},
        {id:3,name:"刘二",image:"",content:"Lucky",small:"Art director, Movie Cut",badge:12,type:"审批"},
        {id:4,name:"张三",image:"assets/img/b8.jpg",content:"Joge Lucky",small:"",badge:4,type:"签批"}
    ];
    $scope.item3_l = $scope.items3.length;


    $scope.colors = ['primary', 'info', 'success', 'warning', 'danger', 'dark'];
    angular.forEach($scope.items1,function(i,item){
        if($scope.items1[item].image == ""){
            $scope.items1[item].name_image = $scope.items1[item].name.slice(-1);
        }
        $scope.items1[item].color =$scope.colors[Math.floor(Math.random()*6)];
    });
    angular.forEach($scope.items2,function(i,item){
        if($scope.items2[item].image == ""){
            $scope.items2[item].name_image = $scope.items2[item].name.slice(-1);
        }
        $scope.items2[item].color =$scope.colors[Math.floor((Math.random()*6))];
    });
    angular.forEach($scope.items3,function(i,item){
        if($scope.items3[item].image == ""){
            $scope.items3[item].name_image = $scope.items3[item].name.slice(-1);
        }
        $scope.items3[item].color =$scope.colors[Math.floor((Math.random()*6))];
    });
    //选中
    $scope.selectItem = function(item){
        angular.forEach($scope.items1, function(item) {
            item.selected = false;
        });
        angular.forEach($scope.items2, function(item) {
            item.selected = false;
        });
        angular.forEach($scope.items3, function(item) {
            item.selected = false;
        });
        $scope.item = item;
        $scope.item.selected = true;
    };

    $scope.tabs = [false, true];//设置默认
    $scope.tabs1 = [true,false,false,false];//设置默认
    //tab切换
    $scope.tab = function(index){
        angular.forEach($scope.tabs, function(i, v) {
            $scope.tabs[v] = false;
        });
        $scope.tabs[index] = true;
    };
    //tab1切换
    $scope.tab1 = function(index){
        angular.forEach($scope.tabs1, function(i, v) {
            $scope.tabs1[v] = false;
        });
        $scope.tabs1[index] = true;
    };
    $scope.avatar = function(url,title,size) {
        return utilsService.avatar(url,title,size);
    };
    $scope.color = function(title){
        return utilsService.color(title);
    }
}]);
app.controller('chatContentController',["$scope","$stateParams","$window","utilsService",function($scope,$stateParams,$window,utilsService){
    angular.element($window).ready(function() {
        $(".chat_person").height($(window).height()-215);
        $(".chat_content").height($(window).height()-376);
    });
    if($stateParams.item ==null){
        return;
    }
    $scope.item = $stateParams.item;
    $scope.p = $scope.item;
    //头像调用
    $scope.avatar = function(url,title,size) {
        return utilsService.avatar(url,title,size);
    };
    //时间
    $scope.dateFormat = function (dateString,format) {
        if(!dateString)return "";
        var time = new Date(dateString.replace(/-/g,'/').replace(/T|Z/g,' ').trim());
        var o = {
            "M+": time.getMonth() + 1, //月份
            "d+": time.getDate(), //日
            "h+": time.getHours(), //小时
            "m+": time.getMinutes(), //分
            "s+": time.getSeconds(), //秒
            "q+": Math.floor((time.getMonth() + 3) / 3), //季度
            "S": time.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return format;
    };
    $scope.today = new Date();
    $scope.date = $scope.dateFormat($scope.today.toLocaleDateString(),"yyyy.MM.dd");
    //模拟数据
    $scope.users = [
        {image:"assets/img/b8.jpg",name:"张三"},
        {image:"assets/img/b1.jpg",name:"李四"},
        {image:"assets/img/b2.jpg",name:"刘三"},
        {image:"",name:"王二"},
        {image:"assets/img/b5.jpg",name:"李宁"},
        {image:"assets/img/b4.jpg",name:"曾正"},
        {image:"assets/img/b9.jpg",name:"刘李"},
        {image:"assets/img/b8.jpg",name:"张三"},
        {image:"assets/img/b1.jpg",name:"李四"},
        {image:"assets/img/b2.jpg",name:"刘三"},
        {image:"",name:"王五"},
        {image:"assets/img/b5.jpg",name:"李宁"},
        {image:"assets/img/b4.jpg",name:"曾正"},
        {image:"assets/img/b9.jpg",name:"刘李"}
    ];
    angular.forEach($scope.users,function(item){
        if(item.image == ""){
            item.name_image = item.name.slice(-1);
        }
    });
    //选中效果
    $scope.selectItem = function(item){
        console.log(item);
        if(item =='all'){
            angular.forEach($scope.users, function(item) {
                item.selected = false;
            });
            $scope.selectedAll = true;
        }else{
            angular.forEach($scope.users, function(item) {
                item.selected = false;
            });
            $scope.item = item;
            $scope.item.selected = true;
            $scope.selectedAll = false;
        }
    };
    $scope.chat_contents = [
        {id:1,pull:false,image:"assets/img/b9.jpg",name:"刘李",content:"领导，请看一下新版设计方案",date:"2016.11.20 10:34:30"},
        {id:2,pull:false,image:"assets/img/b4.jpg",name:"曾正",content:"领导，请看一下新版设计方案",date:"2016.11.20 10:35:05"},
        {id:3,pull:false,image:"",name:"李宁",content:"领导，请看一下新版设计方案",date:"2016.11.20 10:36:40"},
        {id:4,pull:true,image:"assets/img/b2.jpg",name:"刘三",content:"好的",date:"2016.11.20 10:38:58"},
        {id:5,pull:true,image:"assets/img/b2.jpg",name:"刘三",content:"下午2点一起讨论一下",date:"2016.11.20 10:40:43"}
    ];
    angular.forEach($scope.chat_contents,function(item){
        if(item.image == ""){
            item.name_image = item.name.slice(-1);
        }
    });
    $scope.send = function(ev){
        var kc = ev.keyCode ? ev.keyCode : ev.which;
        var sk = ev.shiftKey ? ev.shiftKey : (kc == 16);
        if(kc==13&&!sk){
            alert($scope.content);
            console.log($scope.content);
            $scope.content = "";
        }
    };
}]);
