<?php

/**
 * API接口公用控制器
 * User: 龙洋
 * Date: 2016/5/6
 * Time: 14:31
 */

namespace Api\Controller;
use Common\Controller\BaseController;

class PublicController extends BaseController{

    //初始化
    public function _initialize(){
//        session('user_id',128);
        if(!session('openid') && !session('user_id')){
            header("Location:".U('WeiXin/Index'));
            die();
        }
        if(!session('user_id')){
            $userId     = D('UserInfo')->getFieldByOpenid(session('openid'),'id');
            session('user_id',$userId);
        }
        parent::_initialize();
    }

}