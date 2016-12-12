<?php
/**
 * User: 龙洋
 * Date: 2016/5/17
 * Time: 21:00
 */

namespace Api\Controller;


class WareController extends PublicController{

    //获取商品列表
    public function getWareList(){
        $wareList       = D('GoodsList')->where(array('status'=>'online'))->field('id,image,title,price')->select();
        $this->_success('获取商品列表成功',$wareList);
    }

    //获取商品详情
    public function getWareDetail(){
        $_req           = I('post.');
        $WareLogic      = D('Ware','Logic');
        $result         = $WareLogic->getWareDetails($_req['ware_id']);
        if($result === false){
            $this->_error($WareLogic->getError(),array('errno'=>$WareLogic->getErrno()));
        }else{
            $this->_success('获取商品详情成功',array('ware_details'=>$result));
        }
    }

    //购买商品
    public function buyWare(){
        $_req           = I('post.');
        $WareLogic      = D('Ware','Logic');
        $result         = $WareLogic->buyWare($_req['ware_id'],$_req['telphone']);
        if($result === false){
            $this->_error($WareLogic->getError(),array('errno'=>$WareLogic->getErrno()));
        }else{
            $this->_success('购买商品成功');
        }
    }

    //兑换记录
    public function getBuyRecord(){
        $UserLogic      = D('User','Logic');
        $result         = $UserLogic->getBuyRecord();
        if($result === false){
            $this->_error($UserLogic->getError(),array('errno'=>$UserLogic->getErrno()));
        }else{
            $this->_success('获取购买记录成功',array('record'=>$result));
        }
    }

}