package com.example.report;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class ReportsApplication {

    public static void main(String[] args) {
		SpringApplication.run(ReportsApplication.class, args);
	}

}

//http://localhost:9086/analytics/download?name=test
