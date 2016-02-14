## Conexión puente a BD
MySQL y RockMongo mediante conexión puente  
sudo ssh -N -L 8888:127.0.0.1:80 -i ~/.ssh/bitnami-hosting.pem bitnami@deployd.bitnamiapp.com  

acceder a las bases de datos  
http://127.0.0.1:8888/rockmongo/  
http://127.0.0.1:8888/phpmyadmin/  


## Instalar nuevas webs en nuestro servidor [PW](https://processwire.com/talk/topic/9858-script-to-create-new-pw-in-bitnami-stack/)
Para windows usar putty [video](https://youtu.be/lxKQ3Sq47mc)   

[![ScreenShot](https://raw.github.com/GabLeRoux/WebMole/master/ressources/WebMole_Youtube_Video.png)](https://youtu.be/lxKQ3Sq47mc)

Para Mac o Linux usar desde un terminal:  
```sh
$ sudo ssh -i ~/.ssh/millave.pem bitnami@254.254.254.254
```
###Desde el terminal que comunica con nuestro servidor
```sh
# Debemos asegurarnos de estar en la ruta correcta (/home/bitnami), vamos a comprobarlo
$ cd   
$ pwd          #debemos estar en /home/bitnami

# Descargamos una sola vez el script para crear la estructura de la web y BD
$ wget https://gist.githubusercontent.com/manviny/459d7fd7e234540a0786/raw/cffe427cb1211b5907fa4a7fd5825fa8f21f657e/creaPW.sh
$ wget https://gist.githubusercontent.com/manviny/459d7fd7e234540a0786/raw/cffe427cb1211b5907fa4a7fd5825fa8f21f657e/finaliza.sh  && sudo chmod +x finaliza.sh
$ wget https://gist.githubusercontent.com/manviny/459d7fd7e234540a0786/raw/cffe427cb1211b5907fa4a7fd5825fa8f21f657e/borraPW.sh  && sudo chmod +x borraPW.sh
# Ahora podemos crear una nueva web con: sudo ./creaPW.sh seguido de nombreWeb y DBpass
$ sudo ./creaPW.sh miweb dbpass
```
###Ahora tenemos la web disponible para configurar
1. Ir al navegador y ponemos la url: usuario.bitnamiapp.com/miweb  
2. Rellenamos los datos de la base de datos **DB Name**, **DB USer** y **DB Pass** con los datos generados en el script anterior.
3. **Default Time Zone** seleccionamos Europe/Madrid
4. Pasamos a la siguiente pantalla y en **Admin Panel Information** ponemos **admin**
5. en **User**, **Password**,  **mail**,ponemos nuestros datos para poder acceder al administrador
6. Volver al terminal y escribir sudo ./finaliza.sh miweb



##borraweb.sh
```bash
#!/bin/bash

# borraweb miweb 


# 1.- Borra estructura de directorios

sudo rm -r /opt/bitnami/apps/$1/

# 2.- Quitar linea  de la configuración de apache 
grep -v "/$1/conf/$1.conf" /opt/bitnami/apache2/conf/httpd.conf > temp && mv temp /opt/bitnami/apache2/conf/httpd.conf



# 3.- Reinicializar servicio apache

/opt/bitnami/ctlscript.sh restart apache

# 4.- lista webs disponibles
ls -ls /opt/bitnami/apps
```

## Conectar sublime text con servidor creado con bitnami [video](https://youtu.be/mAgvZ-dyPWQ)


## Script para instalar web en servidor creado con bitnami [enlace](https://processwire.com/talk/topic/9858-script-to-create-new-pw-in-bitnami-stack/)

## Preparar sublime text para acceder a los ficheros de nuestra web en AWS
1. Descarga la llave .ppk desde nuestra consola de bitnami (servidor > manage > connect)

## Arrastrar a sublime text los ficheros que necesitamos para nuestra nueva web.
1. Arrastramos la carpeta templates hasta sublime text  C:/bitnami/processwire/apps/processwire/htdocs/site/templates   

## Preparamos la cabecera y pie compartido en todas las páginas
1. Borramos el contenido de _init.php, _main.php y home.php   
2. Vamos a instalar una plantilla, para ello abrimos en sublime text cualquier html de la plantilla.  
3. Copiamos en _init.php la parte de la cabecera que compartiran todas las páginas de nuestra web. Si abrimos el inspector veremos muchas lineas en rojo, pues no encuentra los ficheros css, volveremos sobre este aspecto luego.
4. Copiamos la parte del pie que se repetirá en todas las páginas en _main.php


## Instalar todos los ficheros CSS y JS necesarios para esta plantilla
1. Arrastramos todos los css a nuestra carpeta de styles y los js a scripts ( por SFTP hacer upload folder)
2. Hacer lo mismo con font e images
3. Ahora en todas las lineas, tanto de css como de js sustituiremos de la siguiente forma
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


## Cambiar el idioma [video](https://youtu.be/lWXvyRH2tpw)
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
 ```bash
# Necesitamos instalar el módulo Pages2JSON
# Crear carpeta PwAngular en C:/bitnami/processwire/apps/MIWEB/htdocs/site/modules
$ cd /home/bitnami/apps/MIWEB/htdocs/site/modules
$ mkdir PwAngular
$ cd PwAngular
$ wget https://github.com/manviny/processgular/archive/master.zip
$ unzip master.zip
Poner el contenido de https://github.com/manviny/processgular/tree/master
```
 ## Vamos a probarlo en home.php
 ```php
 
    ## Pegar este código
<script>
    app.controller('HomeCtrl', function ($scope, PW) {

     	$scope.saluda = function(){
     		toastr.info( 'Bienvenido '  ,{timeOut:4000});
     	}

    });
</script>

<div class="container" ng-controller="HomeCtrl">
	<button ng-click="saluda()">saluda</button>
</div>
 ```
