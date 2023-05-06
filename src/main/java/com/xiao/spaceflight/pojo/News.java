package com.xiao.spaceflight.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class News {

    private Integer id;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date time;

    private String title1;

    private String  title2;

    private String url;

    private String imgUrl;
}
