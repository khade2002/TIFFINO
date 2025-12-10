package com.tiffino.review;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class TiffinoUserReviewApplication {

	public static void main(String[] args) {
		SpringApplication.run(TiffinoUserReviewApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper(){  //modelMapper to map fields that match by name
		ModelMapper modelMapper=new ModelMapper();
		modelMapper.getConfiguration()
				.setMatchingStrategy(MatchingStrategies.STRICT);
		return modelMapper;

	}

}
