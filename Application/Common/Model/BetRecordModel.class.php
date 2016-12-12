<?php
/**
 * 用户押注记录表
 * User: 龙洋
 * Date: 2016/5/9
 * Time: 17:33
 */

namespace Common\Model;
use Think\Model;

class BetRecordModel extends Model{

    /**
     * 保存用户押注记录
     * @param $userId       用户ID
     * @param $money        押注金额
     * @param $forecast     预测指数
     * @return bool|mixed   成功返回当前记录的ID，失败返回false
     */
    public function saveBetRecord($userId,$money,$forecast){
        $data               = array();
        $data['user_id']    = $userId;
        $data['money']      = $money;
        $data['status']     = 'wait';
        $data['forecast']   = $forecast;
        $data['in_time']    = date('YmdH');
        $data['add_time']   = time();
        $data['success']    = 0;
        if($this->create($data)){
           return $this->add();
        }else{
            return false;
        }
    }

    /**
     * 根据用户ID和押注状态获取用户押注记录
     * @param $userId       用户ID
     * @param $status       押注状态
     * @param $field        需要返回的字段集
     * @return mixed        返回查询出的字段结果集
     */
    public function getBetRecord($userId,$status,$field){
        $map                = array();
        $map['user_id']     = $userId;
        $map['status']      = $status;
        return $this->where($map)->field($field)->find();
    }

    /**
     * 获取历史押注记录
     * @param $userId       用户ID
     * @param $field        需要返回的字段及
     * @return mixed        返回查询出的字段结果集
     */
    public function getHistoryBetRecord($userId,$field){
        $map                = array();
        $map['user_id']     = $userId;
        return $this->where($map)->field($field)->order('add_time desc')->select();
    }

    /**
     * 根据ID更新押注状态
     * @param $id           需要更新记录的ID
     * @param $status       需要更新的状态
     * @param $success      连续成功的次数
     * @return bool         返回操作结果
     */
    public function updateStatus($id,$status,$success){
        $map                = array();
        $map['id']          = $id;
        $data               = array();
        $data['status']     = $status;
        $data['success']    = $success;
        return $this->where($map)->save($data);
    }

    /**
     *统计赢得次数
     * @param $userId
     * @return mixed
     */
    public function getWinTime($userId){
        $map                = array();
        $map['user_id']     = $userId;
        $map['status']      = 'win';
        return $this->where($map)->count();
    }

    /**
     * 统计总的次数
     * @param $userId
     * @return mixed
     */
    public function getTotalTime($userId){
        $map                = array();
        $map['user_id']     = $userId;
        return $this->where($map)->count();
    }

}