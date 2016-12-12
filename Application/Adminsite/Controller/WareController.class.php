<?php
/**
 * 商品管理
 * User: 龙洋
 * Date: 2016/5/12
 * Time: 14:12
 */

namespace Adminsite\Controller;

class WareController extends PublicController{

    public function index(){
        $wareList           = D('GoodsList')->select();
        $sellCount          = D('SellRecord')->field('ware_id,count(1) as count')->group('ware_id')->select();
        foreach($sellCount as $key => $value){
            $wareList[$value['ware_id']]['sell_num']    = $value['count'];
        }
        $this->assign('ware_list',$wareList);
        $this->display();
    }

    //上传图片
    public function uploadImage(){

        $upload                 = new Think\Upload();// 实例化上传类
        $upload->maxSize        =     3145728 ;// 设置附件上传大小
        $upload->exts           =     array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
        $upload->rootPath       =      './Upload/'; // 设置附件上传根目录
        // 上传文件
        $info   =   $upload->upload();
        if(!$info){
            $this->_error($upload->getError());
        }else{
            $this->_success('上传成功','/Upload/'.$info['upload_file']['savepath'].$info['upload_file']['savename']);
        }
    }

    //保存信息
    public function add(){
        $_req                   = I('POST.');
        if($_req){
            $_req['add_time']   = time();
            $_req['status']     = 'online';
            D('GoodsList')->add($_req);
            $this->_success('新增成功');
        }else{
            $this->display();
        }
    }

    //编辑商品信息
    public function edit(){
        $wareId             = I('GET.ware_id');
        $wareInfo           = I('POST.');
        if(empty($wareId) && empty($wareInfo)){
            echo_script("alert('商品ID不正确')");
            echo_script("window.location.href='/Admin/Ware/index.html'");
        }
        if($wareInfo['id']){
            if(D('GoodsList')->save($wareInfo)){
                $this->_success('修改成功');
            }else{
                $this->_error('修改失败');
            }
        }else{
            $wareList           = D('GoodsList')->where(array('id'=>$wareId))->find();
            $this->assign('ware',$wareList);
            $this->display();
        }
    }


}