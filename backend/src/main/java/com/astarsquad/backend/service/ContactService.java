package com.astarsquad.backend.service;

import com.astarsquad.backend.dto.ContactRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

/**
 * Sends contact form messages via the Resend HTTP API instead of raw SMTP.
 * Render (and most free-tier PaaS hosts) block outbound SMTP ports (25/465/587)
 * to prevent abuse, so SMTP connections there simply time out — an HTTPS API
 * call on port 443 works instead.
 */
@Service
public class ContactService {

    private static final String SENDER = "A* SQUAD <onboarding@resend.dev>";

    private final RestClient restClient;
    private final String recipientAddress;

    public ContactService(
            @Value("${app.resend.api-key}") String resendApiKey,
            @Value("${app.mail.contact-recipient}") String recipientAddress
    ) {
        this.restClient = RestClient.builder()
                .baseUrl("https://api.resend.com")
                .defaultHeader("Authorization", "Bearer " + resendApiKey)
                .build();
        this.recipientAddress = recipientAddress;
    }

    public void sendContactMessage(ContactRequest request) {
        if (request.website() != null && !request.website().isBlank()) {
            // Honeypot tripped — silently accept without sending so the bot gets no signal.
            return;
        }

        String text = """
                Bạn có một lời nhắn mới từ website A* SQUAD:

                Họ tên: %s
                Email: %s

                Nội dung:
                %s
                """.formatted(request.name(), request.email(), request.message());

        Map<String, Object> body = Map.of(
                "from", SENDER,
                "to", List.of(recipientAddress),
                "reply_to", request.email(),
                "subject", "[A* SQUAD] Liên hệ từ " + request.name(),
                "text", text
        );

        restClient.post()
                .uri("/emails")
                .contentType(MediaType.APPLICATION_JSON)
                .body(body)
                .retrieve()
                .toBodilessEntity();
    }
}
