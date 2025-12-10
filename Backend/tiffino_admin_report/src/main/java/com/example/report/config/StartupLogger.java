package com.example.report.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class StartupLogger implements CommandLineRunner {

    @Override
    public void run(String... args) {
        String url = "http://localhost:8080/";
        System.out.println("✅ Application started. Open in browser: " + url);
    }
}
//
//
//package com.example.Cart.Config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//@Configuration
//public class WebConfig {
//
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOrigins("http://localhost:5173") // ✅ React frontend ka URL
//                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                        .allowedHeaders("*")
//                        .allowCredentials(true);
//            }
//        };
//    }
//}

