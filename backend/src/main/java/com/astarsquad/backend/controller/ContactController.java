package com.astarsquad.backend.controller;

import com.astarsquad.backend.dto.ContactRequest;
import com.astarsquad.backend.exception.TooManyRequestsException;
import com.astarsquad.backend.service.ContactRateLimiter;
import com.astarsquad.backend.service.ContactService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;
    private final ContactRateLimiter rateLimiter;

    @PostMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void submit(@Valid @RequestBody ContactRequest request, HttpServletRequest httpRequest) {
        if (!rateLimiter.tryAcquire(clientIp(httpRequest))) {
            throw new TooManyRequestsException("Bạn đã gửi liên hệ quá nhiều lần. Vui lòng thử lại sau ít phút.");
        }
        contactService.sendContactMessage(request);
    }

    private String clientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
