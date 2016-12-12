<?php
/**
 * 游戏接口类
 * User: 龙洋
 * Date: 2016/5/9
 * Time: 16:54
 */

namespace Api\Logic;


class GameLogic extends PublicLogic{

    const CURRENT_CANNOT_BET    = 1201; ##当前时间段不能押注/PK
    const REPEAT_BET_ERROR      = 1202; ##不能重复押注
    const BET_MONEY_ERROR       = 1203; ##押注金额错误
    const USER_IS_PKING         = 1204; ##用户正在进行PK
    const BALANCE_NOT_ENOUGH    = 1205; ##用户余额不足
    const USER_YET_SIGN_IN      = 1206; ##用户已经签到过
    const NOT_WIN_PRIZE         = 1207; ##用户未中奖
    const NOT_HAVE_TIME         = 1208; ##没有抽奖次数

    protected $userId;

    public function __construct(){
        $this->userId       = session('user_id');
        $this->pkLimit = 10;
    }

    public function getId(){

        return $this->id;
    }
    /**
     * 用户押注操作
     * @param $money        押注金额
     * @param $forecast     押注指数
     * @return bool         然后操作结果
     */
    public function bet($money,$forecast){
        ##参数检测
        if(empty($forecast) || !in_array($forecast,array('rise','fall'))){
            $this->error    = '参数错误【forecast不能为空并且值只能为rise,fall】';
            $this->errno    = self::PARAMETER_ERROR;
            return false;
        }
        if(!in_array($money,array(5000,10000,15000))){
            $this->error    = '押注金额错误，只能选择5000、10000、15000';
            $this->errno    = self::BET_MONEY_ERROR;
            return false;
        }
        ##押注条件检测
        if($this->_checkBetCondition($money) === false){
            return false;
        }
        ##保存用户押注信息，包括资金流水
        if(!$this->_changeUserBalance(-$money,'Bet','out') ||
           !D('BetRecord')->saveBetRecord($this->userId,$money,$forecast)){
            $this->error    = '数据库错误【GameLogic-bet-saveBetRecord】';
            $this->errno    = self::DATABASE_ERROR;
            return false;
        }
        return true;
    }


    /**
     * 检测是否符合押注条件
     * @param $money
     * @return bool
     */
    private function _checkBetCondition($money){
        $hour               = Date('H');
        $stockTime          = D('StockRecord')->where(array('add_time'=>date('Y-m-d',strtotime('-1 day'))))->find();
        if($hour > 13 && $hour < 15 && !$stockTime){
            $this->error    = '当前时间段不能押注';
            $this->errno    = self::CURRENT_CANNOT_BET;
            return false;
        }
        ##status为wait表示押注还没出结果
        if(D('BetRecord')->getFieldByUserId($this->userId,'status') == 'wait'){
            $this->error    = '您已经押注过了，请等候押注结果';
            $this->errno    = self::REPEAT_BET_ERROR;
            return false;
        }
        ##检测余额
        $userBalance        = D('UserInfo')->getFieldById($this->userId,'balance');
        if($userBalance < $money){
            $this->error    = '余额不足';
            $this->errno    = self::BALANCE_NOT_ENOUGH;
            return false;
        }
        return true;
    }

    /**
     * 检测用户是否可以进行PK玩法
     * @return bool
     */
    public function checkPkStatus($openid){

        
        if($openid){

            $user =  M('user_info')->getFieldByopenid($openid,'id');
            $betRecord          = M('pk_record')->where("user_id=$this->userId and other_user=$user")->find();
        }else{

            $user = $this->userId;
            $betRecord          = D('PkRecord')->getPkingRecord($this->userId,'user_forecast,robot_forecast');
        }
        if(!empty($openid)){

            if(!D('PkRecord')->checkPkOther($this->userId,$openid)){

                $this->error    = '你与该用户正在进行PK';
                $this->errno    = self::USER_IS_PKING;
                $this->data     = $betRecord;
                return false;
            }
        }
        if($user>0){

            
        $betRecordList          = D('PkRecord')->getPkingRecordNew($user," and p.state=\"1\"");//次数限制  查的是发起者的次数
        if(count($betRecordList) >= $this->pkLimit){


            $this->error    = '该用户已达当日pk次数上限';
            $this->errno    = self::USER_IS_PKING;
            $this->data     = 'error';
            return false;
        }
        }
        //$betRecord          = D('PkRecord')->getPkingRecord($this->userId,'user_forecast,robot_forecast');
        
        ##PK条件检测
        $hour               = Date('H');
        if($hour > 13 && $hour < 15){
            $this->error    = '当前时间段不能PK';
            $this->errno    = self::CURRENT_CANNOT_BET;
            return false;
        }
        // if($betRecord){
        //     $this->error    = '该用户正在进行玩家PK';
        //     $this->errno    = self::USER_IS_PKING;
        //     $this->data     = $betRecord;
        //     return false;
        // }
        return $betRecord['robot_forecast']?$betRecord['robot_forecast']:true;
    }


    /**
     * 用户PK投注
     * @param $userForecast     用户预测值
     * @param $openid           用户openid
     * @param $otherForecast    好友预测值
     * @return bool
     */
    public function userPkBet($userForecast,$openid,$otherForecast){
        if(empty($userForecast)){
            $this->error    = '预测指数不能为空';
            $this->errno    = self::PARAMETER_ERROR;
            return false;
        }
        ##检测是否可以进行PK
        if(!$this->checkPkStatus($openid)){
            return false;
        }
        ##自己PK
        if(empty($otherForecast)){
            ##生成机器人的预测记录，在用户的预测基础上，左右1000的范围随机
            $res = M('pk_record')->where(array('user_id'=>$this->userId,'other_user'=>0))->select();
            if(count($res)>=1){

                 $this->error    = '跟电脑一天只能pk一次';
                $this->errno    = self::PARAMETER_ERROR;
                return false;
            }
            if($userForecast > 1000){
                $baseforecast   = $userForecast-20;
            }else{
                $baseforecast   = 0;
            }
            $robotForecast      = rand($baseforecast,$userForecast+20)+rand(0,100)/100;
        ##好友PK
        }else{
            $robotForecast      = $otherForecast;
            $uid                = D('UserInfo')->getFieldByOpenid($openid,'id');
            ##status为wait表示押注还没出结果
            // if(D('PkRecord')->getFieldByUserId($uid,'status') == 'wait'){
            //     $this->error    = '好友正在PK中';
            //     $this->errno    = self::REPEAT_BET_ERROR;
            //     return false;
            // }
            $userInfo           = D('UserInfo')->getUserInfo(session('user_id'),'balance');
            if($userInfo['balance']-10000 < 0){
                $this->error    = '你的余额不足';
                $this->errno    = self::BALANCE_NOT_ENOUGH;
                return false;
            }
            ##保存用户PK押注记录   
            if($this->_changeUserBalance(-10000,'Pk','out',$uid) === false){
                return false;
            }
            D('PkRecord')->savePkingRecord($uid,$this->userId,$robotForecast,$userForecast);//发起pk的人的记录
        }
        ##保存用户PK押注记录
        if($this->_changeUserBalance(-10000,'Pk','out') === false){
            return false;
        }
        $forecast           = D('PkRecord')->savePkingRecord($this->userId,$uid?$uid:"",$userForecast,$robotForecast,0);//接受pk
        if($forecast === false){
            $this->error    = '数据库错误【GameLogic-userPkBet-PkRecord】';
            $this->errno    = self::DATABASE_ERROR;
            return false;
        }
        $this->id = $forecast['id'];
        return $robotForecast;
    }
    //出中奖结果结果
    //
    /**
     * 开奖，包括押注以及PK
     * @return bool
     */
    public function openPrize(){
        if(date('H') < 15){
            return false;
        }
        $result             = array();
        $yesterday          = date('Ymd')."13";
        $stockRecord        = D('StockRecord')->getStockRecord(date('Y-m-d'),'exponent,increase');
        $betRecord          = D('BetRecord')->getBetRecord($this->userId,'wait');
        ##押注的开奖并保存压住结果
        if(!empty($betRecord) && $betRecord['in_time'] <= $yesterday){
            if(($stockRecord['increase'] >= 0 && $betRecord['forecast'] == 'rise')
             ||($stockRecord['increase'] <= 0 && $betRecord['forecast'] == 'fall')){

                ##更新押注记录表的状态
                D('BetRecord')->updateStatus($betRecord['id'],'win',$betRecord['success']+1);
                $money      = $betRecord['money'] * 3;
                ##连续押中额外奖励
                if($betRecord['success'] == 2){
                    $money += 50000;
                }elseif($betRecord['success'] == 4){
                    $money += 100000;
                }elseif($betRecord['success'] == 9){
                    $money += 500000;
                }
                ##新增资金流水已经修改用户余额
                $this->_changeUserBalance($money,'Bet','in');
                $result['bet']  = array('result'=>'win','money'=>$betRecord['money'] * 2);
            }else{
                D('BetRecord')->updateStatus($betRecord['id'],'lose',0);
                $result['bet']  = array('result'=>'lose','money'=>$betRecord['money']);
            }
        }
        $pkRecord           = D('PkRecord')->getPkingRecord($this->userId);

        ##PK结果开奖并保存结果
        if(!empty($pkRecord) && $pkRecord['in_time'] <= $yesterday){
            if(abs($pkRecord['user_forecast']-$stockRecord['exponent']) <
               abs($pkRecord['robot_forecast']-$stockRecord['exponent'])){
                ##更新PK记录表的状态
               // D('PkRecord')->updateStatus($pkRecord['id'],'win');
                ##新增资金流水已经修改用户余额
                $this->_changeUserBalance(30000,'Pk','in');
                $result['pk']   = array('result'=>'win','money'=>2000);
            }else{
                //D('PkRecord')->updateStatus($pkRecord['id'],'lose');
                $result['pk']   = array('result'=>'lose','money'=>1000);
            }

            //新版更新中奖结果 ckhero
            $pkRecordList = D('PkRecord')->getPkingRecordNew($this->userId);
            foreach($pkRecordList as $key=>$val){

                if(!empty($val) && $val['in_time'] <= $yesterday){
 
                    
                    if(abs($val['user_forecast']-$stockRecord['exponent']) <
                       abs($val['robot_forecast']-$stockRecord['exponent'])){
                        ##更新PK记录表的状态
                        D('PkRecord')->updateStatus($val['id'],'win');
                        ##新增资金流水已经修改用户余额
                        $this->_changeUserBalance(30000,'Pk','in');
                        $pkRecordList[$key]['status']   = '赢';
                    }else{
                        D('PkRecord')->updateStatus($val['id'],'lose');
                        $pkRecordList[$key]['status']   = '输';
                    }
                }
            }
            if(!empty($pkRecordList)) S('pkResult'.$this->userId,$pkRecordList);
        }
        return $result;
    }

    /**
     * 捡金币游戏
     * @param $money
     * @return bool
     */
    public function pickUpGold($money){
        $UserInfoModel      = D('UserInfo');
        $signTime           = $UserInfoModel->getUserInfo($this->userId,'sign_time');
        if($signTime['sign_time'] == date('Y-m-d',time())){
            $this->error    = '您今天已经签到过，请勿重复签到';
            $this->errno    = self::USER_YET_SIGN_IN;
            return false;
        }
        ##新增签到
        D('UserInfo')->signIn($this->userId);
        ##如果金币为0直接返回true
        if(empty($money)){
            return true;
        }
        ##新增流水以及增加金额
        if($this->_changeUserBalance($money,'PickUp','in') === false){
            return false;
        }else{
            return true;
        }
    }

    /**
     * 获取奖品列表
     * @return mixed
     */
    public function getPrizeList(){
        $prizeList          = D('prizeList')->where(array('status'=>0))->field('name')->limit(8)->select();
        return $prizeList;
    }

    /**
     * 抽奖
     * @return int
     */
    public function lottery(){
        $prizeList          = D('PrizeList')->where(array('status'=>0,'num'=>array('gt',0)))->field('id,name')->limit(8)->select();
        if(empty($prizeList)){
            $this->error    = '未中奖';
            $this->errno    = self::NOT_WIN_PRIZE;
            return false;
        }
        $record             = D('PrizeRecord')->where(array("FROM_UNIXTIME(add_time,'%Y-%m-%d')"=>date('Y-m-d'),'user_id'=>$this->userId))->count(1);
        if($record >= 3){
            $this->error    = "今天的抽奖次数已经用完，请明天再来";
            $this->errno    = self::NOT_HAVE_TIME;
            return false;
        }
        $rand               = rand(1,count($prizeList));
        $prizeRecord        = array(
            'user_id'       => $this->userId,
            'prize_id'      => $prizeList[$rand-1]['id'],
            'add_time'      => time(),
        );
        if(!($prizeId=D('PrizeRecord')->add($prizeRecord))){
            $this->error    = '数据库错误【GameLogic-lottery-add】';
            $this->errno    = self::DATABASE_ERROR;
            return false;
        }
        if($this->_changeUserBalance(-1000,'LuckyDraw','out') === false){
            return false;
        }
        return array('prize'=>$rand-1,'prize_id'=>$prizeId);
    }

}