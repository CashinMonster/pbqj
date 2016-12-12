<?php
/**
 * 商品管理
 * User: 龙洋
 * Date: 2016/5/12
 * Time: 14:12
 */

namespace Admin\Controller;

use Think\Upload;

class WareController extends PublicController{

    public function index(){
        $wareList           = D('GoodsList')->page($_GET['p'].',25')->select();
        $sellCount          = D('SellRecord')->field('ware_id,count(1) as count')->group('ware_id')->select();
        foreach($sellCount as $key => $value){
            if($wareList[$value['ware_id']]){
                $wareList[$value['ware_id']]['sell_num']    = $value['count'];
            }
        }
        $Page       = new \Think\Page(D('GoodsList')->count(),25);
        $show       = $Page->show();
        $this->assign('page',$show);
        $this->assign('ware_list',$wareList);
        $this->display();
    }

    //上传图片
    public function uploadImage(){

        $upload                 = new Upload();// 实例化上传类
        $upload->maxSize        =     3145728 ;// 设置附件上传大小
        $upload->exts           =     array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
        $upload->rootPath       =      './Upload/'; // 设置附件上传根目录
        // 上传文件
        $info   =   $upload->upload();
        if(!$info){
            $this->_error($upload->getError());
        }else{
            $this->_success('上传成功',__ROOT__.'/Upload/'.$info['upload_file']['savepath'].$info['upload_file']['savename']);
        }
    }

    function impTicket(){
        if (!empty($_FILES)) {
            $upload                 = new Upload();// 实例化上传类
            $upload->maxSize        =     3145728 ;// 设置附件上传大小
            $upload->exts           =     array('xls','xlsx');// 设置附件上传类型
            $upload->rootPath       =      './Upload/'; // 设置附件上传根目录
            // 上传文件
            $info           =   $upload->upload();
            $this->_success('上传成功！',array('url'=>"./Upload/".$info['ticket']['savepath'].$info['ticket']['savename'],'name'=>$_FILES['ticket']['name']));
        }else{
            $this->_error("请选择上传的文件");
        }

    }


    //保存信息
    public function add(){
        $_req                   = I('POST.');
        if($_req){
            $_req['add_time']   = time();
            $_req['status']     = 'online';
            $fileUrl            = $_req['file_url'];
            unset($_req['file_url']);
            $goodsId            = D('GoodsList')->add($_req);
            if($fileUrl){
                $this->_impTicket($fileUrl,$goodsId);
            }
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
            echo_script("window.location.href='".U('/Admin/Ware/index')."'");
        }
        if($wareInfo['id']){
            if($wareInfo['file_url']){
                $this->_impTicket($wareInfo['file_url'],$wareInfo['id']);
                unset($wareInfo['file_url']);
            }
            D('GoodsList')->save($wareInfo);
            $this->_success('修改成功');
        }else{
            $wareList       = D('GoodsList')->where(array('id'=>$wareId))->find();
            $this->assign('ware',$wareList);
            $this->display();
        }
    }

    public function del(){
        $wareId             = I('GET.ware_id');
        if(empty($wareId)){
            echo_script("alert('商品ID不正确')");
            echo_script("window.location.href='".U('/Admin/Ware/index')."'");
        }
        if(D('GoodsList')->where(array('id'=>$wareId))->delete()){
            echo_script("alert('删除成功')");
            echo_script("window.location.href='".U('/Admin/Ware/index')."'");
        }else{
            echo_script("alert('删除失败')");
            echo_script("window.location.href='".U('/Admin/Ware/index')."'");
        }
    }

    private function _impTicket($fileUrl,$goodsId){
        vendor("PHPExcel.PHPExcel");
        $objReader      = new \PHPExcel_Reader_Excel2007();
        $objPHPExcel    = $objReader->load($fileUrl,$encode='utf-8');
        $sheet          = $objPHPExcel->getSheet(0);
        $highestRow     = $sheet->getHighestRow(); // 取得总行数
        $ticks          = array();
        for($i=1;$i<=$highestRow;$i++){
            $ticks[$i-1]['content']     = $objPHPExcel->getActiveSheet()->getCell("A".$i)->getValue();
            $ticks[$i-1]['goods_id']    = $goodsId;
            $ticks[$i-1]['add_time']    = date('Y-m-d H:i:s');
        }
        D('TicketRecord')->addAll($ticks);
    }


}