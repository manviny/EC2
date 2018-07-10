---
layout: default
---

## OSX Crontab
```bash
env EDITOR=nano crontab -e  
43 16 * * 1-5  cd ~/my/backup/folder && ./backup.sh  
crontab -l
```
## Remove https from virtualmin root domain
```bash
nano /etc/webmin/miniserv.conf  > sssl=0  
/etc/init.d/webmin restart  
systemctl status webmin.service


sudo nano /etc/webmin/miniserv.conf  
#ipcert_subsite.contoso.com,*.subsite.contoso.com=/home/contoso/ssl.cert  
#ipkey_subsite.contoso.com,*.subsite.contoso.com=/home/contoso/ssl.key  
sudo service webmin start  
```
Text can be **bold**, _italic_, or ~~strikethrough~~.

## CEFIRE
[CEFIRE](./yieldCefire.md).



# Electron project with Proton and Vue

## 0.- Electron + Photon + Vue

```bash
 git clone https://github.com/manviny/electronMaster
 cd electronMaster
 npm install && npm start
```


## 1.- [electron](https://electronjs.org/)
```bash
 git clone https://github.com/electron/electron-quick-start
 cd electron-quick-start
 npm install &amp;&amp; npm start
```

## 2.- [minified Photon](https://github.com/connors/photon/releases/download/v0.1.2-alpha/photon-0.1.2-dist.zip)

 **paste photon files to electron-quick-start project**

```js
//change in main.js
  mainWindow.loadFile('index.html')
//by 
  mainWindow.loadFile('template-app/index.html')
```

```bash
 npm install &amp;&amp; npm start
```
## 3.- [VUEJS](https://vuejs.org/)
## npm i vue --save
```html
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
````

## 4.- Recursos

- [AWS Amplify](https://aws.github.io/aws-amplify/media/quick_start)
- [Photon components](http://photonkit.com/components/)
- [Electron Toolkit](https://www.npmjs.com/package/electron-toolkit)
- [TOOLKIT intro](https://hackernoon.com/introducing-electron-toolkit-the-electron-app-to-build-and-launch-electron-apps-6530450e257e)
- 
- http://flexslider.woothemes.com/thumbnail-slider.html
- http://dfcb.github.io/BigVideo.js/
- https://blueimp.github.io/Gallery/

### Prepare React Native environment
```bash
brew update
brew upgrade
brew install node
brew install watchman

npm install -g react-native-cli
```
### Start React Native app
```bash
react-native init albums
```
### Launch  app on emulator
```bash
react-native run-ios
react-native run-android
```
### Prepare Android Studio
1. Open existing project, go to the one created in last command and fix errors.  
2. Tools > Android > AVD Manager > Create Virtual Device (Nexus 5, Marshmallow,23)
 
##completely remove nodejs
sudo rm -rf /usr/local/{bin/{node,npm},lib/node_modules/npm,lib/node,share/man/*/node.*}

## more

There should be whitespace between paragraphs.

There should be whitespace between paragraphs. We recommend including a README, or a file with information about your project.

# Header 1

This is a normal paragraph following a header. GitHub is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere.

## Header 2

> This is a blockquote following a header.
>
> When something is important enough, you do it even if the odds are not in your favor.

### Header 3

```js
// Javascript code with syntax highlighting.
var fun = function lang(l) {
  dateformat.i18n = require('./lang/' + l)
  return true;
}
```

```ruby
# Ruby code with syntax highlighting
GitHubPages::Dependencies.gems.each do |gem, version|
  s.add_dependency(gem, "= #{version}")
end
```

#### Header 4

*   This is an unordered list following a header.
*   This is an unordered list following a header.
*   This is an unordered list following a header.

##### Header 5

1.  This is an ordered list following a header.
2.  This is an ordered list following a header.
3.  This is an ordered list following a header.

###### Header 6

| head1        | head two          | three |
|:-------------|:------------------|:------|
| ok           | good swedish fish | nice  |
| out of stock | good and plenty   | nice  |
| ok           | good `oreos`      | hmm   |
| ok           | good `zoute` drop | yumm  |

### There's a horizontal rule below this.

* * *

### Here is an unordered list:

*   Item foo
*   Item bar
*   Item baz
*   Item zip

### And an ordered list:

1.  Item one
1.  Item two
1.  Item three
1.  Item four

### And a nested list:

- level 1 item
  - level 2 item
  - level 2 item
    - level 3 item
    - level 3 item
- level 1 item
  - level 2 item
  - level 2 item
  - level 2 item
- level 1 item
  - level 2 item
  - level 2 item
- level 1 item

### Small image

![Octocat](https://assets-cdn.github.com/images/icons/emoji/octocat.png)

### Large image

![Branching](https://guides.github.com/activities/hello-world/branching.png)


### Definition lists can be used with HTML syntax.

<dl>
<dt>Name</dt>
<dd>Godzilla</dd>
<dt>Born</dt>
<dd>1952</dd>
<dt>Birthplace</dt>
<dd>Japan</dd>
<dt>Color</dt>
<dd>Green</dd>
</dl>

```
Long, single-line code blocks should not wrap. They should horizontally scroll if they are too long. This line should be long enough to demonstrate this.
```

```
The final element.
```
