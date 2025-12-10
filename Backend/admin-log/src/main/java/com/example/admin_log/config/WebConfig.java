package com.example.admin_log.config;

import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

public class WebConfig {
        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
            CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(List.of("http://localhost:5173")); // frontend URL
            configuration.addAllowedOriginPattern("*");
            configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
            configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
            configuration.setAllowCredentials(true);

            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**", configuration);
            return source;
        }
    }

