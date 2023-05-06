package com.xiao.spaceflight.controller;

import com.xiao.spaceflight.pojo.News;
import com.xiao.spaceflight.pojo.NewsVO;
import com.xiao.spaceflight.service.NewsService;
import com.xiao.spaceflight.util.SpaceFlightConstant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Controller
public class NewsController {

    @Autowired
    private NewsService newsService;

    @GetMapping("/getNewsPage")
    public String getNewsPage(Model model){
        List<News> newsList = newsService.getNewsList();
        List<NewsVO> newsVOList = new ArrayList<>();
        for (News news : newsList){
            NewsVO newsVO = new NewsVO();
            newsVO.setId(news.getId());
            newsVO.setTitle1(news.getTitle1());
            newsVO.setTitle2(news.getTitle2());
            newsVO.setImgUrl(news.getImgUrl());
            newsVO.setUrl(news.getUrl());
            SimpleDateFormat dateFormat = new SimpleDateFormat("MM-dd");
            String date = dateFormat.format(news.getTime());
            String[] s = date.split("-");
            newsVO.setDay(Integer.parseInt(s[1]));
            newsVO.setMonth(SpaceFlightConstant.months.get(Integer.parseInt(s[0])));
            newsVOList.add(newsVO);
        }
        model.addAttribute("newsVOList",newsVOList);
        return "航天新闻";
    }

    @GetMapping("/getAdminNewsPage")
    public String getAdminNewsPage(Model model){
        List<News> newsList = newsService.getNewsList();
        model.addAttribute("newsList",newsList);
        return "后台新闻页";
    }

    @GetMapping("/getNewsEditPage/{id}")
    public String getNewsEditPage(@PathVariable("id") Integer id, Model model){
        News news = newsService.getNewsList().get(id - 1);
        model.addAttribute("news",news);
        return "后台新闻编辑";
    }

    @PostMapping("/updateNews")
    public String updateNews(News news){
        newsService.updateNews(news);
        return "redirect:/spaceflight/getNewsPage";
    }

}
