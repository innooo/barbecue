<?php
	header('content-type:text/html;charset=utf-8');
	$phone = $_GET['phone'];
	$code  = $_GET['code'];
	$msg   = $_GET['msg'];
	$psw   = $_GET['psw'];
//	$phone = '111';
	$data  = '{'.'"phone":'.'"'.$phone.'"'.','.'"code":'.'"'.$code.'"'.','.'"msg":'.'"'.$msg.'"'.','.'"psw":'.'"'.$psw.'"'.','.'}';
//	$data = '"code":'.'"'.$phone.'"'.',';
	$infoList = Array();
	
	/*$ArrayList = ArrayListay();
Array_push($ArrayList, el1, el2 ... eln);*/
	Array_push($infoList,$data);
	$json = json_encode($infoList);
	echo ($json);
?>