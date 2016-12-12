<?php

namespace Common\Logic;

class BaseLogic{

    //錯誤信息
    protected $error    = null;
    //錯誤編碼
    protected $errno    = null;
    //相关数据
    protected $data     = array();

    //返回錯誤編碼
    public function getErrno(){
        return $this->errno;
    }
    //返回錯誤信息
    public function getError(){
        return $this->error;
    }
    //返回数据
    public function getData() {
        return $this->data;
    }
    
}
