<?php
return array(
    //数据库配置信息
    'DB_TYPE'           => 'mysql',         // 数据库类型
    //'DB_HOST'           => '127.0.0.1',  // 服务器地址
    'DB_HOST'           => '127.0.0.1',  // 服务器地址
   // 'DB_NAME'           => 'pbaj',      // 数据库名
    'DB_NAME'           => 'pbqj',      // 数据库名
   // 'DB_USER'           => 'pbqj',          // 用户名
    'DB_USER'           => 'pbqj',          // 用户名
    //'DB_PWD'            => 'pbqj2016',    // 密码
    'DB_PWD'            => 'pbqj2016',    // 密码
    'DB_PORT'           => '3306',            // 端口
    'DB_PREFIX'         => 'pbqj_',         // 数据库表前缀
    'DB_CHARSET'        => 'utf8',          // 字符集
    //其他配置
    'DEFAULT_MODULE'    => 'Api',                               //默认模块
    'appid'             => 'wx88d660fefaf1b390',                //微信appid
    //'appid'             => 'wxf42302be9b7152f8',                //微信appid
    'secret'            => '89c7ba492f0e4d23fb3835de20e3f7db',  //微信secret
    //'secret'            => '6feaec4c62bc275a6edcbbab492dbaeb',  //微信secret
    'isonlyopenid'      => false,                               //是否静默方式只获取用户opendid（true，false；）
);