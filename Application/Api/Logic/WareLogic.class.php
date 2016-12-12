<?php
/**
 * User: 龙洋
 * Date: 2016/5/17
 * Time: 21:54
 */

namespace Api\Logic;


use Common\Util\Curl;

class WareLogic extends PublicLogic{

    const WARE_NUMBER_NOT_ENOUGH    = 1301; ##商品库存不足
    const NOT_PRIZE                 = 1302; ##未中奖

    ##用户ID
    protected $userId;

    public function __construct(){
        $this->userId       = session('user_id');
    }

    /**
     * 获取商品详情
     * @param $wareId       商品ID
     * @return mixed        返回商品详情
     */
    public function getWareDetails($wareId){
        if(empty($wareId)){
            $this->error    = '参数错误【ware_id不能为空】';
            $this->errno    = self::PARAMETER_ERROR;
            return false;
        }
        $field              = 'details,price,title,image,rule,expiry_date';
        $wareDetails        = D('GoodsList')->where(array('id'=>$wareId))->field($field)->find();
        return $wareDetails;
    }

    /**
     * 购买商品
     * @param $wareId       商品ID
     * @param $telphone     手机号码
     * @return bool         购买结果
     */
    public function buyWare($wareId,$telphone){
        if(empty($wareId) || empty($telphone)){
            $this->error    = "参数错误【ware_id,telphone不能为空】";
            $this->errno    = self::PARAMETER_ERROR;
            return false;
        }
        $wareDetails        = D('GoodsList')->where(array('id'=>$wareId))->find();
        if($wareDetails['number'] <= 0 ){
            $this->error    = '商品库存不足';
            $this->errno    = self::WARE_NUMBER_NOT_ENOUGH;
            return false;
        }
        if($this->_changeUserBalance(-$wareDetails['price'],'Exchange','out') === false){
            return false;
        }
        $sellRecordId       = D('SellRecord')->insertSellRecord($this->userId,$wareDetails['title'],$wareId,$wareDetails['price'],$telphone);
        if($sellRecordId === false){
            $this->error    = '数据库错误【WareLogic-buyWare-insertSellRecord】';
            $this->errno    = self::DATABASE_ERROR;
            return false;
        }
        if(D('GoodsList')->where(array('id'=>$wareId))->setDec('number') === false){
            $this->error    = '数据库错误【WareLogic-buyWare-setDec】';
            $this->errno    = self::DATABASE_ERROR;
            return false;
        }
        $ticket = M('TicketRecord')->where(array('goods_id'=>$wareId,'status'=>0))->find();
        D('TicketRecord')->where(array('id'=>$ticket['id']))->limit(1)->save(array('status'=>1,'use_time'=>date('Y-m-d H:i:s'),'user_id'=>$this->userId,'record_id'=>$sellRecordId));
        try {
            // $curlResult     = Curl::get('http://175.102.15.131/msg/HttpSendSM',
            //                         "account=edbaotmhy&pswd=NdOs8K8@WaYW&mobile={$telphone}&msg={$wareDetails['sms_content']}");
            // $curlResult     = explode(',',$curlResult);
            // if($curlResult[1]){
            //     debug_log($curlResult);
            // }
            $res = send_msg($telphone,str_replace('{couponcode}', $ticket['content'], $wareDetails['sms_content']));
            debug_log(json_encode($res));
        }catch (Exception $e){
            $this->error    = $e->getMessage();
            $this->errno    = self::CURL_ERROR;
            return false;
        }
        return true;

    }

    /**
     * 保存中奖纪录
     * @param $prizeId       中奖ID
     * @param $telphone      电话号码
     * @return bool         购买结果
     */
    public function saveLotteryInfo($record_id,$telphone){
        if(empty($record_id) || empty($telphone)){
            $this->error    = '参数错误【prizeId和telphone不能为空】';
            $this->errno    = self::PARAMETER_ERROR;
            return false;
        }
        if(!D('PrizeRecord')->getById($record_id)){

            $this->error    = '您没有中奖，请勿提交';
            $this->errno    = self::NOT_PRIZE;
            return false;
        }
        // $goodsId            = D('PrizeList')->getFieldById($prizeId,'goods_id');
        // $wareDetails        = D('GoodsList')->where(array('id'=>$goodsId))->find();
        $prize_id = D('prize_record')->getFieldById($record_id,'prize_id');
        $goodsId            = D('PrizeList')->getFieldById($prize_id,'goods_id');
        $wareDetails        = D('GoodsList')->where(array('id'=>$goodsId))->find();
        $id =D('SellRecord')->insertSellRecord($this->userId,$wareDetails['title'],$goodsId,-1000,$telphone);
        if($id === false){
            $this->error    = '数据库错误【WareLogic-buyWare-insertSellRecord】';
            $this->errno    = self::DATABASE_ERROR;
            return false;
        }
        $ticket  = M('TicketRecord')->where(array('goods_id'=>$goodsId,'status'=>0))->find();
        D('TicketRecord')->where(array('id'=>$ticket['id']))->limit(1)->save(array('status'=>1,'use_time'=>date('Y-m-d H:i:s'),'user_id'=>$this->userId,'record_id'=>$id));
        try {
            // $curlResult     = Curl::get('http://175.102.15.131/msg/HttpSendSM',
            //     "account=edbaotmhy&pswd=NdOs8K8@WaYW&mobile={$telphone}&msg={$wareDetails['sms_content']}");
            // $curlResult     = explode(',',$curlResult);
            $res = send_msg($telphone,str_replace('{couponcode}', $ticket['content'], $wareDetails['sms_content']));
            //if($curlResult[1]){
                debug_log(json_encode($res));
           // }
        }catch (Exception $e){
            $this->error    = $e->getMessage();
            $this->errno    = self::CURL_ERROR;
            return false;
        }
        return true;

    }


}