package com.astarsquad.backend.repository;

import com.astarsquad.backend.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByUsername(String username);

    boolean existsByUsername(String username);

    List<Account> findAllByOrderByUsernameAsc();
}
