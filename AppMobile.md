[MONACA](https://monaca.io/)
===========================
Antes de empezar debemos crear una cuenta en monaca pinchando en el enlace superior y crear un nuevo proyecto tipo "Onsen UI Tabbar"  
Para poder realizar apps es aconsejable tener unos conocimientos básicos de:  
* HTML
* [onsenui](http://onsen.io/)
* javascript
* angularjs
* json
  
[1.- Prepara entorno para usar angularjs](https://github.com/manviny/dispositivos-moviles/blob/master/README.md#1--prepara-entorno-para-usar-angularjs)  
[2.- Crear portada con imagen de fondo.](https://github.com/manviny/dispositivos-moviles/blob/master/README.md#2--crear-portada-con-imagen-de-fondo)   
[3.- Conectar datos entre javascript y html.](https://github.com/manviny/dispositivos-moviles/blob/master/README.md#3--conectar-datos-entre-javascript-y-html)   
[4.- Comunicar con una api de terceros mediante $http](https://github.com/manviny/dispositivos-moviles/blob/master/README.md#4--comunicar-con-una-api-de-terceros-mediante-http)   
[5.- Acceder al hardware del terminal.](https://github.com/manviny/dispositivos-moviles/blob/master/README.md#5--acceder-al-hardware-del-terminal)  
[6.-Presentar un mapa en nuestra app](https://github.com/manviny/dispositivos-moviles/blob/master/README.md#6-presentar-un-mapa-en-nuestra-app)    
[7.- Poner un marcador en un mapa](https://github.com/manviny/dispositivos-moviles/blob/master/README.md#7--poner-un-marcador-en-un-mapa)
### 1.- Prepara entorno para usar angularjs  
**Borrar contenido de index.html y pegar este código**
```html
<!DOCTYPE HTML>
<html ng-app="myApp">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <script src="components/loader.js"></script>
    <link rel="stylesheet" href="components/loader.css">
    <link rel="stylesheet" href="css/style.css">
     
     <script src="js/app.js"></script>
     
</head>
<body>
    <ons-tabbar var="tabbar">
        <ons-tabbar-item
            icon="home"
            label="Home"
            page="navigator.html"
            active="true"></ons-tabbar-item>
        <ons-tabbar-item
            icon="comment"
            label="Comments"
            page="page2.html"></ons-tabbar-item>
        <ons-tabbar-item
            icon="gear"
            label="Settings"
            page="page3.html"></ons-tabbar-item>
    </ons-tabbar>

</body>
</html>
```
**Crear carpeta js y añadir dentro fichero app.js**  
--www  
----css  
----js  
```js
// con la linea siguiente habilitamos angularjs y onsenui en el fichero /js/app.js 
var app = angular.module('myApp', ['onsen']);
```
[volver](https://github.com/manviny/dispositivos-moviles/blob/master/README.md#monaca)   
###2.- Crear portada con imagen de fondo.  
Añadir carpeta img y subir fondo que usaremos como fondo
--www  
----css  
----js  
----img  
En style.css que encontramos dentro de la carpeta CSS pegamos lo siguiente:
```css
#home {
  background: url(../img/clouds.jpg) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  color: #fff;
  height:100%;
}
#intro {
  padding: 80px 40px 40px;
}
.title {
  float: left;
  color: #fff;
  font-size: 2.5em;
  line-height: 0.9em;
  text-shadow: 0.05em 0.05em 0.14em black;
}
.sub {
  line-height: 1.2em;
  text-shadow: 0.1em 0.1em 0.2em black;
}
.clearfix{
  clear: both;
}
```
y en nuestro page1.html, esto:( renombrar la pagina page1.html por portada.html y tambien cambiar el nombre dentro del fichero en navigator.html para que apunte a la página renombrada portada.html  

```html
<ons-page>
 
  <div  id="home">
    <div id="intro">
        <h1 class="title">El Tiempo</h1>
        <p class="sub clearfix">... allá donde estés</p>
    </div>
  </div>

</ons-page>
```
[volver](https://github.com/manviny/dispositivos-moviles/blob/master/README.md#monaca)


### 3.- Conectar datos entre javascript y html. 
Para ver un ejemplo de como comunicar nuestro código **javascript con html**, vamos a crear una pantalla que nos indicará la temperatura de un municipio.  
Aprovechamos la página denominada page2.html y la renombremos por **eltiempo.html**, en el index.html debemos cambiar tambien el nombre para que apunte a esta nueva página.    
**eltiempo.html**    

```html
<ons-page class="center">

    <ons-toolbar>
        <div class="center">El Tiempo</div>
    </ons-toolbar>

</ons-page>
```  

En este paso vamos a pasar datos a desde javascript a html, para ello seguimos dos pasos:  
1.- crear un controlador con nuestro código javascript  
Para crear una variable, añadimos este código
**app.js**     

```js
   /**
     * El Tiempo Ctrl
     */ 
    app.controller('ElTiempoCtrl', function($scope, $http) {  
        $scope.mitemperatura ="Temperatura en Valencia: 25 ºC"
    });
```  
2.- presentar los datos en el HTML
**eltiempo.html**
```html
<ons-page class="center"  ng-controller="ElTiempoCtrl">

    <ons-toolbar>
        <div class="center">El Tiempo</div>
    </ons-toolbar>

    <p>Temperatura y ciudad =>  {{mitemperatura}}</p>
       
</ons-page>
````
En el paso 1 hemos creado una variable, esta debe estar precedida por el conector **$scope** para hacerla accesible en nuestro código html. En el segundo paso accedemos al valor de la variable mediante {{mivariable}}.   

| javascript           	| HTML          	|
|----------------------	|---------------	|
| $scope.mitemperatura 	| {{mitemperatura}} 	|   


**Muy importante** prestar especial atención en los dos ficheros a la palabra **ElTiempoCtrl**, pues és la que hace de conector entre ambos. 
[volver](https://github.com/manviny/dispositivos-moviles/blob/master/README.md#monaca)   

###4.- Comunicar con una api de terceros mediante $http 
Previsualizar en el móvil porqué es posible que chrome no nos muestre datos, debido a la configuración CORS.
Para que nuestra app sea dinámica debemos consumir datos de fuentes externa en este caso lo haremos desde el servicio [openwheatermap](http://openweathermap.org/) que nos devuelve datos del tiempo de una o varias localidades en formato JSON.  

En nuestro caso vamos a pedirle datos de Valencia, para ello debemos hacer la siguiente llamada, *http://api.openweathermap.org/data/2.5/weather?q=Valencia,es&units=metric&lang=sp*. Si pusieramos esta linea en la url de nuestro navegador, veremos que nos devuelve datos en formato json

```json
{"coord":{"lon":-0.38,"lat":39.47},"sys":{"type":3,"id":174284,"message":0.0373,"country":"ES","sunrise":1421047251,"sunset":1421081937},"weather":[{"id":804,"main":"Clouds","description":"nubes","icon":"04n"}],"base":"cmc stations","main":{"temp":5.2,"humidity":94,"pressure":1034.34,"temp_min":5.2,"temp_max":5.2},"wind":{"speed":2.16,"deg":342.002},"clouds":{"all":88},"dt":1421043287,"id":2509954,"name":"Valencia","cod":200}
``` 
En este caso solamente queremos el nombre de la localidad y su temperatura, para ello nuestro código queda de la siguiente forma:  
**app.js**
```js
    app.controller('ElTiempoCtrl', function($scope, $http) {  
        //$scope.mitemperatura ="Temperatura en Valencia: 25 ºC";

        $http.get('http://api.openweathermap.org/data/2.5/weather?q=Valencia,es&units=metric&lang=sp')
        .success(function(data) {
            $scope.localidad = data.name;
            $scope.temperatura = data.main.temp;
            $scope.mitemperatura = data.name + '  ' + data.main.temp + ' ºC';
        })           
        .error(function(data, status, headers, config) {
            console.debug(data, status, headers, config);
        }); 
    }); 
```

Para extraer datos requeridos desde un objeto JSON, podemos ayudarnos de las suguientes webs
[editor online](http://jsoneditoronline.org/)  
[json](http://www.json.org/)  

[volver](https://github.com/manviny/dispositivos-moviles/blob/master/README.md#monaca)   
###5.- Acceder al hardware del terminal.
En este caso vamos a acceder al GPS de nuestro terminal móvil. Para ello debemos activar el plugin que nos permita acceder al GSP del teléfono:  
  
File > Manage Cordova Plugin...   

Activar el plugin **Geolocation** haciendo click en el botón **enable**    
  
Añadir el siguiente controlador 
**app.js**  
```js
   /**
     * GPS Ctrl
     */ 
    app.controller('GpsCtrl', function($scope) { 

      var options = {enableHighAccuracy: true,timeout: 5000, maximumAge: 0};

      var onSuccess = function(position) {
         $scope.$apply(function(){
             $scope.latitude = position.coords.latitude; 
             $scope.longitude = position.coords.longitude;
             $scope.altitude = position.coords.altitude;
             $scope.accuracy = position.coords.accuracy;
             $scope.altitudeAccuracy = position.coords.altitudeAccuracy;
             $scope.heading = position.coords.heading;
             $scope.speed = position.coords.speed;
             $scope.speed = position.coords.speed;
             $scope.timestamp = position.coords.timestamp;              
         })
       };

       // onError Callback receives a PositionError object
       function onError(error) {
           $scope.error = error.code + ' ' + error.message
           console.log(error)
       }

       navigator.geolocation.getCurrentPosition(onSuccess, onError);
   })     
```

**gps.html**  
```html
<ons-page class="center"  ng-controller="GpsCtrl">

    <ons-toolbar>
        <div class="center">El Tiempo</div>
    </ons-toolbar>

    <p>latitud:  {{latitude}}</p>
    <p>longitud: {{longitude}}</p>   
</ons-page>
```

y como en los otros casos, en index.html debemos apuntar a gps.html, para poder visualizarlo.  

[volver](https://github.com/manviny/dispositivos-moviles/blob/master/README.md#monaca)   


###6.-Presentar un mapa en nuestra app
**PASO 1.** Añadir las librerías necesarias   
El primer paso para poder presentar un mapa en nuestra app es instalar el css y javascript necesario, agregamos los siguientes ficheros que podemos encontrar en internet (o bien en la parte superior de este documento):   

**index.html**
```javascript
    <link rel="stylesheet" href="css/leaflet.css" />
    <script src="js/leaflet.js"></script>
    <script src="js/angular-leaflet-directive.min.js"></script> 
```
Los mapas están compuestos de pequeñas imagenes a modo de azulejos que se unen para formar un mapa que ocupe la pantalla completa, de esto se encarga **leaflet.css** y **leaflet.js** y para poder facilitar su uso mediante angularjs, cargamos [**angular-leaflet-directive.min.js**](http://tombatossals.github.io/angular-leaflet-directive/#!), que nos falicitará la escritura del código para visualizar el mapa y añadirle marcadores.  
Los ficheros se encuentran arriba en el repositorio y debemos copiarlos en:  
```
/css/leaflet.css  
/js/leaflet.js  
/js/angular-leaflet-directive.min.js  
```


**PASO 2.** Inyectar la directiva a nuestra app.   
En app.js la linea del módulo debe quedar de la siguiente forma:
```javascript
 angular.module('myApp', ['onsen','leaflet-directive']);
```
**PASO 3.** Un pequeño truco para que el mapa ocupe toda la pantalla.  
Debemos añadir a nuestra hoja de estilos style.css lo siguiente
```css
/*lefalet map*/
.angular-leaflet-map { height: 100%;}
```
**PASO 4.** Crear nuestra página, controlador y crear enlace en index.html
**app.js**  
```javascript
    app.controller('MapaCtrl', function($scope) {
        
        angular.extend($scope, {
            center: {lat: 39.469935,lng: -0.376287 ,zoom: 16}, 
            defaults: {    
                tileLayerOptions: {opacity: 0.9, detectRetina: true, reuseTiles: true,}, maxZoom:18, scrollWheelZoom: false},
                layers: { baselayers: {valencia: { name: 'OpenStreetMap',url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',type: 'xyz'}, } 
            }
        });
       
    }); 
```
**mapa.html**
```html
<ons-page class="center" ng-controller="MapaCtrl">
    <leaflet center="center" layers="layers" defaults="defaults" ></leaflet>
</ons-page>
```
En **index.html** hacer un enlace al igual que hicimos con el resto de pantallas.  

### 7.- Poner un marcador en un mapa

Cuando el ususario ponga en marcha la app buscaremos su posición y las guardaremos en una variable general accesible por todos los controladores para no tener que estar llamando al GPS cada vez que queramos saber nuestra posición. El código quedará de la siguiente forma:    
**app.js**
```javascript
// This is a JavaScript file
 angular.module('myApp', ['onsen','leaflet-directive']);

    var miPos = {};


    navigator.geolocation.getCurrentPosition(function(position) {
        miPos.lat = position.coords.latitude; 
        miPos.lng = position.coords.longitude; 
    }, function(){ console.log("no se puede acceder al gps")});


   /**
     * El Tiempo Ctrl
     */ 
    app.controller('ElTiempoCtrl', function($scope, $http) {    
        //$scope.mitemperatura ="Temperatura en Valencia: 25 ºC";
        
        $http.get('http://api.openweathermap.org/data/2.5/weather?q=Valencia,es&units=metric&lang=sp')
        .success(function(data) {
            $scope.localidad = data.name;
            $scope.temperatura = data.main.temp;
            $scope.mitemperatura = data.name + '  ' + data.main.temp + ' ºC';
        })           
        .error(function(data, status, headers, config) {
            console.debug(data, status, headers, config);
        });        
        
    }); 


   /**
     * GPS Ctrl
     */ 
    app.controller('GpsCtrl', function($scope) { 

      var options = {enableHighAccuracy: true,timeout: 5000, maximumAge: 0};

      var onSuccess = function(position) {
         $scope.$apply(function(){
             
             $scope.latitude = position.coords.latitude; 
             $scope.longitude = position.coords.longitude;
             $scope.altitude = position.coords.altitude;
             $scope.accuracy = position.coords.accuracy;
             $scope.altitudeAccuracy = position.coords.altitudeAccuracy;
             $scope.heading = position.coords.heading;
             $scope.speed = position.coords.speed;
             $scope.speed = position.coords.speed;
             $scope.timestamp = position.coords.timestamp;              
         })
       };

       // onError Callback receives a PositionError object
       function onError(error) {
           $scope.error = error.code + ' ' + error.message
           console.log(error)
       }

        /**
         * GPS alta precisión
         */ 
        //navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    
        /**
         *  WIFI precisión depende de la conexión
         */ 
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
   })    
   
   
   
   
    app.controller('MapaCtrl', function($scope) {
        $scope.marcadores = {};

        
        angular.extend($scope, {
            center: {lat: miPos.lat,lng: miPos.lng ,zoom: 16}, 
            marcadores: {},
            defaults: {    
                tileLayerOptions: {opacity: 0.9, detectRetina: true, reuseTiles: true,}, maxZoom:18, scrollWheelZoom: false},
                layers: { baselayers: {valencia: { name: 'OpenStreetMap',url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',type: 'xyz'}, } 
            }
        });
        $scope.marcadores =  {
                miposicion: {
                    lat: miPos.lat,
                    lng: miPos.lng,
                    message: "Soy yo!",
                    focus: true,
                    draggable: false
                }
        };      
      
      
    });    
    
```

y en **mapa.html** cambiar la etiqueta leaflet para que quede de la siguiente forma  
```html
<leaflet center="center" markers="marcadores" layers="layers" defaults="defaults" ></leaflet>
```
[volver](https://github.com/manviny/dispositivos-moviles/blob/master/README.md#monaca)


### 8.- Hacer clic en al mapa para saber ciudad y temperatura
**app.js** debe quedar de la siguiente forma:  
```javascript
  // This is a JavaScript file
 angular.module('myApp', ['onsen','leaflet-directive']);

    var miPos = {};


    navigator.geolocation.getCurrentPosition(function(position) {
        miPos.lat = position.coords.latitude; 
        miPos.lng = position.coords.longitude; 
    }, function(){ console.log("no se puede acceder al gps")});


   /**
     * El Tiempo Ctrl
     */ 
    app.controller('ElTiempoCtrl', function($scope, $http) {    
        //$scope.mitemperatura ="Temperatura en Valencia: 25 ºC";
        
        $http.get('http://api.openweathermap.org/data/2.5/weather?q=Valencia,es&units=metric&lang=sp')
        .success(function(data) {
            $scope.localidad = data.name;
            $scope.temperatura = data.main.temp;
            $scope.mitemperatura = data.name + '  ' + data.main.temp + ' ºC';
        })           
        .error(function(data, status, headers, config) {
            console.debug(data, status, headers, config);
        });        
        
    }); 


   /**
     * GPS Ctrl
     */ 
    app.controller('GpsCtrl', function($scope) { 

      var options = {enableHighAccuracy: true,timeout: 5000, maximumAge: 0};

      var onSuccess = function(position) {
         $scope.$apply(function(){
             
             $scope.latitude = position.coords.latitude; 
             $scope.longitude = position.coords.longitude;
             $scope.altitude = position.coords.altitude;
             $scope.accuracy = position.coords.accuracy;
             $scope.altitudeAccuracy = position.coords.altitudeAccuracy;
             $scope.heading = position.coords.heading;
             $scope.speed = position.coords.speed;
             $scope.speed = position.coords.speed;
             $scope.timestamp = position.coords.timestamp;              
         })
       };

       // onError Callback receives a PositionError object
       function onError(error) {
           $scope.error = error.code + ' ' + error.message
           console.log(error)
       }

        /**
         * GPS alta precisión
         */ 
        //navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    
        /**
         *  WIFI precisión depende de la conexión
         */ 
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
   })    
   
   
   
   
    app.controller('MapaCtrl', function($scope) {
        $scope.marcadores = {};

        $scope.$on('leafletDirectiveMap.click', function(event, args){
            alert(JSON.stringify(args.leafletEvent.latlng))
        });
       
       
        angular.extend($scope, {
            center: {autoDiscover:true ,zoom: 16}, 
            marcadores: {},
            defaults: {    
                tileLayerOptions: {opacity: 0.9, detectRetina: true, reuseTiles: true,}, maxZoom:18, scrollWheelZoom: false},
                layers: { baselayers: {valencia: { name: 'OpenStreetMap',url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',type: 'xyz'}, } 
            },
            events: {
              map: {
                enable: ['click', 'drag', 'blur', 'touchstart'],
                logic: 'emit'
              }
            },  
        });
        $scope.marcadores =  {
                miposicion: {
                    lat: miPos.lat,
                    lng: miPos.lng,
                    message: "Soy yo!",
                    focus: true,
                    draggable: false
                }
        };      
      
      
    });    
```
**mapa.html**, sustituir:  
```html
 <leaflet center="center" markers="marcadores" layers="layers" defaults="defaults"  event-broadcast="events"></leaflet>
 ```


```javascript

    app.controller('FirebaseCtrl', function($scope) {
   
        var miBD = new Firebase('https://toroembolao.firebaseio.com/');
        
        var name = 'Manol';
        var text = 'Este testo va a la base de datos';
        
        miBD.set('User ' + name + ' says ' + text);
        miBD.push({name: name, text: text});
        
        $scope.misDatos = $firebase(miBD).$asArray();

    });  
```


###Empaquetar la app para instalarla en un móvil
###[xml to json](http://davidwalsh.name/convert-xml-json)
[listado apis](https://www.mashape.com/)   
Para llamar una API con key se debe poner la cabecera:  
```javascript
$http.get('www.google.com/someapi', {
    headers: {'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='}
});
```

