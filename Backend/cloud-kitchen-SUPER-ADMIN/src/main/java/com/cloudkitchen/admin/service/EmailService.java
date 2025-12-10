package com.cloudkitchen.admin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendTemporaryCredentials(String email, String name, String tempPassword, String username) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your Temporary Login Credentials");
        message.setText("Hello " + name + ",\n\n"
                + "Your temporary login credentials are:\n"
                + "Username: " + username + "\n"
                + "Password: " + tempPassword + "\n\n"
                + "This is your temporary password. Please change it once you login.\n\n"
                + "Regards,\nCloud Kitchen Admin Team");

        mailSender.send(message);
    }


}
