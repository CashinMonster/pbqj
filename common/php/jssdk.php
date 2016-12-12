<?php
class JSSDK {
  private $appId;
  private $appSecret;

  public function __construct($appId, $appSecret,$db='') {
    $this->appId = $appId;
    $this->appSecret = $appSecret;
    if($db){
    	$this->db=$db;
    }
  }

  public function getSignPackage($url='') {
    $jsapiTicket = $this->getJsApiTicket();

    // 注意 URL 一定要动态获取，不能 hardcode.
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";   
    $_SERVER[SCRIPT_NAME]=str_replace('weixin.php', 'index.html', $_SERVER[SCRIPT_NAME]);
    if(empty($url)){
    	$url = "$protocol$_SERVER[HTTP_HOST]$_SERVER[SCRIPT_NAME]";
    }

    $timestamp = time();
    $nonceStr = $this->createNonceStr();

    // 这里参数的顺序要按照 key 值 ASCII 码升序排序
    $string = "jsapi_ticket=$jsapiTicket&noncestr=$nonceStr&timestamp=$timestamp&url=$url";

    $signature = sha1($string);

    $signPackage = array(
      "appId"     => $this->appId,
      "nonceStr"  => $nonceStr,
      "timestamp" => $timestamp,
      "url"       => $url,
      "signature" => $signature,
      "rawString" => $string
    );
    return $signPackage; 
  }

  private function createNonceStr($length = 16) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $str = "";
    for ($i = 0; $i < $length; $i++) {
      $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
    }
    return $str;
  }

  private function getJsApiTicket() {    
    if($_SESSION['WX_ACCESS_TOKEN']&&$_SESSION['WX_JSAPI_TICKET']&&($_SESSION['WX_CREATE_TIME']+$_SESSION['WX_EXPIRES_IN']>time())){
      //存在值，直接返回
    }else{
      $info                       = $this->db->getOne("select * from access where appid='{$this->appId}'");
      if($info['create_time']+$info['expires_in']>time()){
      }else{
        if(empty($ticket)){
          $rs1=file_get_contents('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='.$this->appId.'&secret='.$this->appSecret);
          $rs1=json_decode($rs1,true);
          if($rs1['access_token']){
            $rs1=file_get_contents('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='.$rs1['access_token'].'&type=jsapi');
            $info                       = json_decode($rs1,true);
          }
        }
      }
    }
    $ticket                       = $info['ticket'];
    $_SESSION['WX_ACCESS_TOKEN']  = $info['access_token'];
    $_SESSION['WX_CREATE_TIME']   = $info['create_time'];
    $_SESSION['WX_EXPIRES_IN']    = $info['expires_in'];
    $_SESSION['WX_JSAPI_TICKET']  = $info['ticket'];
    return $ticket;
  }

  private function getAccessToken() {   
  	$access_token=$_SESSION['WX_ACCESS_TOKEN'];
  	if(empty($access_token)){
  		$info=$this->db->getOne("select * from access where appid='{$this->appId}'");
  		$access_token=$info['access_token'];
  		$_SESSION['WX_JSAPI_TICKET']=$info['ticket'];
  		$_SESSION['WX_ACCESS_TOKEN']=$info['access_token'];
  	}
    return $access_token;
  }

  private function httpGet($url) {
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_TIMEOUT, 500);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($curl, CURLOPT_URL, $url);

    $res = curl_exec($curl);
    curl_close($curl);

    return $res;
  }
}

