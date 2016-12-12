<?php
/**
 * 商品管理
 * User: 龙洋
 * Date: 2016/5/12
 * Time: 14:12
 */

namespace Admin\Controller;

use Think\Upload;

class PrizeController extends PublicController{

    public function index(){
        $prizeList              = D('PrizeList')->where(array('status'=>0))->select();
        $this->assign('prize_list',$prizeList);
        $this->display();
    }


    //保存信息
    public function add(){
        $_req                   = I('POST.');
        if($_req){
            if(!$_req['num'] || !$_req['goods_id']){
                $this->_error('参数错误');
            }
            $title              = D('GoodsList')->getFieldById($_req['goods_id'],'title');
            $_req['add_time']   = time();
            $_req['name']       = $title;
            $_req['status']     = 0;
            D('PrizeList')->add($_req);
            $this->_success('新增成功');
        }else{
            $goodsList          = D('GoodsList')->where(array('status'=>'online','class'=>array('in','转盘抽奖,所有')))->field('id,title')->select();
            $this->assign('goods_list',$goodsList);
            $this->display();
        }
    }

    //编辑商品信息
    public function edit(){
        $prizeId                = I('GET.prize_id');
        $prizeInfo              = I('POST.');
        if(empty($prizeId) && empty($prizeInfo)){
            echo_script("alert('奖品ID不正确')");
            echo_script("window.location.href='".U('/Admin/Prize/index')."'");
        }
        if($prizeInfo['id']){
            $title              = D('GoodsList')->getFieldById($prizeInfo['goods_id'],'title');
            $prizeInfo['name']  = $title;
            if(D('PrizeList')->save($prizeInfo)){
                $this->_success('修改成功');
            }else{
                $this->_error('修改失败');
            }
        }else{
            $prize              = D('PrizeList')->where(array('id'=>$prizeId))->find();
            $goodsList          = D('GoodsList')->where(array('status'=>'online','class'=>array('in','转盘抽奖,所有')))->field('id,title')->select();
            $this->assign('goods_list',$goodsList);
            $this->assign('prize',$prize);
            $this->display();
        }
    }

    public function del(){
        $prizeId                = I('GET.prize_id');
        if(empty($prizeId)){
            echo_script("alert('奖品ID不对')");
            echo_script("window.location.href='".U('/Admin/Prize/index')."'");
        }
        if(D('PrizeList')->where(array('id'=>$prizeId))->save(array('status'=>1))){
            echo_script("alert('删除成功')");
            echo_script("window.location.href='".U('/Admin/Prize/index')."'");
        }else{
            echo_script("alert('删除失败')");
            echo_script("window.location.href='".U('/Admin/Prize/index')."'");
        }
    }


}