#!/bin/bash

cd /home/bitnami/apps/$1/htdocs
sudo chmod 644  ./site/config.php
sudo find . -type d -exec chmod 775 {} \;
sudo find . -type f -exec chmod 664 {} \;
sudo chown -R bitnami:daemon ./*
sudo rm -rf site-beginner  site-classic  site-default  site-languages ProcessWire-master
sudo rm master.zip install.php
