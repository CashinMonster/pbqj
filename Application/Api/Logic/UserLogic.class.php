<?php
/**
 * 用户逻辑模块
 * User: 龙洋
 * Date: 2016/5/6
 * Time: 14:31
 */
namespace Api\Logic;

class UserLogic extends PublicLogic{

    const USER_IS_EXSIT     = 1101;
    const User_IS_NOT_EXSIT = 1102;

    private $userId;

    /**
     * 初始化
     * UserLogic constructor.
     */
    public function __construct(){
        $this->userId   = session('user_id');
    }

    /**
     * 修改头像
     * @param $role
     * @param $motto
     * @return bool
     */
    public function changeHead($role='',$motto=''){
        $data           = array();
        if($role){
            $data['role']   = $role;
        }
        if($motto){
            $data['motto']  = $motto;
        }
        D('UserInfo')->where(array('id'=>$this->userId))->save($data);
        return true;
    }

    /**
     * 检测是否有角色信息
     * @return bool|mixed
     */
    public function checkRole(){
        $userInfo           = D('UserInfo')->getByOpenid(session('openid'));
        if($userInfo){
            return $userInfo;
        }else{
            $this->errno    = self::User_IS_NOT_EXSIT;
            $this->error    = '该玩家还没选取过角色';
            return false;
        }
    }


    /**
     * 保存角色信息
     * @param $role     角色信息
     * @param $motto    格言
     * @return bool     返回保存结果
     */
    public function saveRole($role,$motto){
        $openid             = session('openid');
        ##参数检测
        if(empty($role) || empty($motto)){
            $this->error    = '参数错误【role、motto不能为空】';
            $this->errno    = self::PARAMETER_ERROR;
            return false;
        }
        if(!in_array($role,array('LittleGril','MatureWoman','LoserMan','TyrantMan'))){
            $this->error    = '参数错误【role值错误】';
            $this->errno    = self::PARAMETER_ERROR;
            return false;
        }
        ##如果存在角色信息报错
        $UserInfoModel      = D('UserInfo');
        $userInfo           = $UserInfoModel->getByOpenid($openid);
        if($userInfo){
            $this->errno    = self::USER_IS_EXSIT;
            $this->error    = '该玩家已经选取过角色';
            return false;
        }
        $headimgurl         =  $_SESSION['userinfo']['headimgurl'] ? $_SESSION['userinfo']['headimgurl'] : D('WxUserInfo')->getFieldByOpenid(session('openid'),'headimgurl');
        if(empty($headimgurl)){
            $this->error    = '获取不到用户头像';
            $this->errno    = self::PARAMETER_ERROR;
            return false;
        }
        ##新建用户信息
        $weChatInfo         = D('WxUserInfo')->getByOpenid($openid);
        $userId             = $UserInfoModel->saveUserInfo($openid,$weChatInfo['nickname'],$role,$motto,$_SESSION['userinfo']['headimgurl']);
        if($userId === false){
            $this->error    = '数据库错误【UserLogic--selectRole】';
            $this->errno    = self::DATABASE_ERROR;
            return false;
        }else{
            session('user_id',$userId);
            return true;
        }
    }

    /**
     * 获取用户信息
     * @return mixed    返回结果
     */
    public function getUserInfo(){
        $userInfo               = D('UserInfo')->getUserInfo($this->userId,"nickname,role,motto,balance,sign_time");
        $userInfo['ranking']    = D('UserInfo')->getMyBalanceRanking();
        ##根据余额判断级别
        if($userInfo['balance'] <= 5000){
            $userInfo['level']  = 1;
        }elseif($userInfo['balance'] <= 100000){
            $userInfo['level']  = 2;
        }else{
            $userInfo['level']  = 3;
        }
        ##签到情况
        if($userInfo['sign_time'] == date('Y-m-d')){
            $userInfo['sign_status']    = 1;
        }else{
            $userInfo['sign_status']    = 0;
        }
        unset($userInfo['sign_time']);
        ##押注情况
        if(D('BetRecord')->getFieldByUserId($this->userId,'status') == 'wait'){
            $userInfo['bet_status']     = 1;
        }else{
            $userInfo['bet_status']     = 0;
        }
        return $userInfo;
    }

    /**
     * 分享链接
     * @return bool     返回结果
     */
    public function share(){
        if(!D('UserInfo')->updateBalance($this->userId,1000)){
            return false;
        }else{
            return true;
        }
    }

    /**
     * 获取排行榜
     * @return mixed    返回排行榜
     */
    public function getRinking(){
        $rankList               = D('UserInfo')->getRinking();
        $oneselfRank            = D('UserInfo')->getOneselfRinking($this->userId);
        $userInfo               = D('UserInfo')->getUserInfo($this->userId,'nickname,headimgurl,balance');
        $userInfo['oneself_rank']   = $oneselfRank[0]['rank']+1;
        return array('ranking'=>$rankList,'oneself'=>$userInfo);
    }

    /**
     * 获取个人财富信息
     * @return mixed
     */
    public function getTreasureCenter(){
        ##获取个人信息
        $userInfo               = D('UserInfo')->getUserInfo($this->userId,'nickname,role,balance');
        ##统计押注情况
        $betWinTime             = D('BetRecord')->getWinTime($this->userId);
        $betTotalTime           = D('BetRecord')->getTotalTime($this->userId);
        $success                = D('BetRecord')->where(array('user_id'=>$this->userId))->order('success desc')->find();
        ##统计PK情况
        $pkWinTime              = D('PkRecord')->getWinTime($this->userId);
        $pkTotalTime            = D('PkRecord')->getTotalTime($this->userId);
        ##组装返回数据
        $data                   = $userInfo;
        $data['bet_win_time']   = $betWinTime;
        $data['bet_win_rate']   = $betWinTime*$betTotalTime ? round(($betWinTime/$betTotalTime)*100).'%' : 0 ;
        $data['pk_win_rate']    = $pkWinTime;
        $data['pk_total_rate']  = $pkWinTime*$pkTotalTime ? round(($pkWinTime/$pkTotalTime)*100).'%' : 0 ;
        $data['max_success']    = $success['success'];
        return $data;
    }

    /**
     * 获取押注历史记录
     * @return mixed            返回押注历史记录列表
     */
    public function getBetRecord(){
        $betField               = 'money,status,FROM_UNIXTIME(add_time,"%Y/%m/%d") as add_time';
        $betRecord              = D('BetRecord')->getHistoryBetRecord($this->userId,$betField);
        return $betRecord;
    }

    /**
     * 获取PK历史记录
     * @return mixed            返回PK历史记录列表
     */
    public function getPkRecord(){
        $pkField                = 'user_forecast as forecast,status,FROM_UNIXTIME(add_time,"%Y/%m/%d") as add_time';
        $pkRecord               = D('PkRecord')->getHistoryPkRecord($this->userId,$pkField);
        return $pkRecord;
    }

    /**
     * 获取商品购买记录
     * @return mixed
     */
    public function getBuyRecord(){
        $buyRecord              = D('SellRecord')->getBuyRecord($this->userId);

        // $sql                    = "select c.*,d.content as ticket,a.add_time,a.id from pbqj_prize_record as a
        //                            INNER JOIN pbqj_prize_list as b ON a.prize_id = b.id
        //                            INNER JOIN pbqj_goods_list as c ON b.goods_id = c.id
        //                            INNER JOIN pbqj_ticket_record as d ON d.record_id = a.id
        //                            WHERE a.user_id = {$this->userId} and d.user_id={$this->userId}";
        // $prizeRecord            = M('')->query($sql);
        $prizeRecord = array();
        $i                      = 0;
        $j                      = 0;
        $data                   = array();
        foreach($buyRecord as $key => $value){
            while(true){
                if($value['add_time'] < date('Y-m-d H:i:s',$prizeRecord[$i]['add_time'])){
                    $data[$j]['title']          = $prizeRecord[$i]['title'];
                    $data[$j]['expiry_date']    = $prizeRecord[$i]['expiry_date'];
                    $data[$j]['price']          = -1000;
                    $data[$j]['ticket']         = $prizeRecord[$i]['ticket'];
                    $data[$j]['link_url']       = $prizeRecord[$i]['link_url'];
                    $data[$j]['add_time']       = date('Y-m-d H:i:s',$prizeRecord[$i]['add_time']);
                    $i++;
                    $j++;
                }else{
                    break;
                }
            }
            $data[$j]           = $value;
            $j++;
        }
        for($k = $j; $k < count($prizeRecord) ; $k++){
            $data[$j]['title']          = $prizeRecord[$i]['title'];
            $data[$j]['expiry_date']    = $prizeRecord[$i]['expiry_date'];
            $data[$j]['price']          = -1000;
            $data[$j]['ticket']         = $prizeRecord[$i]['ticket'];
            $data[$j]['link_url']       = $prizeRecord[$i]['link_url'];
            $data[$j]['add_time']       = date('Y-m-d H:i:s',$prizeRecord[$i]['add_time']);
            $i++;
            $j++;
        }
        return $data;
    }

}
