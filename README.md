##Conectar con el servidor
sudo ssh -i ~/.ssh/ec2.pem ubuntu@1.2.3.4  
Abrir puertos 80, 8080 y 8069  


##INCREMENTAR SWAP
[fuente](https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-14-04)

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo nano /etc/fstab  (add this line)
    /swapfile   none    swap    sw    0   0
sudo nano /etc/sysctl.conf  #paste
    vm.swappiness=10
    vm.vfs_cache_pressure=50

```


##Inicializa aplicaciones "on reboot"

Crear script starter.sh (hacerlo ejecutable sudo chmod +x starter.sh)  
```bash
#!/bin/sh

#Inicializar deployd (se debe usar cada vez que se apaga el servidor)
if [ $(ps -e -o uid,cmd | grep $UID | grep node | grep -v grep | wc -l | tr -s "\n") -eq 0 ]
then
        export PATH=/opt/bitnami/nodejs/bin:$PATH
        forever start --sourceDir /home/bitnami/apps/deployd/CATIC production.js >> /home/bitnami/log.txt 2>&1
        #/opt/bitnami/nodejs/bin/forever start /home/bitnami/apps/deployd/CATIC/production.js  2>&1 > /dev/null
fi

#Inicializar DreamFactory
/opt/dreamfactory-2.0.2-0/ctlscript.sh start

```
Crear un cron para ejecutar el script anterior cada vez que se apaga el servidor
```bash
sudo crontab -e
```
añadir
```bash

# Sync files to S3
#26 22 * * * cd /home/bitnami/apps/assets
#27 22 * * * s3cmd sync -r --delete-removed --acl-private files s3://bucket/assets/

# ejecuta tareas
@reboot /home/ubuntu/starter.sh
```

##Instalar Odoo 9
[fuente](http://toolkt.com/site/installing-odoo-9-in-ubuntu-14-04/)

```sh
sudo nano odoo-install.sh
    # PEGAR EL CONTENIDO DE -> https://github.com/Yenthe666/InstallScript/blob/9.0/odoo_install.sh
sudo chmod +x odoo-install.sh
sudo ./odoo-install.sh
```

##Instalar Dreamfactory
[fuente](https://bitnami.com/stack/dreamfactory/installer)  

```sh
wget https://bitnami.com/redirect/to/83996/bitnami-dreamfactory-2.0.2-0-linux-x64-installer.run
chmod +x bitnami-dreamfactory-2.0.2-0-linux-x64-installer.run
./bitnami-dreamfactory-2.0.2-0-linux-x64-installer.run
```
