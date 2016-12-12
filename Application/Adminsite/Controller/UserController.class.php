<?php
/**
 * 会员后台
 * User: 龙洋
 * Date: 2016/5/11
 * Time: 18:09
 */

namespace Adminsite\Controller;


class UserController extends PublicController{

    //用户登录
    public function login(){
        $_req               = I('POST.');
        if($_req){
            if($_req['username'] == 'admin' && $_req['password'] == 'admin2016'){
                session('admin_user',1);
                echo_script("window.location.href='/Admin/Index/index.html'");
            }else{
                echo_script("alert('账号或密码错误')");
                $this->display();
            }
        }else{
            $this->display();
        }
    }

    //首页
    public function index(){
        $_req               = I('POST.');
        if($_req['username']){
            $userInfo       = D('User','Logic')->getUserInfo($_req['username']);
            if($userInfo === false){
                $error      = D('User','Logic')->getError();
                echo_script("alert('$error')");
                echo_script("window.location.href='/Admin/User/index.html'");
            }
            $this->assign('user_info',$userInfo ? array($userInfo) : '');
            $this->display();
        }else{
            $userInfo       = D('User','Logic')->getUserList();
            $this->assign('user_info',$userInfo);
            $this->display();
        }
    }


    //导出Excel
    function expUserList(){//导出Excel
        $xlsName        = "车展数据";
        $xlsCell        = array(
                            array('微信ID'),
                            array('昵称'),
                            array('手机号'),
                            array('资金'),
                            array('游戏局数'),
                            array('游戏胜率'),
                            array('PK局数'),
                            array('PK胜率'),
                        );
        $userInfo       = D('User','Logic')->getUserList();
        $xlsData	    = array();
        foreach($userInfo as $key => $value){
            unset($value['id']);
            unset($value['role']);
            unset($value['motto']);
            unset($value['add_time']);
            $i  	= 0;
            foreach($value as $k => $v){
                $xlsData[$key][$i]	= $v;
                $i++;
            }

        }
        $this->exportExcel($xlsName,$xlsCell,$xlsData);

    }



    /**
     * @param $expTitle 名称
     * @param $expCellName 参数
     * @param $expTableData 内容
     * @throws \PHPExcel_Exception
     * @throws \PHPExcel_Reader_Exception
     */
    public function exportExcel($expTitle,$expCellName,$expTableData){
        $xlsTitle = iconv('utf-8', 'gb2312', $expTitle);//文件名称
        $cellNum = count($expCellName);
        $dataNum = count($expTableData);
        vendor("PHPExcel.PHPExcel");

        $objPHPExcel = new \PHPExcel();

        $cellName = array('A','B','C','D','E','F','G','H');
        $objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(10);
//        $objPHPExcel->getActiveSheet(0)->mergeCells('A1:'.$cellName[$cellNum-1].'1');//合并单元格
//         $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A1', $expTitle.'  Export time:'.date('Y-m-d H:i:s'));
        for($i=0;$i<$cellNum;$i++){
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue($cellName[$i].'1', $expCellName[$i][0]);
        }
        // Miscellaneous glyphs, UTF-8
        for($i=0;$i<$dataNum;$i++){
            for($j=0;$j<$cellNum;$j++){
                $objPHPExcel->getActiveSheet()->setCellValue($cellName[$j].($i+2), $expTableData[$i][$j]);
            }
        }
        header('pragma:public');
        header('Content-type:application/vnd.ms-excel;charset=utf-8;name="'.$xlsTitle.'.xls"');
        header("Content-Disposition:attachment;filename=$xlsTitle.xls");//attachment新窗口打印inline本窗口打印
        $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');//Excel5为xls格式，excel2007为xlsx格式
        $objWriter->save('php://output');
        exit;
    }

}