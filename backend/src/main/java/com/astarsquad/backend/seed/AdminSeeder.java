package com.astarsquad.backend.seed;

import com.astarsquad.backend.entity.Account;
import com.astarsquad.backend.entity.AccountRole;
import com.astarsquad.backend.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class AdminSeeder implements ApplicationRunner {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.username:admin}")
    private String defaultUsername;

    @Value("${app.admin.password:ChangeMe123!}")
    private String defaultPassword;

    @Override
    public void run(ApplicationArguments args) {
        if (accountRepository.existsByUsername(defaultUsername)) {
            return;
        }

        Account admin = Account.builder()
                .username(defaultUsername)
                .passwordHash(passwordEncoder.encode(defaultPassword))
                .role(AccountRole.ADMIN)
                .displayName("Quản trị viên")
                .build();
        accountRepository.save(admin);

        log.warn(
                "Đã tạo tài khoản admin mặc định (username='{}'). Vui lòng đăng nhập và đổi mật khẩu, "
                        + "hoặc cấu hình biến môi trường ADMIN_DEFAULT_USERNAME / ADMIN_DEFAULT_PASSWORD trước khi triển khai production.",
                defaultUsername
        );
    }
}
