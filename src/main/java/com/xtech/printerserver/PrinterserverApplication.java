package com.xtech.printerserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

@EnableSpringDataWebSupport(pageSerializationMode = EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO)
@SpringBootApplication(exclude = UserDetailsServiceAutoConfiguration.class)
public class PrinterserverApplication {

    public static void main(String[] args) {
        SpringApplication.run(PrinterserverApplication.class, args);
    }

}
