package com.example.shortletBackend.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service @AllArgsConstructor
public class MailService {

    @Autowired
    private JavaMailSender emailSender;


    public void sendSimpleMessage(String recieverEmail, String subject, String text){
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(System.getenv("email"));
        message.setTo(recieverEmail);
        message.setSubject(subject);
        message.setText(text);

        emailSender.send(message);
        System.out.println("email was sent ");
    }
}
