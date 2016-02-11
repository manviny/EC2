## Conexión puente a BD
MySQL y RockMongo mediante conexión puente  
sudo ssh -N -L 8888:127.0.0.1:80 -i ~/.ssh/bitnami-hosting.pem bitnami@deployd.bitnamiapp.com  

acceder a las bases de datos  
http://127.0.0.1:8888/rockmongo/  
http://127.0.0.1:8888/phpmyadmin/  


## Instalar nuevas webs en nuestro servidor
Para windows usar putty [video](https://youtu.be/lxKQ3Sq47mc)     
Para Mac o Linux usar desde un terminal:  
```sh
$ sudo ssh -i ~/.ssh/millave.pem bitnami@254.254.254.254
```
Ahora estamos en el terminal que comunica con nuestro servidor
```sh
$ cd   
$ pwd          #debemos estar en /home/bitnami
$ sudo nano creaweb.sh
# Pegamos todos el script del cuadro de abajo
# en la 6 linea por el final -> mysql -u root -p********* << EOF, sustituimos los asteriscos por nuestro password.
# el password lo tenemos en la consola de bitnami Server > properties > application credentials
# Y pulsamos Ctrl+X y seguidamente Y
$ sudo chmod +x creaweb.sh    # anotamos el password generado de ls BD
$ sudo ./creaweb.sh miweb
# Vamos a descargar Processwire
$ cd apps/miweb/htdocs
$ wget https://github.com/ryancramerdesign/ProcessWire/archive/master.zip
$ sudo unzip master.zip
$ sudo mv ProcessWire-master/* ./
$ sudo mv site-classic site


```


## Creaweb.sh
```bash
#!/bin/bash

# creaweb miweb miweb.zip



# 1.- Crea estructura de directorios
sudo -u $USER mkdir -p /opt/bitnami/apps/$1/htdocs /opt/bitnami/apps/$1/conf


# 2.- Permisos archivos y directorios para el usuario bitnami
sudo -u $USER chown -R bitnami /opt/bitnami/apps/$1


# 3.- descomprimir zip de la app, sino exite crea un phpinfo como 
if [ -n "$2" ]
then
    unzip ./$2 /opt/bitnami/apps/$1/htdocs/
else
	sudo -u $USER echo '<?php phpinfo(); ?>' > /opt/bitnami/apps/$1/htdocs/index.php	
fi




# 4.- Crea configuración para acceder a la web http://mibitnami.com/miweb
sudo -u $USER cat > /opt/bitnami/apps/$1/conf/$1.conf <<EOL
Alias /$1/ "/opt/bitnami/apps/$1/htdocs/"
Alias /$1 "/opt/bitnami/apps/$1/htdocs"
<Directory "/opt/bitnami/apps/$1/htdocs">
    Options Indexes MultiViews
    AllowOverride All
    <IfVersion < 2.3 >
    Order allow,deny
    Allow from all
    </IfVersion>
    <IfVersion >= 2.3>
    Require all granted
    </IfVersion>
</Directory>
EOL


# 5.- Añadir en la útima linea  de la configuración de apache la nueva entrada
echo Include "/opt/bitnami/apps/$1/conf/$1.conf" >> /opt/bitnami/apache2/conf/httpd.conf


# 6.- Reinicializar servicio apache
/opt/bitnami/ctlscript.sh restart apache

# 7.- lista webs disponibles
ls -ls /opt/bitnami/apps

# 8.- Crear Base de datos
echo "creando BD"
pass=`tr -dc A-Za-z0-9 < /dev/urandom | head -c 8 | xargs`
echo $pass

mysql -u root -p********* << EOF
CREATE DATABASE IF NOT EXISTS $1;
GRANT USAGE ON *.* TO $1@localhost IDENTIFIED BY '$pass';
GRANT ALL PRIVILEGES ON $1.* TO $1@localhost;
FLUSH PRIVILEGES;
EOF
```

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
