<?php

/**
 * 游戏用户记录表
 * User: 龙洋
 * Date: 2016/5/6
 * Time: 16:30
 */

namespace Common\Model;
use Think\Model;

class UserInfoModel extends Model{


    /**
     * 保存用户信息
     * @param $openid       用户微信ID
     * @param $nickname     用户昵称
     * @param $role         用户角色
     * @param $motto        用户格言
     * @param $headimgurl   用户头像
     * @return bool|mixed   成功返回当前记录ID，失败返回false
     */
    public function saveUserInfo($openid,$nickname,$role,$motto,$headimgurl){
        $data               = array();
        $data['openid']     = $openid;
        $data['nickname']   = $nickname;
        $data['role']       = $role;
        $data['motto']      = $motto;
        $data['balance']    = 15000;
        $data['headimgurl'] = $headimgurl;
        $data['sign_in']    = 0;
        $data['add_time']   = time();
        if($this->create($data)){
            return $this->add();
        }else{
            return false;
        }
    }


    /**
     * 获取用户的余额排名【金额倒叙，时间升序】
     * @return int|string   返回用户当前排名
     */
    public function getMyBalanceRanking(){
        $userId             = session('user_id');
        $ranking            = $this->field('id,balance')->order('balance desc,add_time asc')->select();
        foreach($ranking as $key => $value){
            if($value['id'] == $userId){
                return $key+1;
            }
        }
    }

    /**
     * 根据用户ID获取用户信息
     * @param $userId       用户ID
     * @param $field        需要查找的字段
     * @return mixed        返回查找的字段结果集
     */
    public function getUserInfo($userId,$field){
        $map                = array();
        $map['id']          = $userId;
        return $this->where($map)->field($field)->find();
    }

    /**
     * 更新用户余额
     * @param $userId       用户ID
     * @param $changeMoney  需要修改的金额
     * @return bool         返回更新结果
     */
    public function updateBalance($userId,$changeMoney){
        $map                = array();
        $map['id']          = $userId;
        if($this->where($map)->setInc('balance',$changeMoney)){
            return $this->getFieldById($userId,'balance');
        }else{
            return false;
        }
    }

    /**
     * 获取用户排行榜
     * @return mixed
     */
    public function getRinking(){
        $map                = array();
        $map['balance']     = array('gt',0);
        return $this->where($map)->field('nickname,motto,balance,headimgurl')->order('balance desc')->limit(20)->select();
    }

    /**
     * 获取个人排行榜
     * @param $userId       用户ID
     * @return mixed        返回结果集
     */
    public function getOneselfRinking($userId){
        $sql                = "select count(1) as rank from pbqj_user_info where balance >
                              (select balance from pbqj_user_info where id = $userId)";
        return $this->query($sql);
    }

    /**
     * 每日签到
     * @param $userId
     * @return bool
     */
    public function signIn($userId){
        $map                = array();
        $map['id']          = $userId;
        $data               = array();
        $data['sign_in']    = array('exp','sign_in+1');
        $data['sign_time']  = date('Y-m-d');
        return $this->where($map)->save($data);
    }


}