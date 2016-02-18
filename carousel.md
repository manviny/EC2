```json
{
    "imagen_encima": {
        "id": 98,
        "type": "FieldtypeImage",
        "flags": 0,
        "name": "imagen_encima",
        "label": "Imagen que se superpone",
        "description": "400x600 debe ser png con fondo transparente",
        "extensions": "png",
        "maxFiles": 1,
        "outputFormat": 1,
        "defaultValuePage": 0,
        "inputfieldClass": "InputfieldImage",
        "descriptionRows": 1,
        "defaultGrid": 1,
        "maxReject": "",
        "fileSchema": 2,
        "collapsed": 0,
        "icon": "camera",
        "outputString": "",
        "textformatters": "",
        "entityEncode": "",
        "useTags": "",
        "showIf": "",
        "columnWidth": 100,
        "required": "",
        "requiredIf": "",
        "unzip": "",
        "overwrite": "",
        "adminThumbs": "",
        "maxWidth": "",
        "maxHeight": "",
        "minWidth": "",
        "minHeight": ""
    },
    "imagen_fondo": {
        "id": 97,
        "type": "FieldtypeImage",
        "flags": 0,
        "name": "imagen_fondo",
        "label": "Imagen carousel de fondo",
        "extensions": "gif jpg jpeg png",
        "adminThumbs": 1,
        "inputfieldClass": "InputfieldImage",
        "maxFiles": 1,
        "descriptionRows": 1,
        "fileSchema": 2,
        "textformatters": [
            "TextformatterEntities"
        ],
        "outputFormat": 1,
        "defaultValuePage": 0,
        "defaultGrid": 1,
        "icon": "camera",
        "description": "1400x730 preferiblemente",
        "collapsed": 0,
        "maxReject": "",
        "outputString": "",
        "entityEncode": "",
        "useTags": "",
        "showIf": "",
        "columnWidth": 100,
        "required": "",
        "requiredIf": "",
        "unzip": "",
        "overwrite": "",
        "maxWidth": "",
        "maxHeight": "",
        "minWidth": "",
        "minHeight": ""
    },
    "slogan_principal": {
        "id": 99,
        "type": "FieldtypeText",
        "flags": 0,
        "name": "slogan_principal",
        "label": "Slogan principal",
        "collapsed": 0,
        "size": 0,
        "maxlength": 2048,
        "textformatters": "",
        "showIf": "",
        "columnWidth": 100,
        "required": "",
        "requiredIf": "",
        "stripTags": "",
        "placeholder": "",
        "pattern": ""
    },
    "slogan_secundario": {
        "id": 100,
        "type": "FieldtypeText",
        "flags": 0,
        "name": "slogan_secundario",
        "label": "Slogan secundario",
        "collapsed": 0,
        "size": 0,
        "maxlength": 2048,
        "textformatters": "",
        "showIf": "",
        "columnWidth": 100,
        "required": "",
        "requiredIf": "",
        "stripTags": "",
        "placeholder": "",
        "pattern": ""
    }
}
```
```html

<script>

    app.controller('HomeCtrl', function ($scope) {
        alert("hh")
        $scope.page = <?php echo $pages->find("template=slide")->toJSON(); ?>;
		$scope.menu = <?php echo $menu->find("parent=1")->toJSON(); ?>;
        console.log($scope.page);
		console.log($scope.menu);
    });

</script>

<div ng-controller="HomeCtrl">
    <section id="main-slider" class="no-margin">
        <div class="carousel slide">
            <ol class="carousel-indicators">
                <li data-target="#main-slider" data-slide-to="0" class="active"></li>
                <li data-target="#main-slider" data-slide-to="1"></li>
                <li data-target="#main-slider" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">

                <div class="item" ng-class="{active:!$index}" ng-repeat="slide in page"style="background-image: url({{slide.imagen_fondo[0].url}})">
                    <div class="container">
                        <div class="row slide-margin">
                            <div class="col-sm-6">
                                <div class="carousel-content">
                                    <h1 class="animation animated-item-1">{{slide.slogan_principal}}</h1>
                                    <h2 class="animation animated-item-2">{{slide.slogan_secundario}}</h2>
                                    <a class="btn-slide animation animated-item-3" href="#">Leer más</a>
                                </div>
                            </div>

                            <div class="col-sm-6 hidden-xs animation animated-item-4">
                                <div class="slider-img">
                                    <img src="{{slide.imagen_encima[0].url}}" class="img-responsive">
                                </div>
                            </div>

                        </div>
                    </div>
                </div><!--/.item-->

            </div><!--/.carousel-inner-->
        </div><!--/.carousel-->
        <a class="prev hidden-xs" href="#main-slider" data-slide="prev">
            <i class="fa fa-chevron-left"></i>
        </a>
        <a class="next hidden-xs" href="#main-slider" data-slide="next">
            <i class="fa fa-chevron-right"></i>
        </a>
    </section><!--/#main-slider-->	
</div>
```
