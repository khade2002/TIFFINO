package com.example.tiffino_admin_review.Service;

import com.example.tiffino_admin_review.DTO.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private RestTemplate restTemplate;

    @Value("${user.service.url}")
    private  String USER_SERVICE_URL;

    @Override
    public List<User> getAllUsers(){
        ResponseEntity<User[]> response= restTemplate.getForEntity(USER_SERVICE_URL,User[].class);
        return Arrays.asList(response.getBody());
    }

}