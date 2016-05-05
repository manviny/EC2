#!/bin/bash

# creaweb nombreweb dbpass 

if [ -n "$2" ]
then
    echo "Procedemos a instalar"
else 
    echo "Saliendo, falta password de la base de datos"
    exit
fi

# 1.- Crea estructura de directorios
sudo -u $USER mkdir -p /opt/bitnami/apps/$1/htdocs /opt/bitnami/apps/$1/conf


# 2.- Permisos archivos y directorios para el usuario bitnami
sudo -u $USER chown -R bitnami /opt/bitnami/apps/$1

# 3.- descargar y descomprimir processwire
cd /opt/bitnami/apps/$1/htdocs

if [ -n "$3" ]
then
    echo "Descargando $3"
    wget $3
else 
    echo "Descargando ProcessWire desde la web oficial"
    wget https://github.com/ryancramerdesign/ProcessWire/archive/master.zip
fi

sudo unzip master.zip
sudo mv ProcessWire-master/* ./
sudo mv site-default site
sudo rm -rf site-*
# 3,5.- permisos para instalar 
sudo chown bitnami:daemon -R /opt/bitnami/apps/$1/htdocs/*
sudo chmod 775 -R ./site/assets /opt/bitnami/apps/$1/htdocs/site/modules
sudo chmod 775 /opt/bitnami/apps/$1/htdocs/site/config.php
sudo mv /opt/bitnami/apps/$1/htdocs/htaccess.txt /opt/bitnami/apps/$1/htdocs/.htaccess

# 3.- descomprimir zip de la app, sino exite crea un phpinfo como 

#if [ -n "$3" ]
#then
#     sudo unzip ./$3 /opt/bitnami/apps/$1/htdocs/
#else 

#    sudo -u $USER echo '<?php phpinfo(); ?>' > /opt/bitnami/apps/$1/htdocs/index.php    
#fi




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
sudo /opt/bitnami/ctlscript.sh restart apache

# 7.- lista webs disponibles
#ls -ls /opt/bitnami/apps

# 8.- Crear Base de datos
echo "Tu usuario es: "$1
echo "El nombre de la base de datos es: "$1
pass=`tr -dc A-Za-z0-9 < /dev/urandom | head -c 8 | xargs`
echo "El password de la base de datos es: " $pass
# vuelve a la raiz /home/binami
cd

mysql -u root -p$2 << EOF
CREATE DATABASE IF NOT EXISTS $1;
GRANT USAGE ON *.* TO $1@localhost IDENTIFIED BY '$pass';
GRANT ALL PRIVILEGES ON $1.* TO $1@localhost;
FLUSH PRIVILEGES;
EOF
