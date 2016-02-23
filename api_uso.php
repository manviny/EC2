<script>
  app.controller('HomeCtrl',function($scope, $http){
      $scope.page=<?php echo $page->toJSON() ?>;

        $http({
          method: 'POST',
          url: 'api/enviaemail/',
          data: {'from': 'tu@email.es', 'to': 'su@email.es', 'subject': 'asunto', 'message': '<h1>Hola desde PW</h1>'},
        })
        .success(function (result) {  console.log("Si", result); })
        .error(function(data){ console.log("error",data) }); 

  });
</script>

<div ng-controller="HomeCtrl">   
