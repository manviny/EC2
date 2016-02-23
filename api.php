<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, X-Requested-With, Content-Type, Origin, Accept");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 3600');


	//////////////////////////////////////////////////////////////
	// 					Get post Data
	//////////////////////////////////////////////////////////////

	$request = file_get_contents('php://input');
	$p = json_decode($request,true);


	switch ( $input->urlSegment1 ) {
		// Necesita módulo WireMailSmtp instalado
	    case "enviaemail":	enviaEmail( $p["from"], $p["to"], $p["subject"], $p["message"] ); break;
		default:
			throw new Wire404Exception();
	} 

	/**
	 * Poperties:
	 * Key, LastModified, ETag, Size, StorageClass, Owner.DisplayName, Owner.ID
	 *
	 */
	function enviaEmail( $from, $to, $subject, $message ) { 
			$mail = wireMail();
			$mail->to($to)->from($from); // all calls can be chained
			$mail->subject($subject); 
			// $mail->body($message);
			$mail->bodyHTML($message); 
			$mail->send(); 
			return json_encode( ["from" => $from, "to" => $to, "subject" => $subject, "message" => $message] );

	}	
