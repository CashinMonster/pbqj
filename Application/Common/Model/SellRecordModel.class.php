<?php
/**
 * User: 龙洋
 * Date: 2016/5/13
 * Time: 11:27
 */

namespace Common\Model;
use Think\Model;

class SellRecordModel extends Model{

    /**
     * 获取商品总数
     * @return mixed        返回查询结果集
     */
    public function getCountGroup(){
        return $this->group('ware_id')->count();
    }

    /**
     * 保存销售记录
     * @param $userId       用户ID
     * @param $wareTitle    商品标题
     * @param $wareId       商品ID
     * @param $price        商品单价
     * @param $telphone     手机号码
     * @return bool|mixed   返回保存结果集
     */
    public function insertSellRecord($userId,$wareTitle,$wareId,$price,$telphone){
        $data               = array();
        $data['user_id']    = $userId;
        $data['ware_title'] = $wareTitle;
        $data['price']      = $price;
        $data['ware_id']    = $wareId;
        $data['telphone']   = $telphone;
        $data['add_time']   = time();
        if($this->create($data)){
            return $this->add($data);
        }else{
            return false;
        }
    }

    /**
     * 获取购买记录
     * @param $userId           用户ID
     * @return mixed            返回结果集
     */
    public function getBuyRecord($userId){
        $sql                    = "select b.title,b.expiry_date,b.price,c.content as ticket,b.link_url,
                                   FROM_UNIXTIME(a.add_time,'%Y-%m-%d %H:%i:%s') as add_time
                                   from pbqj_sell_record as a INNER JOIN pbqj_goods_list as b ON a.ware_id = b.id
                                   INNER JOIN pbqj_ticket_record as c ON c.record_id = a.id
                                   where a.user_id = {$userId} ORDER by a.add_time DESC ";
        return $this->query($sql);
    }

}