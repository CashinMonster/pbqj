<?php

/**
 * API逻辑模块公用类
 * User: 龙洋
 * Date: 2016/5/6
 * Time: 14:31
 */

namespace Api\Logic;
use Common\Logic\BaseLogic;

class PublicLogic extends BaseLogic{

    const NO_LOGIN_IN           = 1001; ##未登录
    const PARAMETER_ERROR       = 1002; ##参数错误
    const DATABASE_ERROR        = 1003; ##数据库错误
    const CURL_ERROR            = 1004; ##CRUL错误
    const BALANCE_NOT_ENOUGH    = 1005; ##余额不足

    /**
     * 改变用户余额
     * @param $chageMoney   改变金额
     * @param $type         流水类型，PK/押注/兑换等
     * @param $status       流水状态，收入还是支出
     * @param $useId        用户id
     * @return bool         返回操作结果
     */
    protected function _changeUserBalance($chageMoney,$type,$status,$useId){
        if(empty($useId)){
            $userId         = session('user_id');
        }else{
            $userId         = $useId;
        }
        $userInfo           = D('UserInfo')->getUserInfo($userId,'balance');
        if($chageMoney < 0 && $userInfo['balance']+$chageMoney < 0){
            $this->error    = '对方余额不足';
            $this->errno    = self::BALANCE_NOT_ENOUGH;
            return false;
        }
        ##更新用户余额
        $userBalance        = D('UserInfo')->updateBalance($userId,$chageMoney);
        if($userBalance === false){
            $this->error    = '数据库错误【GameLogic-bet-updateBalance】';
            $this->errno    = self::DATABASE_ERROR;
            return false;
        }
        ##更新用户资金流水
        if(D('FundRecord')->saveFundRecord($userId,$chageMoney,$type,$userBalance,$status) === false){
            $this->error    = '数据库错误【GameLogic-bet-saveFundRecord】';
            $this->errno    = self::DATABASE_ERROR;
            return false;
        }
        return true;
    }

}
