[angular-jsdoc](https://github.com/allenhwkim/angular-jsdoc)  

## Install jsdoc and angular-jsdoc
```bash
sudo npm install -g jsdoc angular-jsdoc --save-dev 
sudo nano /usr/local/lib/node_modules/angular-jsdoc/common/conf.json  
# change relative paths to these
    #"/usr/local/lib/node_modules/jsdoc/plugins/markdown",  
    #"/usr/local/lib/node_modules/angular-jsdoc/common/plugins/ngdoc" 
```
 
    
## USE    
jsdoc example.js -t /usr/local/lib/node_modules/angular-jsdoc/angular-template -c /usr/local/lib/node_modules/angular-jsdoc/common/conf.json

## EXAMPLES
https://rawgit.com/allenhwkim/angular-jsdoc/master/angular-template/docs/ngmap.MapController.html  

## automate with grunt
http://hashbang.nl/angular/2015/02/10/simple-and-clear-angular-application-documentation-using-angular-jsdoc/


## Automator
creadoc.sh
```bash
#!/bin/bash

# LLAMADA  =>  
#  $1 =>  path completo al directorio con el /js
#  $2 =>  directorio de salida dentro de __DOCS
#  ./creadoc.sh '/Users/manol/Development/Monaca/kuentemobile/kuenteMobile/www/js/ *.js' 'kuentemobile'																	
cd ./$2
jsdoc $1 -t /usr/local/lib/node_modules/angular-jsdoc/angular-template -c /usr/local/lib/node_modules/angular-jsdoc/common/conf.json
cd ../
open ./$2/out
```
automator -> nombreapp
```bash
cd /Users/manol/Development/__DOCS/
./creadoc.sh '/Users/manol/Development/Monaca/kuentemobile/kuenteMobile/www/js/ *.js' 'kuentemobile'
```

