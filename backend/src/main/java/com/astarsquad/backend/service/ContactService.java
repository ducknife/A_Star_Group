package com.astarsquad.backend.service;

import com.astarsquad.backend.dto.ContactRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final JavaMailSender mailSender;
    private final String fromAddress;
    private final String recipientAddress;

    public ContactService(
            JavaMailSender mailSender,
            @Value("${app.mail.from}") String fromAddress,
            @Value("${app.mail.contact-recipient}") String recipientAddress
    ) {
        this.mailSender = mailSender;
        this.fromAddress = fromAddress;
        this.recipientAddress = recipientAddress;
    }

    public void sendContactMessage(ContactRequest request) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(fromAddress);
        mail.setTo(recipientAddress);
        mail.setReplyTo(request.email());
        mail.setSubject("[A* SQUAD] Liên hệ từ " + request.name());
        mail.setText("""
                Bạn có một lời nhắn mới từ website A* SQUAD:

                Họ tên: %s
                Email: %s

                Nội dung:
                %s
                """.formatted(request.name(), request.email(), request.message()));
        mailSender.send(mail);
    }
}
