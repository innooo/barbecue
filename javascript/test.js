login.html

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"

"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>

<meta http-equiv="Content-Type" content="text/html; charset=gbk" />

<title>用户登录</title>

<style type="text/css">

html{font-size:12px;}

fieldset{width:520px; margin: 0 auto;}

legend{font-weight:bold; font-size:14px;}

label{float:left; width:70px; margin-left:10px;}

.left{margin-left:80px;}

.input{width:150px;}

span{color: #666666;}

</style>

<script language=JavaScript>

<!--

function InputCheck(LoginForm)

{

if (LoginForm.username.value == "")

{

alert("请输入用户名!");

LoginForm.username.focus();

return (false);

}

if (LoginForm.password.value == "")

{

alert("请输入密码!");

LoginForm.password.focus();

return (false);

}

}

//-->

</script>

</head>

<body>

<div>

<fieldset>

<legend>用户登录</legend>

<form name="LoginForm" method="post" action="login.php" onSubmit="return InputCheck(this)">

<p>

<label for="username" class="label">用户名:</label>

<input id="username" name="username" type="text" class="input" />

<p/>

<p>

<label for="password" class="label">密 码:</label>

<input id="password" name="password" type="password" class="input" />

<p/>

<p>

<input type="submit" name="submit" value=" 确 定 " class="left" />

</p>

</form>

</fieldset>

</div>

</body>

</html>

conn.php

<?php

/*****************************

*数据库连接

*****************************/

$conn = @mysql_connect("localhost","root","root123");

if (!$conn){

die("连接数据库失败：" . mysql_error());

}

mysql_select_db("test", $conn);

//字符转换，读库

mysql_query("set character set 'gbk'");

//写库

mysql_query("set names 'gbk'");

?>

reg.php

<?php

if(!isset($_POST['submit'])){

exit('非法访问!');

}

$username = $_POST['username'];

$password = $_POST['password'];

$email = $_POST['email'];

//注册信息判断

if(!preg_match('/^[\w\x80-\xff]{3,15}$/', $username)){

exit('错误：用户名不符合规定。<a href="javascript:history.back(-1);">返回</a>');

}

if(strlen($password) < 6){

exit('错误：密码长度不符合规定。<a href="javascript:history.back(-1);">返回</a>');

}

if(!preg_match('/^w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*$/', $email)){

exit('错误：电子邮箱格式错误。<a href="javascript:history.back(-1);">返回</a>');

}

//包含数据库连接文件

include('conn.php');

//检测用户名是否已经存在

$check_query = mysql_query("select uid from user where username='$username' limit 1");

if(mysql_fetch_array($check_query)){

echo '错误：用户名 ',$username,' 已存在。<a href="javascript:history.back(-1);">返回</a>';

exit;

}

//写入数据

$password = MD5($password);

$regdate = time();

$sql = "INSERT INTO us

er(username,password,email,regdate)VALUES('$username','$password','$email',

$regdate)";

if(mysql_query($sql,$conn)){

exit('用户注册成功！点击此处 <a href="login.html">登录</a>');

} else {

echo '抱歉！添加数据失败：',mysql_error(),'<br />';

echo '点击此处 <a href="javascript:history.back(-1);">返回</a> 重试';

}

?>

login.html

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"

"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>

<meta http-equiv="Content-Type" content="text/html; charset=gbk" />

<title>用户登录</title>

<style type="text/css">

html{font-size:12px;}

fieldset{width:300px; margin: 0 auto;}

legend{font-weight:bold; font-size:14px;}

.label{float:left; width:70px; margin-left:10px;}

.left{margin-left:80px;}

.input{width:150px;}

span{color: #666666;}

</style>

<script language=JavaScript>

<!--

function InputCheck(LoginForm)

{

if (LoginForm.username.value == "")

{

alert("请输入用户名!");

LoginForm.username.focus();

return (false);

}

if (LoginForm.password.value == "")

{

alert("请输入密码!");

LoginForm.password.focus();

return (false);

}

}

//-->

</script>

</head>

<body>

<div>

<fieldset>

<legend>用户登录</legend>

<form name="LoginForm" method="post" action="login.php" onSubmit="return InputCheck(this)">

<p>

<label for="username" class="label">用户名:</label>

<input id="username" name="username" type="text" class="input" />

<p/>

<p>

<label for="password" class="label">密 码:</label>

<input id="password" name="password" type="password" class="input" />

<p/>

<p>

<input type="submit" name="submit" value=" 确 定 " class="left" />

</p>

</form>

</fieldset>

</div>

</body>

</html>

login.php

<?php

session_start();

//注销登录

if($_GET['action'] == "logout"){

unset($_SESSION['userid']);

unset($_SESSION['username']);

echo '注销登录成功！点击此处 <a href="login.html">登录</a>';

exit;

}

//登录

if(!isset($_POST['submit'])){

exit('非法访问!');

}

$username = htmlspecialchars($_POST['username']);

$password = MD5($_POST['password']);

//包含数据库连接文件

include('conn.php');

//检测用户名及密码是否正确

$check_query = mysql_query("select uid from user where username='$username' and password='$password'

limit 1");

if($result = mysql_fetch_array($check_query)){

//登录成功

$_SESSION['username'] = $username;

$_SESSION['userid'] = $result['uid'];

echo $username,' 欢迎你！进入 <a href="my.php">用户中心</a><br />';

echo '点击此处 <a href="login.php?action=logout">注销</a> 登录！<br />';

exit;

} else {

exit('登录失败！点击此处 <a href="javascript:history.back(-1);">返回</a> 重试');

}

?>

my.php

<?php

session_start();

//检测是否登

录，若没登录则转向登录界面

if(!isset($_SESSION['userid'])){

header("Location:login.html");

exit();

}

//包含数据库连接文件

include('conn.php');

$userid = $_SESSION['userid'];

$username = $_SESSION['username'];

$user_query = mysql_query("select * from user where uid=$userid limit 1");

$row = mysql_fetch_array($user_query);

echo '用户信息：<br />';

echo '用户ID：',$userid,'<br />';

echo '用户名：',$username,'<br />';

echo '邮箱：',$row['email'],'<br />';

echo '注册日期：',date("Y-m-d", $row['regdate']),'<br />';

echo '<a href="login.php?action=logout">注销</a> 登录<br />';

?>