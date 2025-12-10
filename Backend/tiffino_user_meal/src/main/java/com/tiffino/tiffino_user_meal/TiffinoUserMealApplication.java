package com.tiffino.tiffino_user_meal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class TiffinoUserMealApplication
{

	public static void main(String[] args)
    {
		SpringApplication.run(TiffinoUserMealApplication.class, args);
	}

}
