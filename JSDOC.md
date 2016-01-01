[angular-jsdoc](https://github.com/allenhwkim/angular-jsdoc)  
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


https://github.com/jsdoc3/jsdoc  
http://usejsdoc.org/  
http://samwize.com/2014/01/31/the-best-documentation-generator-for-node/  


```bash
sudo npm install jsdoc -g

# isntall theme
sudo npm install ink-docstrap -g
cd /usr/local/lib/node_modules/jsdoc
```

Create conf.json and paste
```json
{
    "tags": {
        "allowUnknownTags": true
    },
    "source": {
        "includePattern": ".+\\.js(doc|x)?$",
        "excludePattern": "(^|\\/|\\\\)_"
    },
    "plugins": [],
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false,
        "default": {
            "outputSourceFiles": true
        },
        "systemName"      : "DocStrap",
        "footer"          : "",
        "copyright"       : "DocStrap Copyright © 2012-2013 The contributors to the JSDoc3 and DocStrap projects.",
        "navType"         : "vertical",
        "theme"           : "cerulean",
        "linenums"        : true,
        "collapseSymbols" : false,
        "inverseNav"      : true
    }
}
```
## create doc
```bash
jsdoc chatroom.js -t /usr/local/lib/node_modules/ink-docstrap/template -c /usr/local/lib/node_modules/jsdoc/conf.json

```
## Automate jsdoc
```bash
npm install -g grunt-cli
npm install grunt-jsdoc --save-dev

```
