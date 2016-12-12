<?php

/**
 * User: 龙洋
 * Date: 2016/5/14
 * Time: 14:41
 */

namespace Adminsite\Logic;

class UserLogic extends PublicLogic{

    /**
     * 根据用户获取用户信息
     * @param $username
     * @return mixed
     */
    public function getUserInfo($username){
        $userInfo               = D('UserInfo')->where(array('nickname'=>$username))->find();
        $userId                 = $userInfo['id'];
        if(empty($userId)){
            $this->error        = '用户昵称不存在';
            return false;
        }
        ##统计押注情况
        $betWinTime             = D('BetRecord')->getWinTime($userId);
        $betTotalTime           = D('BetRecord')->getTotalTime($userId);
        ##统计PK情况
        $pkWinTime              = D('PkRecord')->getWinTime($userId);
        $pkTotalTime            = D('PkRecord')->getTotalTime($userId);
        ##组装返回数据
        $data                   = $userInfo;
        $data['bet_win_time']   = $betWinTime;
        $data['bet_win_rate']   = $betWinTime*$betTotalTime ? round(($betWinTime/$betTotalTime)*100).'%' : 0 ;
        $data['pk_win_rate']    = $pkWinTime;
        $data['pk_total_rate']  = $pkWinTime*$pkTotalTime ? round(($pkWinTime/$pkTotalTime)*100).'%' : 0 ;
        return $data;
    }

    /**
     * 获取用户列表
     * @return mixed
     */
    public function getUserList(){
        $userList               = D('UserInfo')->select();
        $data                   = array();
        foreach($userList as $key => $value){
            ##统计押注情况
            $betWinTime             = D('BetRecord')->getWinTime($value['id']);
            $betTotalTime           = D('BetRecord')->getTotalTime($value['id']);
            ##统计PK情况
            $pkWinTime              = D('PkRecord')->getWinTime($value['id']);
            $pkTotalTime            = D('PkRecord')->getTotalTime($value['id']);
            ##组装返回数据
            $data[$key]                     = $value;
            $data[$key]['bet_win_time']     = $betWinTime;
            $data[$key]['bet_win_rate']     = $betWinTime*$betTotalTime ? round(($betWinTime/$betTotalTime)*100).'%' : 0 ;
            $data[$key]['pk_win_rate']      = $pkWinTime;
            $data[$key]['pk_total_rate']    = $pkWinTime*$pkTotalTime ? round(($pkWinTime/$pkTotalTime)*100).'%' : 0 ;
        }
        return $data;
    }

}