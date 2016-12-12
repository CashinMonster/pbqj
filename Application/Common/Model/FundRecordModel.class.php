<?php
/**
 * 用户资金流水表
 * User: 龙洋
 * Date: 2016/5/10
 * Time: 14:58
 */

namespace Common\Model;
use Think\Model;

class FundRecordModel extends Model{

    /**
     * 保存用户资金流水记录
     * @param $userId           用户ID
     * @param $change_money     改变的金额
     * @param $type             流水类型
     * @param $balance          改变后的余额
     * @return bool|mixed       然后操作结果
     */
    public function saveFundRecord($userId,$change_money,$type,$balance,$status){
        $data                   = array();
        $data['user_id']        = $userId;
        $data['type']           = $type;
        $data['change_money']   = $change_money;
        $data['balance']        = $balance;
        $data['status']         = $status;
        $data['add_time']       = time();
        if($this->create($data)){
            return $this->add();
        }else{
            return false;
        }

    }

}