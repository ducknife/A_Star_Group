package com.astarsquad.backend.service;

import com.astarsquad.backend.dto.AccountRequest;
import com.astarsquad.backend.dto.AccountResponse;
import com.astarsquad.backend.entity.Account;
import com.astarsquad.backend.entity.AccountRole;
import com.astarsquad.backend.exception.ResourceNotFoundException;
import com.astarsquad.backend.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public List<AccountResponse> findAll() {
        return accountRepository.findAllByOrderByUsernameAsc().stream().map(AccountResponse::from).toList();
    }

    @Transactional
    public AccountResponse create(AccountRequest request) {
        if (accountRepository.existsByUsername(request.username())) {
            throw new DataIntegrityViolationException("Tên đăng nhập đã tồn tại: " + request.username());
        }
        Account account = Account.builder()
                .username(request.username())
                .passwordHash(passwordEncoder.encode(request.password()))
                .role(request.role())
                .displayName(request.displayName())
                .build();
        return AccountResponse.from(accountRepository.save(account));
    }

    @Transactional
    public void delete(Long id, String currentUsername) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tài khoản có id=" + id));

        if (account.getUsername().equals(currentUsername)) {
            throw new AccessDeniedException("Không thể tự xoá tài khoản đang đăng nhập.");
        }
        if (account.getRole() == AccountRole.ADMIN && accountRepository.findAllByOrderByUsernameAsc().stream()
                .filter(a -> a.getRole() == AccountRole.ADMIN).count() <= 1) {
            throw new AccessDeniedException("Không thể xoá tài khoản admin cuối cùng.");
        }
        accountRepository.delete(account);
    }
}
