<?php
/**
 * 显示错误
 * @param unknown $msg
 */
function showerr($msg){
	global $Db;
	if($Db){
		$Db->close();
	}
	ajaxReturn(array('error'=>1,'info'=>$msg?:'未知错误','data'=>'','a'=>$_REQUEST['a']));
}
/**
 * 显示成功
 */
function showsuc($msg,$data=''){
	global $Db;
	if($Db){
		$Db->close();
	}
	ajaxReturn(array('error'=>0,'info'=>$msg?:'操作成功','data'=>$data,'a'=>$_REQUEST['a']));
}
/**
 * ajax返回数据,返回json数据，并终止程序.汉字不编码/u
 */
function ajaxReturn($data){
	header('Content-Type:application/json; charset=utf-8');
	echo json_encode($data);
	exit();
}

/**
 * 测试用，打印数据
 */
function printp($data,$flag = 1){
	echo "<pre>";
	print_r($data);
	echo "</pre>";
	$flag ? die() : '';
}

////////////////////////安全过滤////////////////////////////////
if($_REQUEST){
	foreach ($_REQUEST as $k=>$v){
		$_REQUEST[$k]=strip_tags($v);
		$keyword = 'select|insert|update|delete|union|into|load_file|outfile|sleep| or ';
		$arr = explode( '|', $keyword );
		$v = str_ireplace( $arr, '', $v );
		$v=str_replace("'", '‘', $v);
		$v=str_replace('"', '“', $v);
		$v=str_replace('/', '', $v);
		$_REQUEST[$k]=strip_tags($v);
	}
}
////////////////////////过滤结束////////////////////////////////

/**
 * 防止修改数据
 *
 * @param mid       加密的md5字符串 - md5($value . $tid . 'vy888hy')
 * @param tid       时间戳
 * @param value     防修改的值(如：分数，或者其它值)
 */
function verifyMd5($mid, $tid, $value)
{
    if($mid != md5($value . $tid . 'vy888hy')){
        return false;
    }

    return true;
}