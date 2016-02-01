
# Instalar yeoman

Seguir los pasos de [yeoman](http://yeoman.io/codelab/setup.html) o bien los pasos del cuadro gris a continuación

```bash
# PASO 1
$ descargar e instalar MEAN -> # https://bitnami.com/redirect/to/86975/bitnami-meanstack-3.2.1-0-windows-installer.exe

# PASO 2 Instalar yo, grunt y bower ( desde Inicio en windows ir a bitnami y abrir "Use Bitnami MEAN stack" )
$ npm install --global yo bower grunt-cli

# PASO 3 instalar el generador de angular
$ npm install --global generator-angular generator-karma

#PASO 4 comprobar que tenemos todo lo necesario instalado
$ node --version
$ npm --version       # si no funciona  -> npm install --global npm@latest
$ git --version        
$ yo --version        # si no funciona  -> npm install --global yo 
$ bower --version     # si no funciona  -> npm install --global bower 
$ grunt --version     # si no funciona  -> npm install --global grunt-cli

```
# Usar  yeoman para crear web


```bash
# 
$ mkdir micarpeta
$ cd micarpeta
$ yo
```

# Clonar repositorio
```bash
# Después de clonar el repositorio a nuestro ordenador
$ npm install
$ bower install
```

