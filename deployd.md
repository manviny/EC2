##[guia](http://terraltech.com/how-to-setup-deployd-on-ubuntu-server/)    


## Instalar DeployD  
[comandos mongodb](https://github.com/manviny/MongoDB/wiki/comandos-b%C3%A1sicos)  
```sh

# instalar nodejs
sudo apt-get install nodejs

#instalat npm
sudo apt-get install npm

# Create a symbolic link for node, as many Node.js tools use this name to execute
sudo ln -s /usr/bin/nodejs /usr/bin/node

# isntalar deployd
sudo npm install deployd -g   # /usr/local/bin/dpd -> /usr/local/lib/node_modules/deployd/bin/dpd
dpd -V

# Instalar mogoDB
sudo apt-get install mongodb-server
mongod --version
# abrir puerto 2403

```

##[Deployd en Ubuntu Server](http://terraltech.com/how-to-setup-deployd-on-ubuntu-server/#.VCY3GSmSwRZ)
## Crear usuario administrador
```bash
mongo shell 
use admin
db.addUser( { user: "deployd", pwd: "deployd", roles: [ "userAdminAnyDatabase" ] } )
use deployd
db.addUser( { user: "deployd", pwd: "deployd", roles: [ "readWrite", "dbAdmin" ] } )
```

##Instalar Forever
```bash 
$ npm install forever -g
$ # basic commands
$ forever start production.js
$ forever stop 0
$ forever list
```

##Deployd en producción
```javascript
// production.js
// si no carga deployd =>   
*export NODE_PATH="/usr/lib/node_modules"*  
;$ sudo chown -R `whoami` /usr/lib/node_modules , en CENTOS
;$ sudo chown -R `whoami` /usr/local/lib/node_modules, en UBUNTU
//  
var deployd = require('deployd');  

var server = deployd({  
  port: process.env.PORT || 5000,  
  env: 'production',  
  db: {  
    host: 'localhost',  
    port: 27017,  
    name: 'chat',  
    credentials: {  
      username: 'chat',  
      password: 'chat'  
    }  
  }  
});  

server.listen();  

server.on('listening', function() {  
  console.log("Server is listening");  
});  

server.on('error', function(err) {  
  console.error(err);  
  process.nextTick(function() { // Give the server a chance to return an error  
    process.exit();  
  });
``` 
