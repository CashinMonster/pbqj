<?php
/**
 * 股票接口类
 * User: 龙洋
 * Date: 2016/5/9
 * Time: 12:00
 */

namespace Api\Logic;
use Common\Util\Curl;

class StockLogic extends PublicLogic{


    /**
     * 获取今天的股票走势
     * @return array|bool
     */
    public function getTodayTrend(){
        try {
            $curlResult = Curl::get('http://nufm2.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx',
                'type=CT&cmd=0000011&sty=DFPIU&token=44c9d251add88e27b65ed86506f6e5da');
        }catch (Exception $e){
            $this->error    = $e->getMessage();
            $this->errno    = self::CURL_ERROR;
            return false;
        }
        if($curlResult === false){
            $this->error    = Curl::getError();
            $this->errno    = self::CURL_ERROR;
            return false;
        }
        $stockTrend         = explode(',',$curlResult);
        return array('exponent'=>$stockTrend[2],'increase'=>$stockTrend[4],'percent'=>$stockTrend[5]);
    }



}