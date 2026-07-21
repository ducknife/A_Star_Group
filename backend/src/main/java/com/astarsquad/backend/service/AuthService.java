package com.astarsquad.backend.service;

import com.astarsquad.backend.dto.LoginRequest;
import com.astarsquad.backend.dto.LoginResponse;
import com.astarsquad.backend.entity.Account;
import com.astarsquad.backend.repository.AccountRepository;
import com.astarsquad.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final AccountRepository accountRepository;
    private final JwtService jwtService;

    public LoginResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        Account account = accountRepository.findByUsername(request.username())
                .orElseThrow(() -> new BadCredentialsException("Sai tên đăng nhập hoặc mật khẩu."));

        String role = account.getRole().name();
        String token = jwtService.generateToken(account.getUsername(), role);
        return new LoginResponse(token, account.getUsername(), role, jwtService.extractExpiration(token));
    }
}
