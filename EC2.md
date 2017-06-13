## Acceder al servidor mediante putty
  - Se necesita la llave .pem
  - 
```sh
sudo su
apt-get update && apt-get -y upgrade
# INCREMENTAR SWAP SI SOLO TENEMOS 1GB
wget http://software.virtualmin.com/gpl/scripts/install.sh
chmod +x install.sh
./install.sh
# add user  "myuser"
sudo adduser myuser
sudo usermod -a -G sudo myuser
```

## Permitir acceder a un puerto desde una sola IP
  1 Entramos en la consola de AWS
  2 Vamos a servicios -> EC2
  3 En el menú izquierdo pulsamos Security Groups