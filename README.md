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
sudo -s /opt/dreamfactory-2.0.2-0/ctlscript.sh start

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
sudo ./bitnami-dreamfactory-2.0.2-0-linux-x64-installer.run
```

##Instalar AWS CLI
[fuente](https://alestic.com/2013/08/awscli/)   
```sh
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install -y python-pip  # sino lo tenemos instalado
sudo pip install awscli

aws configure
# AWS Access Key ID [None]: id
# AWS Secret Access Key [None]: llave
# Default region name [None]: zona si la zona es por ej eu-west-1a poner sin la última letra -> eu-west-1
# Default output format [None]:json
```
##Automated ec2 backups
[fuente](http://www.webmoves.net/blog/build/simple-automated-snapshots-of-multiple-ebs-volumes-3102/)    
[fuente mejor](https://www.drunksysadmin.com/automated-amazon-ebs-snapshots/) 


```sh




PATH=/opt/someApp/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/home/ubuntu/aws-missing-tools
SHELL=/bin/bash
39 13 * * * /home/ubuntu/aws-missing-tools/ec2-automate-backup.sh -r "eu-west-1" -v "vol-48d356bb"                   #Crea backup






# Borra volumenes con mas de 7 dias que esten etiquetados como Backup true  
$ ./ec2-automate-backup.sh -r eu-west-1 -s tag -t 'Backup=true' -k 7 -p -n  

# Crea copia  
./ec2-automate-backup.sh -r "eu-west-1" -v "vol-48d356bb" 

#  Cron
"0 0 * * 0 ubuntu /home/ubuntu/aws-missing-tools/ec2-automate-backup.sh -s tag -t "Backup=true" > /home/ubuntu/aws-missing-tools/ec2-automate-backup_`date +"%Y%m%d"`.log"


/home/ubuntu/aws-missing-tools/cron-primer.sh


./ec2-automate-backup.sh -r "eu-west-1" -s tag -t "Backup=true" > ./ec2-automate-backup_`date +"%Y%m%d"`.log 
./ec2-automate-backup.sh -r eu-west-1 -s tag -t 'Backup=true' -k 7 -p -n -c /root/bin/cron-primer.sh  
0 22 * * * /root/bin/ec2-automate-backup.sh -r eu-west-1 -s tag -t 'Backup=true' -k 7 -p -n -c /root/bin/cron-primer.sh  
./ec2-automate-backup.sh -r "eu-west-1" -v "vol-48d356bb"  
```

## Convert snapshot to server



## Install webmin on ubuntu EC2  
[fuente mejor](http://xcruft.com/content/install-webmin-ubuntu-1404-using-aws-ec2-free-tier)  
```sh
# open port 1000
Type: Custom TCP Rule
Protocol: TCP
Port Range: 10000
Source: (Select "My IP) - Makes it work only from your current location.

# install
 wget http://prdownloads.sourceforge.net/webadmin/webmin_1.770_all.deb  
 sudo apt-get install perl libnet-ssleay-perl openssl libauthen-pam-perl libpam-runtime libio-pty-perl apt-show-versions python
 sudo dpkg --install webmin_1.770_all.deb
 
# add user  "adminuser"
sudo adduser adminuser
sudo usermod -a -G sudo adminuser

```
https://ip:10000  

