package com.xiao.spaceflight;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = "com.xiao.spaceflight.mapper")
public class SpaceFlightInitApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpaceFlightInitApplication.class);
    }
}
