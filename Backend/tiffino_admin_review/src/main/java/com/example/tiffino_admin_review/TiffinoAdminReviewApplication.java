package com.example.tiffino_admin_review;

import org.aspectj.util.IStructureModel;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class TiffinoAdminReviewApplication {

	public static void main(String[] args) {
		SpringApplication.run(TiffinoAdminReviewApplication.class, args);
	}

}
