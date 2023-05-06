package com.xiao.spaceflight.pojo;


import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class NewsVO {

    private Integer id;

    private Integer day;

    private String month;

    private String title1;

    private String  title2;

    private String url;

    private String imgUrl;
}
