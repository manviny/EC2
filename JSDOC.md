https://github.com/jsdoc3/jsdoc  
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
# OR
jsdoc -c /usr/local/lib/node_modules/jsdoc/conf.json -t /usr/local/lib/node_modules/ink-docstrap/template -R README.md -r .

```

