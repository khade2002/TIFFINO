package com.tiffino.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Tiffino OTP Verification");
        message.setText("Hello,\n\n" +
                "Enter OTP for Sign-in into your Tiffino account is: " + otp + "\n\n" +
                "This OTP is valid for 15 minutes only and usable only once. Do not share it with anyone.\n\n" +
                "Thank you,\n" +
                "Team Tiffino");
        message.setFrom("verifytiffino@gmail.com");
        mailSender.send(message);
    }
}




