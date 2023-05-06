package com.xiao.spaceflight.mapper;

import com.xiao.spaceflight.pojo.News;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsMapper {

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
