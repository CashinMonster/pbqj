<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/5/6
 * Time: 13:50
 */

/**
 * 输出函数
 * @param $data                 输出数据
 * @param int $flag             是否die程序
 */
function printp($data,$flag = 1){
    echo "<pre>";
    print_r($data);
    echo "</pre>";
    $flag ? die() : "";
}


/**
 * debug.log日志记录
 * @param $content              输出的内容
 * @param bool|false $filename  保存的文件名称
 * @param bool|false $time      是否已时间命名
 */
function debug_log($content, $filename = false, $time = false) {
    $now = date('Y-m-d H:i:s');
    if (!is_dir(C('LOG_PATH'))) {
        mkdir(C('LOG_PATH'), 0755, true);
    }
    $path = $filename ? $time ? $filename . date('y_m_d') . '.log' : $filename : $path = 'debug_' . date('y_m_d') . '.log';
    error_log("[{$now}] " . var_export($content, 1) . "\r\n\r\n", 3, C('LOG_PATH') . '/' . $path);
}

/**
 * 输出script代码
 * @param $content
 */
function echo_script($content){
    echo "<script>$content</script>";
}

/*
 * 短信发送内容
 * @param $tel，手机号码
 * @param $msg，短信内容
 * */

function send_msg($tel, $msg) {
   $username = 'cs_zwgg';
      $password = '123zhang';
      $send_msg = urlencode(iconv('UTF-8', 'GB2312', '【跑步钱进】' . $msg));
    $url = 'http://58.83.147.92:8080/qxt/smssenderv2?user=' . $username . '&password=' . md5($password) . '&tele=' . $tel . '&msg=' . $send_msg;
    $result = send_curl($url);
    return $result;
}


function send_curl($url, $data = '', $method = 'GET', $charset = 'utf-8') {
    //初始化并执行curl请求
    $curl = curl_init();
    curl_setopt($curl, CURLOP_TIMEOUT, 15);
    //设置抓取的url
    curl_setopt($curl, CURLOPT_URL, $url);
    //设置头文件的信息作为数据流输出
    curl_setopt($curl, CURLOPT_HEADER, 0);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
    //设置获取的信息以文件流的形式返回，而不是直接输出。
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    if (strtoupper($method)=='POST') {
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        if (is_string($data)) { //发送JSON数据
            $http_header = array(
                'Content-Type: application/json; charset=' . $charset,
                'Content-Length: ' . strlen($data),
            );
            curl_setopt($curl, CURLOPT_HTTPHEADER, $http_header);
        }
    }
    $result = curl_exec($curl);
    $error = curl_error($curl);
    curl_close($curl);
    //发生错误，抛出异常
    //if ($error) throw new \Exception('请求发生错误：' . $error);
    //if($error){readdir(C('WEB_URL').C('ERROR_PAGE'));}
    return $result;
}

