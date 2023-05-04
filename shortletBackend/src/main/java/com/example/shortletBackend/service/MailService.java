package com.example.shortletBackend.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Service @AllArgsConstructor
public class MailService {

    @Autowired
    private JavaMailSender emailSender;
    @Autowired
    private final SpringTemplateEngine templateEngine;


    public void sendSimpleMessage(String recieverEmail, String subject, String text){
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(System.getenv("email"));
        message.setTo(recieverEmail);
        message.setSubject(subject);
        message.setText(text);

        emailSender.send(message);
        System.out.println("email was sent ");
    }

    public void sendHtmlMessage(String recieverEmail, String subject, String userName,String template) throws MessagingException {
        MimeMessage message= emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
        Context context = new Context();
        context.setVariable("name",userName);
        helper.setFrom(System.getenv("email"));
        helper.setTo(recieverEmail);
        helper.setSubject(subject);
        String html = templateEngine.process(template,context);
        helper.setText(html,true);

        emailSender.send(message);
    }
}
