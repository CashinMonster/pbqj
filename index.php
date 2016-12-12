<?php 
session_start();
if($_SESSION['user_id']){

	$url =  "http://".$_SERVER['HTTP_HOST']."/pbqj/Public/index.html";
}else{

	$url =  "http://".$_SERVER['HTTP_HOST']."/pbqj/Public/index.php";
}
header("Location:$url");
 ?>