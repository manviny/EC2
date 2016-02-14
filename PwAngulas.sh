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
cd PwAngular
wget https://github.com/manviny/manviny.PwAngular/archive/master.zip  
unzip master.zip
sudo mv manviny.PwAngular-master/* ./
rm master.zip


echo "Se han instalado PwAngular"


