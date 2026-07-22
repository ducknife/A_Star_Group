package com.astarsquad.backend.service;

import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Simple fixed-window per-IP rate limiter for the public contact form. In-memory only —
 * fine at this app's scale (single instance, no need for Redis/shared state).
 */
@Component
public class ContactRateLimiter {

    private static final int MAX_REQUESTS_PER_WINDOW = 5;
    private static final Duration WINDOW = Duration.ofMinutes(15);

    private final ConcurrentHashMap<String, Bucket> buckets = new ConcurrentHashMap<>();

    public boolean tryAcquire(String clientIp) {
        Instant now = Instant.now();
        Bucket bucket = buckets.compute(clientIp, (ip, existing) -> {
            if (existing == null || existing.windowStart.plus(WINDOW).isBefore(now)) {
                return new Bucket(now, new AtomicInteger(1));
            }
            existing.count.incrementAndGet();
            return existing;
        });
        return bucket.count.get() <= MAX_REQUESTS_PER_WINDOW;
    }

    private record Bucket(Instant windowStart, AtomicInteger count) {
    }
}
