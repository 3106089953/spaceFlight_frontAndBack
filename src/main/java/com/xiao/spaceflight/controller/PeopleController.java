package com.xiao.spaceflight.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PeopleController {

    @GetMapping("/getAstronautsPage")
    public String getAstronautsPage(){
        return "杰出人物_宇航员";
    }

    @GetMapping("/getScientistPage")
    public String getScientistPage(){
        return "杰出人物_科学家";
    }
}
