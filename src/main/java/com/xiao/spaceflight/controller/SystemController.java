package com.xiao.spaceflight.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SystemController {

    @GetMapping("/getSystemDescription")
    public String getSystemPage(){
        return "航天系统_描述";
    }

    @GetMapping("/getSystemDataPage")
    public String getSystemDataPage(){
        return "航天系统_数据";
    }

}
