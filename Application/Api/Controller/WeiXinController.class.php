<?php

/**
 * 微信入口
 * User: 龙洋
 * Date: 2016/5/6
 * Time: 16:14
 */

namespace Api\Controller;
use Common\Util;
use Think\Controller;

class WeiXinController extends Controller{

    private $UserInfoModel;

    public function __construct(){
        $this->UserInfoModel    = D('UserInfo');
    }

    //微信入口
    public function index(){

        if(!empty($_GET['ab'])){

            
            $_SESSION['qzopenid']  = $_GET['ab'];
            $_SESSION['noSign'] = 1;
        }
        $Db             = M();
        $weixin         = new Util\Weixin();
        $weixin->_getAccessToken ();
        if($_SESSION['openid']){
            $sql = "select * from userinfo where openid='" . $_SESSION ['openid'] . "'";
            $userinfo = $Db	->query( $sql );
        }
        if (! $_SESSION ['openid'] || empty($userinfo[0])) {

            // openid不存在或者找不到相关用户记录
            if (! $_REQUEST ['code']) {
                $weixin->_getWeixinCode ();
            } else {
                $code = $_REQUEST ['code'];
                $user_info = $weixin->_getWeixinUserInfo ( $code );

                if ($user_info ['openid']) {
                    // 将openid保存到session中
                    $_SESSION ['openid'] = $user_info ['openid'];
                    $sql = "select * from userinfo where openid='" . $user_info ['openid'] . "'";
                    $users = $Db->query( $sql );

                    $nickname   = $user_info ['nickname'];  // 昵称
                    $openid     = $user_info ['openid'];    //openid
                    $headimgurl = $user_info ['headimgurl'];// 头像地址
                    $sex        = $user_info ['sex'];       // 性别
                    $province   = $user_info ['province'];  // 用户个人资料填写的省份
                    $city       = $user_info ['city'];      // 普通用户个人资料填写的城市
                    $country    = $user_info ['country'];   // 国家，如中国为CN

                    if ($users) {
                        $id     = $users [0] ['id'];
                        $sql    = "update userinfo set nickname='{$nickname}',openid='{$openid}',headimgurl='{$headimgurl}',sex='{$sex}',province='{$province}',city='{$city}',country='{$country}' where id='{$id}'";
                        $Db->execute ( $sql );
                    } else {
                        $sql    = "insert into userinfo(nickname,openid,headimgurl,sex,province,city,country) values('{$nickname}','{$openid}','{$headimgurl}','{$sex}','{$province}','{$city}','{$country}')";
                        $Db->execute ( $sql );
                    }
                    $_SESSION['userinfo']=$user_info;
                }elseif ($_SESSION['openid']){
                    $users      = $Db->query ("select * from userinfo where openid='" . $_SESSION['openid'] . "'");
                    if (!$users) {
                        $Db->execute ("insert into userinfo(openid) values('{$_SESSION['openid']}')");
                    }
                }
            }
            if(!empty($_GET['ab'])){//创建角色

            
            $UserLogic      = D('User','Logic');
            $UserLogic->saveRole("MatureWoman","新手一个，请指导");
           M('user_info')->where(array('openid'=>$_SESSION['openid'],'balance'=>15000))->save(array('balance'=>18000,'sign_in'=>1,'sign_time'=>date('Y-m-d')));
        }
            
        }else{
            $_SESSION['userinfo']=$userinfo[0];
        }
        $name       = $userinfo [0] ['nickname']?:$nickname;
        $openid     = $userinfo [0] ['openid']?:$_SESSION['openid'];
        $sex        = $userinfo [0] ['sex']?:$sex;
        $city       = $userinfo [0] ['city']?:$city;
        $country    = $userinfo [0] ['country']?:$country;
        $imgURL     = $userinfo [0] ['headimgurl']?:$headimgurl;
        
        //分享参数

        require COMMON_PATH.'Util/jssdk.php';
        $jssdk      = new \JSSDK(C('appid'), C('secret'));
        $signPackage= $jssdk->GetSignPackage();

        if(!empty($_GET['ab']) && $_GET['b']>0  && $_SESSION ['openid'] != $_SESSION['qzopenid'] ){
            
            $nickname2 = M('user_info')->getFieldByopenid($_GET['ab'],'nickname');
            echo "<script>window.localStorage.setItem('isShare','2');</script>";
            echo "<script>window.localStorage.setItem('nickname2','".$nickname2."');</script>";
            echo "<script>window.localStorage.setItem('score','".$_GET['b']."');</script>";
            echo "<script>window.localStorage.setItem('qzopenid2','".$_GET['ab']."');</script>";
        }else{

            $isShare = $_GET['isShare']>0?$_GET['isShare']:4;
            echo "<script>window.localStorage.setItem('isShare','".$isShare."');</script>";
        }
        $_SESSION['signature']=$signPackage;
        echo "<script>window.localStorage.setItem('appId','{$signPackage["appId"]}');</script>";
        echo "<script>window.localStorage.setItem('timestamp','{$signPackage["timestamp"]}');</script>";
        echo "<script>window.localStorage.setItem('nonceStr','{$signPackage["nonceStr"]}');</script>";
        echo "<script>window.localStorage.setItem('signature','{$signPackage["signature"]}');</script>";

        //分享参数end

        echo "<script>window.localStorage.setItem('name','$name');</script>";
        echo "<script>window.localStorage.setItem('sex','$sex');</script>";
        echo "<script>window.localStorage.setItem('city','$city');</script>";
        echo "<script>window.localStorage.setItem('country','$country');</script>";
        echo "<script>window.localStorage.setItem('openid','$openid');</script>";
        echo "<script>window.localStorage.setItem('imgURL','$imgURL');</script>";
        
        if($_GET['action']){
            echo "<script>window.localStorage.setItem('action','{$_GET['action']}');</script>";
        }
        //所有get参数都放如localStorage 里面，方便前段调用
        foreach ($_GET as $k=>$v){
            echo "<script>window.localStorage.setItem('$k','$v');</script>";
            setcookie($k,$v);
        }

        if(I('get.type')=='wild'){

            echo "<script>window.location='http://uat.zwmedia.com.cn/pbqj/Public/wild.html'</script>";
        }else{

            echo "<script>window.location='http://uat.zwmedia.com.cn/pbqj/Public/index.html'</script>";
        }
    }

}