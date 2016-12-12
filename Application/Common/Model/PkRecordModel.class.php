<?php
/**
 * 用户PK记录表
 * User: 龙洋
 * Date: 2016/5/9
 * Time: 20:24
 */

namespace Common\Model;
use Think\Model;

class PkRecordModel extends Model{

    /**
     * 根据用户获取正在PK中的记录
     * @param $userId           用户ID
     * @param string $field     需要查找的字段
     * @return mixed            返回找到的字段结果集
     */
    public function getPkingRecord($userId,$field = ''){
        $map            = array();
        $map['user_id'] = $userId;
        $map['status']  = 'wait';
        return $this->where($map)->field($field)->order('id desc')->find();
    }
 /**
     * [getPkingRecordNew 新版获取正在PK中]
     * @ckhero
     * @DateTime 2016-11-03
     * @param    [type]     $userId [description]
     * @param    string     $field  [description]
     * @return   [type]             [description]
     */
     public function getPkingRecordNew($userId,$where=''){
        $pre = C('DB_PREFIX');
        $res = $this
               ->table($pre.'pk_record p')
               ->field('p.id,p.status,p.in_time,FROM_UNIXTIME(p.add_time,"%Y/%m/%d") as add_time,u.nickname,u.headimgurl,p.user_forecast,p.robot_forecast')
               ->join($pre."user_info u on p.other_user = u.id")
               ->where('p.user_id = '.$userId.' and p.status = "wait"'.$where)
               ->order('p.id desc')
               ->select();
        $res2 = $this->table($pre.'pk_record p')
                     ->field('p.id,p.status,p.in_time,FROM_UNIXTIME(p.add_time,"%Y/%m/%d") as add_time,if(p.other_user=0,"电脑","人") as nickname,p.user_forecast,p.robot_forecast,if(p.other_user=0,"http://uat.zwmedia.com.cn/pbqj/Public/resource/assets/home/home_yuce_cg_wawa.png","error") as headimgurl')
                     ->where('p.status="wait" and p.user_id='.$userId.' and p.other_user=0'.$where)
                     ->select();
         if(empty($res)) $res = array();
         if(empty($res2)) $res2 = array();
        return array_merge($res,$res2);
    }

    
    /**
     * [checkPkOther 两个用户之间只能同时进行一场pk]
     * @ckhero
     * @DateTime 2016-11-07
     * @param    [type]     $userId [description]
     * @param    [type]     $openid [description]
     * @return   [type]             [description]
     */
   public function checkPkOther($userId,$openid){
        
        $pre = C('DB_PREFIX');
        $res = $this->table($pre.'pk_record p')
                    ->join($pre.'user_info u on p.other_user=u.id')
                    ->where("p.user_id=$userId and p.status ='wait' and u.openid='$openid'")
                    ->find();
        if(empty($res)){

            return true;
        }else{

            return false;
        }
   }
    /**
     * 获取历史押注记录
     * @param $userId       用户ID
     * @param $field        需要返回的字段及
     * @return mixed        返回查询出的字段结果集
     */
    public function getHistoryPkRecord($userId,$field){
        $map                = array();
        $map['user_id']     = $userId;
        return $this->where($map)->field($field)->order('add_time desc')->select();
    }


    /**
     * 保存用户PK的投注记录
     * @param $userId           用户ID
     * @param $otherUser        其他用户ID
     * @param $userForecast     用户预测指数
     * @param $robotForecast    机器人预测指数
     * @return array|bool       成功返回用户预测和机器人预测指数，失败返回false
     */
    public function savePkingRecord($userId,$otherUser,$userForecast,$robotForecast,$status=1){
        $data                   = array();
        $data['user_id']        = $userId;
        $data['other_user']     = $otherUser;
        $data['user_forecast']  = $userForecast;
        $data['robot_forecast'] = $robotForecast;
        $data['status']         = 'wait';
        $data['add_time']       = time();
        $data['in_time']        = date('YmdH');
        $data['state']          = $status;   //1  发起者是自己   0 发起者是他人
        if($this->create($data)){
            $id = $this->add();
            return array('user_forecast'=>$userForecast,'robot_forecast'=>$robotForecast,'id'=>$id);
        }else{
            return false;
        }
    }

    /**
     * 更新PK记录状态
     * @param $id               记录ID
     * @param $status           需要更改的状态
     * @return bool             返回结果集
     */
    public function updateStatus($id,$status){
        $map            = array();
        $map['id']      = $id;
        return $this->where($map)->save(array('status'=>$status));
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