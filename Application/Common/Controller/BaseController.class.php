<?php

/**
 * 所有控制器的基类
 * User: 龙洋
 * Date: 2016/5/6
 * Time: 14:43
 */

namespace Common\Controller;
use Think\Controller;

class BaseController extends Controller{

    const POST_ERROR            = 1001;  ##POST请求过来的数据错误
    const NOT_LOGIN             = 1002;  ##未登录

    // 是否检测登入
    protected $checkLogin       = false;
    // 免登入操作
    protected $publicActions    = array();
    //需要登入的操作
    protected $publicLogin      = array();
    //日志文件名
    protected $fileName         = null;


    // 全局初始化
    // 登入检测逻辑
    protected function _initialize(){
        ##保存客户端请求的数据
        $this->_saveRequestLog();
        $this->fileName         = 'post'.date("Y-m-d",time()).'.log';
        $action                 = ACTION_NAME;
        if(
            $this->checkLogin                           // 当前模块是否检测登入
            && !in_array($action, $this->publicActions) // 当前操作允许不登入
            && !session('user_id')                      // 是否已经登入
        ){
            $this->_error('未登入',array('errno'=>self::NOT_LOGIN));  //跳转到登录页面
        }
    }


    //保存服务器返回给客户端的数据
    private function _saveReturnLog($data) {
        $post                   = I('post.');
        $client                 = $_SERVER['HTTP_USER_AGENT'];
        $content                = "Url：".get_client_ip().$_SERVER["REQUEST_URI"].PHP_EOL;
        $nowTime                = time()-NOW_TIME;
        $content               .= "Time-in：".date('Y-m-d H:i:s',NOW_TIME)."  ".
                                  "Time-out：".date('Y-m-d H:i:s',time())."  ".
                                  "Time-use:".$nowTime."s".PHP_EOL."Post参数：";
        if(empty($post)){
            $content           .= "无";
        }
        foreach ($post as $key => $value) {
            $content           .= " $key=$value ";
        }
        $content               .= PHP_EOL.'设备信息：'.$client;
        $content               .= PHP_EOL.'返回数据：'.PHP_EOL.var_export($data,true);
        $content               .= PHP_EOL.'===============================================================================================';
        $content               .= '==========================================================================================================';
        $content               .= PHP_EOL;
        error_log($content,3,C('LOG_PATH').$this->fileName);
    }


    //保存客户端请求的数据
    private function _saveRequestLog() {
        $post                   = I('post.');
        $client                 = $_SERVER['HTTP_USER_AGENT'];
        $content                = "Url：".get_client_ip().$_SERVER["REQUEST_URI"].PHP_EOL;
        $content               .= "Time：".date('Y-m-d H:i:s',NOW_TIME).PHP_EOL."Post参数：";
        if(empty($post)){
            $content           .= "无";
        }
        foreach ($post as $key => $value) {
            $content           .= " $key=$value ";
        }
        $content               .= PHP_EOL.'设备信息：'.$client;
        $content               .= PHP_EOL.'===============================================================================================';
        $content               .= '==========================================================================================================';
        $content               .= PHP_EOL;
        error_log($content,3,C('LOG_PATH').'request'.date("Y-m-d",time()).'.log');
    }

    /**
     * Json返回成功的结果
     * @param string $info
     * @param $data
     */
    protected function _success($info = '请求成功',$data){
        $result             = array();
        $result['info']     = $info;
        $result['status']   = 1;
        if($data){
            $result['data'] = $data;
        }
        ##保存返回数据
        $this->_saveReturnLog($result);
        $this->ajaxreturn($result,'json');
    }

    /**
     * Json返回失败的结果
     * @param string $info
     * @param $data
     */
    protected function _error($info = '请求失败',$data){
        $result             = array();
        $result['info']     = $info;
        $result['status']   = 0;
        if($data){
            $result['data'] = $data;
        }
        ##保存返回数据
        $this->_saveReturnLog($result);
        $this->ajaxreturn($result,'json');
    }

}