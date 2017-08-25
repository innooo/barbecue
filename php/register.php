<?php
	header('content-type:text/html;charset=utf-8');
	$arr = array(array('username'=>'18893748581','password'=>'a11111111'),
				 array('username'=>'15893748582','password'=>'b22222222'),
				 array('username'=>'13893748583','password'=>'c33333333'),
				 array('username'=>'18893748584','password'=>'d44444444'),
				 array('username'=>'15893748585','password'=>'e55555555'),
				 array('username'=>'13893748586','password'=>'f66666666'),
				 array('username'=>'18893748587','password'=>'g77777777'),
				 array('username'=>'15893748588','password'=>'h88888888'),
				 array('username'=>'13893748589','password'=>'i99999999'));
	$username = $_GET['username'];
	$password = $_GET['password'];
	
	foreach($arr as $item){
//		substr($item[username],0,strlen($name));
		if($item['username'] == $username && $item['password'] == $password){
			$result = 1;
			break;
		}else{
			$result = 0;
		}
	};
	
	echo ($result);
	
?>


