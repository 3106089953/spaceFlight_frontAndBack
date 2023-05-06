package com.xiao.spaceflight.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    /**
     * 跳转首页
     * @return
     */
    @GetMapping(path = "/")
    public String getIndexPage(){
        return "首页";
    }


}
