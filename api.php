<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, X-Requested-With, Content-Type, Origin, Accept");
header('Access-Control-Allow-Credentials: true');
// header('Access-Control-Max-Age: 3600');

	// Necesita módulo WireMailSmtp instalado
	// Necesita módulo Json2Pages instalado

	//////////////////////////////////////////////////////////////
	// 					Get post Data
	//////////////////////////////////////////////////////////////

	$request = file_get_contents('php://input');
	$p = json_decode($request,true);


	switch ( $input->urlSegment1 ) {
	/**
		ENVIA EMAIL
      	$http({
        	method: 'POST',
        	url: 'api/enviaemail/',
        	data: {	'from': 'manol@indinet.es', 
        			'to': $scope.email, 
        			'subject': $scope.nombre, 
        			'message': $scope.message},
      	})
      	.success(function (result) {  console.log("Si", result); })
      	.error(function(data){ console.log("error",data) });   
     */
	case "sendEmail":	sendEmail( $p["from"], $p["to"], $p["subject"], $p["message"] ); break;
	/**
	  	Crea un nuevo usuario  en Acceso > usuarios con role de invitado (guest)
	  	El formulario debe enviar el nombre del usu

      	$http({
        	method: 'POST',
        	url: 'api/enviaemail/',
        	data: {	'NAME': 'usuario', 
        			'email': $scope.email, 
        			'email2': '', 
        			'password': $scope.password, 
        			'password2': $scope.password2 },
      	})
      	.success(function (result) {  console.log("Si", result); })
      	.error(function(data){ console.log("error",data) }); 	 
	 */	       
	case "registerUser": registerUser($d["name"], $d["email"], $d["email2"], $d["password"], $d["password2"]);break;		    
		default:
			throw new Wire404Exception();
	} 


		  //   // $http.post('http://ip/web-service/', {action: 'getPage', pageId: 1046 })
		  //   case "sendEmail":									
				// $event->return = $this->sendEmail( $d["from"], $d["to"], $d["subject"], $d["message"] );
		  //       break;	

		  //   // $http.post('http://ip/web-service/', {action: 'getPage', pageId: 1046 })
		  //   case "searchPages":									
				// $event->return = $this->searchPages( $d["selector"] );
		  //       break;		

		  //   // $http.post('http://ip/web-service/', {action: 'getPage', pageId: 1046 })
		  //   case "getFieldsets":									
				// $event->return = $this->getFieldsets($d["page"]);
		  //       break;	

		  //   // $http.post('http://ip/web-service/', {action: 'getPage', pageId: 1046 })
		  //   case "getFieldsLabel":									
				// $event->return = $this->getFieldsLabel($d["page"]);
		  //       break;	

		  //   // $http.post('http://ip/web-service/', {action: 'getPage', pageId: 1046 })
		  //   case "S3":									
				// $event->return = $this->S3( $d["service"], $d["bucket"] );
		  //       break;	

		  //   // $http.post('http://ip/web-service/', {action: 'getPage', pageId: 1046 })
		  //   case "prueba":									
				// $event->return = $this->prueba($d["page"], $d["subject"], $d["message"]);
		  //       break;	




	/**
	 * 
	 */
	function sendEmail( $from, $to, $subject, $message ) { 
			$mail = wireMail();
			$mail->to($to)->from($from); // all calls can be chained
			$mail->subject($subject); 
			// $mail->body($message);
			$mail->bodyHTML($message); 
			$mail->send(); 
			return json_encode( ["from" => $from, "to" => $to, "subject" => $subject, "message" => $message] );

	}	

	/**
	 * 
	 */
	function registerUser( $name, $email, $email2, $password, $password2 ){

		$message = "";
		/**
		 * Check for spam and last 2 lines to the code
		 */
		
		// SPAM
		if (trim($email2) != '')  return json_encode( [ "message" => "spam"] );
		
		if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    		return json_encode( [ "message" => "El email no es valido"] );
		}

		// el email existe, no se puede volver a registrar
		if(wire('users')->get("email=$email")->id ) { 
			return json_encode( [ "message" => "El usuario ya existe"] );
		}	
		// el nombre de usuario esta ocupado, su usuario será el email sanitized
		if(wire('users')->get("name=$name")->id) { 
			$name = wire('sanitizer')->email($email);
		}


		// no tiene pass -> genera uno al azar
		if($password=="") {
			$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-=+;:,.?";
    		$password = substr( str_shuffle( $chars ), 0, 8 );
    		$password2 = $password;
		}
		// las constraseña no coinciden
		if($password!=$password2 )
			return json_encode( [ "message" => "Las contrasenas no coinciden"] );
		
		$pass = $password;
		$u = new User();

		$u->name= wire('sanitizer')->username($name); 
		$u->email = wire('sanitizer')->email($email);
		$u->pass = $pass;
		$u->addRole("guest");
		// $u->addRole("registrado");
		$u->language = wire('languages')->get("default");
		$u->save();

		return json_encode( ["name" => $u->name, "password" => $u->pass, "message" => $message,] );

	}	
