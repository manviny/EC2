#!/bin/bash
if [ -n "$1" ]
then
    echo "Procedemos a fijar permisos"
else 
    echo "Saliendo, falta nombre de la web"
    exit
fi
cd /home/bitnami/apps/$1/htdocs
sudo chmod 655  ./site/config.php
sudo find . -type d -exec chmod 775 {} \;
sudo find . -type f -exec chmod 664 {} \;
sudo chown -R bitnami:daemon ./*
sudo rm -rf site-beginner  site-classic  site-default  site-languages ProcessWire-master
sudo rm master.zip install.php
