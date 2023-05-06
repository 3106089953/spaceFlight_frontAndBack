package com.xiao.spaceflight.service.impl;

import com.xiao.spaceflight.mapper.NewsMapper;
import com.xiao.spaceflight.pojo.News;
import com.xiao.spaceflight.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsServiceImpl implements NewsService {

    @Autowired
    private NewsMapper newsMapper;

    @Override
    public List<News> getNewsList() {
        return newsMapper.getNewsList();
    }

    @Override
    public Integer updateNews(News news) {
        return newsMapper.updateNews(news);
    }
}
