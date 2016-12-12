<?php
/**
 * 游戏控制器
 * User: 龙洋
 * Date: 2016/5/9
 * Time: 17:56
 */

namespace Api\Controller;


class GameController extends PublicController{

    //用户投注
    public function bet(){
        $_req           = I('POST.');
        $GameLogic      = D('Game','Logic');
        $result         = $GameLogic->bet($_req['money'],$_req['forecast']);
        if($result === false){
            $this->_error($GameLogic->getError(),array('errno'=>$GameLogic->getErrno()));
        }else{
            $this->_success('投注成功');
        }
    }

    //检测用户是否可以进行PK
    // public function checkUserPk(){

    //     $GameLogic      = D('Game','Logic');
    //     $result         = $GameLogic->checkPkStatus();
    //     if($result === false){
    //         $errno      = $GameLogic->getErrno();
    //         $data       = $errno == 1204 ? array('errno'=>$GameLogic->getErrno(),'pk_record'=>$GameLogic->getData())
    //                                      : array('errno'=>$GameLogic->getErrno());
    //         $oneself    = D('UserInfo')->field('nickname,role')->where(array('id'=>session('user_id')))->find();
    //         $data['user_info']['oneself']       = $oneself;
    //         //$PkRecord   = D('PkRecord')->getPkingRecord(session('user_id'),'user_id,other_user');
    //         $PkRecord   = D('PkRecord')->getPkingRecord(session('user_id'),'user_id,other_user,id,in_time,status,FROM_UNIXTIME(add_time,"%Y/%m/%d") as add_time');
    //         if($PkRecord['other_user']){
    //             $other  = D('UserInfo')->field('nickname,role')->where(array('id'=>$PkRecord['other_user']))->find();
    //             $data['user_info']['other']     = $other;
    //         }else{
    //             $data['user_info']['other']     = array("nickname"=>'电脑',"role"=>"TyrantMan");
    //         }
    //         //修改
    //         $data['pkList'] = D('PkRecord')->getPkingRecordNew(session('user_id'));
    //         if($PkRecord['id'] && empty($data['pkList'])){
    //              $data['pkList'] = array();
    //              $data['pkList'][] = array_merge($PkRecord,array('nickname'=>'电脑'));
    //         }
    //         //修改
    //         $this->_error($GameLogic->getError(),$data);
    //     }else{
    //         $this->_success('可以进行PK');
    //     }
    // }
    public function checkUserPk(){

        $GameLogic      = D('Game','Logic');
        if(!empty($_SESSION['qzopenid'])){

            $result         = $GameLogic->checkPkStatus($_SESSION['qzopenid']);
            $_SESSION['qzopenid'] = '';
        }else{

            $result         = $GameLogic->checkPkStatus();
        }
        if($result === false){
            $errno      = $GameLogic->getErrno();
            $data       = $errno == 1204 ? array('errno'=>$GameLogic->getErrno(),'pk_record'=>$GameLogic->getData())
                                         : array('errno'=>$GameLogic->getErrno());
            $oneself    = D('UserInfo')->field('nickname,role')->where(array('id'=>session('user_id')))->find();
            $data['user_info']['oneself']       = $oneself;
            //$PkRecord   = D('PkRecord')->getPkingRecord(session('user_id'),'user_id,other_user');
            $PkRecord   = D('PkRecord')->getPkingRecord(session('user_id'),'user_id,other_user,id,in_time,status,FROM_UNIXTIME(add_time,"%Y/%m/%d") as add_time');
            if($PkRecord['other_user']){
                $other  = D('UserInfo')->field('nickname,role')->where(array('id'=>$PkRecord['other_user']))->find();
                $data['user_info']['other']     = $other;
            }else{
                $data['user_info']['other']     = array("nickname"=>'电脑',"role"=>"TyrantMan");
            }
            //修改
            $data['pkList'] = D('PkRecord')->getPkingRecordNew(session('user_id'));
            if($PkRecord['id'] && empty($data['pkList'])){
                 $data['pkList'] = array();
                 $data['pkList'][] = array_merge($PkRecord,array('nickname'=>'电脑'));
            }
            //修改
            $this->_error($GameLogic->getError(),$data);
        }else{
            $this->_success('可以进行PK');
        }
    }
/**
 * [checkUserPkStatus 检查用户PK状态]
 * @ckhero
 * @DateTime 2016-11-04
 * @return   [type]     [description]
 */
public function checkUserPkStatus(){

     $PkRecord   = D('PkRecord')->getPkingRecord(session('user_id'),'user_id');
     if($PkRecord['user_id']>0){
        $data = D('PkRecord')->getPkingRecordNew(session('user_id'));
        $this->_error('不可以进行pk',$data);
        
     }else{

        $this->_success('可以进行pk');
     }  
}
/**
 * [getPkdetail 根据id获取pk记录]
 * @ckhero
 * @DateTime 2016-11-03
 * @return   [type]     [description]
 */
    public function getPkdetailByid(){

        $id = I('param.id',0,'intval');
        $pkDetail = M('pk_record')->getByid($id);
        if($pkDetail['other_user']){
            $other  = D('UserInfo')->field('nickname,role')->where(array('id'=>$pkDetail['other_user']))->find();
        }else{
            $other     = array("nickname"=>'电脑',"role"=>"TyrantMan");
        }
        $oneself    = D('UserInfo')->field('nickname,role')->where(array('id'=>session('user_id')))->find();
        $oneself['money'] = $pkDetail['user_forecast'];
        $other['money'] = $pkDetail['robot_forecast'];
        $data = array(
              'self' => $oneself,
              'other' => $other,
            );
        $this->_success('信息获取成功',$data);
    }
/**
 * [getPkResult 获取PK结果]
 * @ckhero
 * @DateTime 2016-11-04
 * @return   [type]     [description]
 */
public function getPkResult(){
    $data = S('pkResult'.session('user_id'));
    S('pkResult'.session('user_id'),null);
    if(!empty($data)){

        $this->_success('pk结果',$data);
    }else{


        $this->_error('系统错误');
    }
}
/**
    * [checkUserPk 查看用户是否可以进pk ，可以pk的话pk记录返回为空。不可以的话 返回]
    * @ckhero
    * @DateTime 2016-11-03
    * @return   [type]     [description]
    */
    // public function checkUserPk(){
    //     $GameLogic      = D('Game','Logic');
    //     $result         = $GameLogic->checkPkStatus();
    //     if($result === false){
    //         $errno      = $GameLogic->getErrno();
    //         $data       = $errno == 1204 ? array('errno'=>$GameLogic->getErrno(),'pk_record'=>D('PkRecord')->getPkingRecordNew(session('user_id')))
    //                                      : array('errno'=>$GameLogic->getErrno());
    //         // $oneself    = D('UserInfo')->field('nickname,role')->where(array('id'=>session('user_id')))->find();
    //         // $data['user_info']['oneself']       = $oneself;
    //         // $PkRecord   = D('PkRecord')->getPkingRecord(session('user_id'),'user_id,other_user');

    //         // if($PkRecord['other_user']){
    //         //     $other  = D('UserInfo')->field('nickname,role')->where(array('id'=>$PkRecord['other_user']))->find();
    //         //     $data['user_info']['other']     = $other;
    //         // }else{
    //         //     $data['user_info']['other']     = array("nickname"=>'电脑',"role"=>"TyrantMan");
    //         // }
    //         $this->_error($GameLogic->getError(),$data);
    //     }else{
    //         $this->_success('可以进行PK',$GameLogic->getData());
    //     }
    // }
    //用户申请PK
    public function doUserPk(){
        ##保存用户信息
        $UserLogic      = D('User','Logic');
        $UserLogic->saveRole("MatureWoman","新手一个，请指导");
        ##PK
        $_req           = I('POST.');
        $GameLogic      = D('Game','Logic');
        $result         = $GameLogic->userPkBet($_req['user_forecast'],$_req['openid'],$_req['other_forecast']);
       // $result['id'] = $GameLogic->getId();
        if($result === false){
            $this->_error($GameLogic->getError(),array('errno'=>$GameLogic->getErrno()));
        }else{
            $this->_success('申请PK成功，正在PK中',array('forecast'=>$result,'id'=>$GameLogic->getId()));
        }
    }

    //捡金币游戏
    public function pickUpGold(){
        $_req           = I('POST.');
        $GameLogic      = D('Game','Logic');
        $result         = $GameLogic->pickUpGold($_req['money']);
        if($result === false){
            $this->_error($GameLogic->getError(),array('errno'=>$GameLogic->getErrno()));
        }else{
            $this->_success('保存金币成功');
        }
    }

    //获取奖品列表
    public function getPrizeList(){
        $GameLogic      = D('Game','Logic');
        $result         = $GameLogic->getPrizeList();
        if($result === false){
            $this->_error($GameLogic->getError(),array('errno'=>$GameLogic->getErrno()));
        }else{
            $this->_success('获取列表成功',array('prize_list'=>$result));
        }
    }

    //抽奖
    public function lottery(){
        $GameLogic      = D('Game','Logic');
        $result         = $GameLogic->lottery();
        if($result === false){
            $this->_error($GameLogic->getError(),array('errno'=>$GameLogic->getErrno()));
        }else{
            $this->_success('抽奖成功',array('prize'=>$result));
        }
    }

    //保存抽奖结果
    public function saveLotteryInfo(){
        $_req           = I('post.');
        $GameLogic      = D('Ware','Logic');
        $result         = $GameLogic->saveLotteryInfo($_req['prize_id'],$_req['telphone']);
        if($result === false){
            $this->_error($GameLogic->getError(),array('errno'=>$GameLogic->getErrno()));
        }else{
            $this->_success('保存成功',array('prize'=>$result));
        }
    }


}