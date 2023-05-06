package com.xiao.spaceflight.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HistoryController {

    @GetMapping("/getHistoryPage")
    public String getHistoryPage(){
        return "航天历史";
    }

    @GetMapping("/getHistoryDataPage")
    public String getHistoryDataPage(){
        return "航天历史_数据";
    }
}
