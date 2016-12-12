<?php
/**
 * 股票记录表
 * User: 龙洋
 * Date: 2016/5/10
 * Time: 11:28
 */

namespace Common\Model;
use Think\Model;

class StockRecordModel extends Model{

    /**
     * 保存股票走势记录
     * @param $exponent     股票走势
     * @param $increase     股票涨幅
     * @param $percent      股票涨幅百分比
     * @return bool|mixed   返回保存结果
     */
    public function saveStockRecord($exponent,$increase,$percent){
        $data               = array();
        $data['exponent']   = $exponent;
        $data['increase']   = $increase;
        $data['percent']    = $percent;
        $data['add_time']   = date('Y-m-d');
        if($this->create($data)){
            return $this->add();
        }else{
            return false;
        }
    }

    /**
     * 根据时间返回股票记录
     * @param $addTime
     * @param $field
     * @return mixed
     */
    public function getStockRecord($addTime,$field){
        $map                = array();
        $map['add_time']    = $addTime;
        return $this->where($map)->field($field)->find();
    }

}