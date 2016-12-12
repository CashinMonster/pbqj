<?php
/**
 * 用户控制器
 * User: 龙洋
 * Date: 2016/5/10
 * Time: 20:39
 */

namespace Api\Controller;


class UserController extends PublicController{

    //修改头像
    public function changeHead(){
        $_req           = I('post.');
        $UserLogic      = D('User','Logic');
        $result         = $UserLogic->changeHead($_req['role'],$_req['motto']);
        if($result === false){
            $this->_error($UserLogic->getError(),array('errno'=>$UserLogic->getErrno()));
        }else{
            $this->_success('修改成功');
        }
    }

    //分享
    public function share(){
        $UserLogic      = D('User','Logic');
        $result         = $UserLogic->share();
        if($result === false){
            $this->_error($UserLogic->getError(),array('errno'=>$UserLogic->getErrno()));
        }else{
            $this->_success('分享成功');
        }
    }

    //获取排行榜
    public function getRinking(){
        $UserLogic      = D('User','Logic');
        $result         = $UserLogic->getRinking();
        if($result === false){
            $this->_error($UserLogic->getError(),array('errno'=>$UserLogic->getErrno()));
        }else{
            $this->_success('获取排行榜成功',$result);
        }
    }

    //用户的财富中心
    public function getTreasureCenter(){
        $UserLogic      = D('User','Logic');
        $result         = $UserLogic->getTreasureCenter();
        if($result === false){
            $this->_error($UserLogic->getError(),array('errno'=>$UserLogic->getErrno()));
        }else{
            $this->_success('获取个人财富信息成功',array('treasure_center'=>$result));
        }
    }

    //获取押注历史记录
    public function getBetRecord(){
        $UserLogic      = D('User','Logic');
        $result         = $UserLogic->getBetRecord();
        if($result === false){
            $this->_error($UserLogic->getError(),array('errno'=>$UserLogic->getErrno()));
        }else{
            $this->_success('获取押注历史记录成功',array('bet_record'=>$result));
        }
    }

    //获取PK历史记录
    public function getPkRecord(){
        $UserLogic      = D('User','Logic');
        $result         = $UserLogic->getPkRecord();
        if($result === false){
            $this->_error($UserLogic->getError(),array('errno'=>$UserLogic->getErrno()));
        }else{
            $this->_success('获取Pk历史记录成功',array('pk_record'=>$result));
        }
    }

}