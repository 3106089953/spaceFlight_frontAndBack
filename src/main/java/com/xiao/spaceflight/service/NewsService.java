package com.xiao.spaceflight.service;


import com.xiao.spaceflight.pojo.News;

import java.util.List;

public interface NewsService {

    /**
     * 获取所有的新闻
     * @return
     */
    List<News> getNewsList();

    /**
     * 根据新闻实体进行更新对应的新闻实体
     * @param news
     * @return
     */
    Integer updateNews(News news);
}
