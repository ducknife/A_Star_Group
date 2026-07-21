package com.astarsquad.backend.repository;

import com.astarsquad.backend.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Long> {

    List<Member> findAllByOrderBySortOrderAscIdAsc();

    List<Member> findAllByFeaturedTrueOrderBySortOrderAscIdAsc();
}
