<?php
//分享参数
error_reporting(E_ERROR);
try{
	$config=require './php/config.php';
	require './php/jssdk.php';
	require './php/function.php';
	include './php/database.class.php';
	global $Db;
	$Db	=	new database($config);
	$jssdk = new JSSDK($config['appid'], $config['secret'],$Db);
	$url=$_SERVER['HTTP_REFERER'];
	$type=$_REQUEST['type'];
	$signPackage = $jssdk->GetSignPackage($url);
	session_start();
    $signPackage['openid'] = $_SESSION['openid'];
    $signPackage['nickname'] = $_SESSION['userinfo']['nickname'];
	if($signPackage && $type=='js'){
		echo "var wx_config=".json_encode($signPackage);
		exit();
	}
	if($signPackage){
		showsuc('获取成功',$signPackage);
	}else{
		throw new Exception('获取失败');
	}
}catch (Exception $e){
	showerr($e->getMessage());
}
//分享参数end