##Navegación
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <title>Navegación</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
   <style type="text/css">
   		html, body{
   			height: 1500px;
   		}
   </style>


</head>
<body>
<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
	<div class="navbar-header">
		<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
			<span class="sr-only"></span>
			<span class="icon-bar"></span>	
			<span class="icon-bar"></span>	
			<span class="icon-bar"></span>	
		</button>
		<a class="navbar-brand" href="index.html">mi logo</a>
	</div>
	<div class="navbar-collapse collapse">
		<ul class="nav navbar-nav">
			<li class="active"><a href="index.html">Inicio</a></li>
			<li><a href="blog.html">Blog</a></li>
			<li><a href="clientes.html">Clientes</a></li>
			<li><a href="contacto.html">Contacto</a></li>
			<li class="dropdown">
				<a href="#" class="dropdown-toggle" data-toggle="dropdown">Redes Sociales<b class="caret"></b></a>
				<ul class="dropdown-menu">
					<li><a href="facebook.html">Facebook</a></li>	
					<li><a href="google.html">Google +</a></li>	
					<li><a href="twitter.html">Twitter</a></li>	
				</ul>
			</li>
		</ul>
	</div>
</nav>

	<div class="container-fluid">
	  <h1>My First Bootstrap Page</h1>
	  <p>This is some text.</p> 
	</div>

</body>
</html>
```
