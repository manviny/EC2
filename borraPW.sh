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
