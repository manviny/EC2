## Arrastrar a sublime text los ficheros que necesitamos para nuestra nueva web.
1. Arrastramos la carpeta templates hasta sublime text  C:/bitnami/processwire/apps/processwire/htdocs/site/templates   

## Preparamos la cabecera y pie compartido en todas las páginas
1. Borramos el contenido de _init.php, _main.php y home.php   
2. Vamos a instalar una plantilla, para ello abrimos en sublime text cualquier html de la plantilla.  
3. Copiamos en _init.php la parte de la cabecera que compartiran todas las páginas de nuestra web. Si abrimos el inspector veremos muchas lineas en rojo, pues no encuentra los ficheros css, volveremos sobre este aspecto luego.
4. Copiamos la parte del pie que se repetirá en todas las páginas en _main.php


## Instalar todos los ficheros CSS y JS necesarios para esta plantilla
1. Arrastramos todos los css a nuestra carpeta de styles y los js a scripts
2. Ahora en todas las lineas, tanto de css como de js sustituiremos de la siguiente forma
```php
    # donde ponga por ejemplo: ccs/bootstrap.min.css  =>  
    <?php echo $config->urls->templates?>css/bootstrap.min.css  
    # 
```

## logo y fuentes
1. Si tenemos un logo o fuentes debemos seguir los mismos pasos que en el caso de css y js  

## Páginas
Ahora podemos ya empezar a crear cada página de nuestra web.  
La página principal es home.php (inicio, portada)  


## Cambiar el idioma
1. En el menú principal: Modules > Core y activar "Languages Support"
2. Ahora desde el menu principal ir a Setup y Languages, add new
3. tanto es title como name poner **es**
4. En la nueva ventana que se ha abierto, pulsar el texto rojo a mitad de pantalla "language packs"
5. Pinchar en Spanish(es-ES) v.2 y al final de la página darle a "Download this module"
6. Arrastramos el fichero descargado a  Site Translation Files y en pocos segundo podemos pinchar en Save
7. Ahora necesitamos decirle que nuestro idioma preferido es el español
8. Vamos al menu Access > users y pinchamos en el nuestro
9. Al final seleccionamos es y ya tenemos el idioma preferido.

## Instalar angular
1. Necesitamos instalar el módulo Pages2JSON
2. Crear carpeta PwAngular en C:/bitnami/processwire/apps/processwire/htdocs/site/modules
3. Poner el contenido de https://github.com/manviny/processgular/tree/master

 ## Vamos a probarlo en home.php
 ```php
 
    ## Pegar este código
<script>
    app.controller('HomeCtrl', function ($scope, PW) {

     	$scope.saluda = function(){
     		alert('hola')
     	}

    });
</script>

<div class="container" ng-controller="HomeCtrl">
	<button ng-click="saluda()">saluda</button>
</div>
 ```
