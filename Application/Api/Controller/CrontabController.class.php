<?php
/**
 * 自动执行控制器
 * User: 龙洋
 * Date: 2016/5/10
 * Time: 11:07
 */

namespace Api\Controller;


class CrontabController extends PublicController{

    //保存今天的股票记录
    public function saveTodayTrend(){
        $StockLogic         = D('Stock','Logic');
        $todayTrend         = $StockLogic->getTodayTrend();
        if($todayTrend === false){
            debug_log($StockLogic->getError(),'StockTrendError.log');
        }
        if(!D('StockRecord')->saveStockRecord($todayTrend['exponent'],$todayTrend['increase'],$todayTrend['percent'])){
            debug_log('数据库错误【Contab-saveTodayTrend-saveStockRecord】','StockTrendError.log');
        }else{
            $this->_success('保存成功');
        }
    }

}