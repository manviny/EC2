<script>
  app.controller('HomeCtrl',function($scope, $http){

        $http({
          method: 'POST',
          url: 'api/enviaemail/',
          data: {'user': 'PILLOo', 'pass': 'error'},
        })
        .success(function (result) {  console.log("Si", result); })
        .error(function(data){ console.log("error",data) }); 

  });
</script>

<div ng-controller="HomeCtrl">
    <h1>hi there {{page.title}}</h1>
</div>    
