<?php
/**
 * User: 龙洋
 * Date: 2016/5/11
 * Time: 19:35
 */

namespace Admin\Controller;
use Common\Controller\BaseController;

class PublicController extends BaseController{

    //初始化
    public function _initialize(){
        if(ACTION_NAME != 'login' && !session('admin_user')){
            echo_script("window.location.href='".U('/Admin/User/login')."'");
        }
    }
}