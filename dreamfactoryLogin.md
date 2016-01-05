
1.- Instalar Dreamfactory para angular
```javascript

bower_components/angular-dreamfactory
```
2.- Inyectar Dreamfactory al 'ngDreamFactory'  
```javascript
  .module('miApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngDreamFactory'    
  ])
  .constant('DSP_URL', 'http://indinet.es')
  .constant('DSP_API_KEY', 'lamemoriagraficaApp')
  .config(function ($httpProvider, DSP_API_KEY) {
        $httpProvider.defaults.headers.common["X-DreamFactory-Application-Name"] = DSP_API_KEY;
    })
```
3.- Crear login  
```javascript

  .controller('MainCtrl', function ($scope, DreamFactory, $http) {


	$scope.$on('api:ready', function(event) {
		console.debug('ready','ready');
		$scope.loginFunc();
	});



	  // model for login credentials
	  $scope.creds = {
	      "body": {
	          "email": '',
	          "password": ''
	      }
	  }

	  // Login function
	  $scope.loginFunc = function() {

	    // Call to the DreamFactory user service using provided login method
	    // Here was have passed in our success/error callbacks
	    DreamFactory.api.user.login($scope.creds,

	      // Success function
	      function(result) {

	        // returned data will not be wrapped in a 'data' object
	        // Handle login success
	        console.log(result);
	      },

	      // Error function
	      function(error) {

	        // Handle Login failure
	      });
	  }


  });
```
