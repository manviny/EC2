[angular-jsdoc ](https://github.com/allenhwkim/angular-jsdoc)  
sudo npm install -g jsdoc angular-jsdoc --save-dev  

sudo nano /usr/local/lib/node_modules/angular-jsdoc/common/conf.json  
change those lines  
    "/usr/local/lib/node_modules/jsdoc/plugins/markdown",  
    "/usr/local/lib/node_modules/angular-jsdoc/common/plugins/ngdoc"  
    
jsdoc example.js -t /usr/local/lib/node_modules/angular-jsdoc/angular-template -c /usr/local/lib/node_modules/angular-jsdoc/common/conf.json


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
