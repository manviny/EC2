#!/bin/bash

# comprubea parametro 
if [ -n "$1" ]
then
    echo "Cargando..."
else 
    echo "Saliendo, falta nombre de la web"
    exit
fi

cd /opt/bitnami/apps/$1/htdocs/site/modules
rm -rf ./PwAngular
mkdir PwAngular 
wget https://github.com/manviny/manviny.PwAngular/archive/master.zip  
unzip master.zip


echo "Se han instalado PwAngular"


