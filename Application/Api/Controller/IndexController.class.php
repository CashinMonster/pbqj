<?php

/**
 * API接口首页控制器
 * User: 龙洋
 * Date: 2016/5/6
 * Time: 14:28
 */

namespace Api\Controller;

class IndexController extends PublicController{


    //游戏首页数据
    public function index(){

        //S('pkResult'.session('user_id'),null);
        ##获取当前时间的股票信息
        $res = M('user_info')->where(array('openid'=>$_SESSION['openid']))->find();
        if(!$res && !empty($_SESSION['openid'])) $this->saveRole();
        $StockLogic     = D('Stock','Logic');
        $todayTrend     = $StockLogic->getTodayTrend();
        if($todayTrend === false){
            $this->_error($StockLogic->getError(),array('errno'=>$StockLogic->getErrno()));
        }
        ##获取个人信息
        $userInfo       = D('User','Logic')->getUserInfo();
        ##获取用户的押注结果
        $openPrizeResult= D('Game','Logic')->openPrize();
        $data           = array('stock_trend'=>$todayTrend,'user_info'=>$userInfo);
        if($openPrizeResult){
            $data['open_prize'] = $openPrizeResult;
        }

        $PkRecord   = D('PkRecord')->getPkingRecord(session('user_id'),'user_id');
        if($PkRecord['user_id']>0) $data['pkStatus'] = 1;
        $data['test']  = S('pkResult'.session('user_id'));
        if ($_SESSION['noSign'] ==1 ) {
            $data['user_info']['sign_status']=2;
             $_SESSION['noSign'] = 0;
         }
        $this->_success('获取首页信息成功',$data);
        //redirect('http://uat.zwmedia.com.cn/pbqj/Public/index.html');
    }

    //检测玩家是否拥有过角色信息
    public function checkRole(){
        $UserLogic      = D('User','Logic');
        $result         = $UserLogic->checkRole();
        if($result === false){
            $this->_error($UserLogic->getError(),array('errno'=>$UserLogic->getErrno()));
        }else{
            $this->_success('该玩家已经拥有过角色',array('user_info'=>$result));
        }
    }

    //保存角色信息
    public function saveRole(){
        $_req           = I('post.');
        $UserLogic      = D('User','Logic');
        $_req['role']   = $_req['role']?$_req['role']:'MatureWoman';
        $_req['motto']  = $_req['motto']?$_req['motto']:'我是一个有钱人';
        ##保存用户信息
        $result         = $UserLogic->saveRole($_req['role'],$_req['motto']);
        if($result === false){
            $this->_error($UserLogic->getError(),array('errno'=>$UserLogic->getErrno()));
        }
        ##获取首页的相关信息
        $StockLogic     = D('Stock','Logic');
        $todayTrend     = $StockLogic->getTodayTrend();
        if($todayTrend === false){
            $this->_error($StockLogic->getError(),array('errno'=>$StockLogic->getErrno()));
        }
        $userInfo       = D('User','Logic')->getUserInfo();
        $this->_success('保存成功',array('stock_trend'=>$todayTrend,'user_info'=>$userInfo));
    }


}
















