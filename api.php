
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
	$param = json_decode($request,true);


	switch ( $input->urlSegment1 ) {
	    case "enviaemail":	enviaEmail( $param['user'], $param['pass']); break;

		default:
			throw new Wire404Exception();
	} 

	/**
	 * Poperties:
	 * Key, LastModified, ETag, Size, StorageClass, Owner.DisplayName, Owner.ID
	 *
	 */
	function enviaEmail( $user,  $pass) { 
		echo $user."H oi ".$pass;

		return;
	}	

