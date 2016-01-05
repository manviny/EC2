## Dreamfactory proyecto con Angular

```bash
# ir a la página de yeoman y seguir los pasos 1-3 de codelab
$ yo angular  # crear el proyecto
$ grunt serve   # probar que le proyecto funciona, grunt serve:dist
$ bower install angular-material --save
# add angular.module('myApp', ['ngMaterial']); as injector
$ bower install angular-material-icons --save
# add angular.module('myApp', ['ngMdIcons']); as injector


```
# Install dreamfactory login/register

1. bower install manviny/mny_leaflet --save  
2. check that all js and css libraries are loaded  
3. inject 'manviny.mny-leaflet' into your app module  
4. add  mnymapa to your controller  
5. start using it  

## use example 
login.html
```html
<div class="signin-card">

  <h1 class="text-center">Dreamfactory - Addressbook 2.0</h1>
  <form ng-submit="submit()">
    <md-input-container>
      <label>Email</label>
      <input type="email" ng-model="username">
    </md-input-container>

    <md-input-container>
      <label>Password</label>
      <input type="password" ng-model="password">
    </md-input-container>

    <div class="text-center">
      <md-button type="submit" class="md-raised md-primary">Submit</md-button>
    </div>

    <div class="text-center">
      <md-button type="button" class="md-primary" ng-click="register()">Register</md-button>
    </div>

  </form>
</div>
```
register.html
```html
<div class="signin-card">

  <h1 class="text-center">Register</h1>
  <form name="registerForm" ng-submit="submit()">

    <md-input-container>
      <label>First name</label>
      <input ng-model="firstName">
    </md-input-container>
    
    <md-input-container>
      <label>Last name</label>
      <input ng-model="lastName">
    </md-input-container>

    <md-input-container>
      <label>Email</label>
      <input type="email" ng-model="username">
    </md-input-container>

    <md-input-container>
      <label>Password</label>
      <input type="password" ng-model="password">
    </md-input-container>

    <div class="text-center">
      <md-button ng-disabled="registerForm.$invalid" type="button" class="md-primary" ng-click="register()">Register</md-button>
    </div>

  </form>
</div>
```
