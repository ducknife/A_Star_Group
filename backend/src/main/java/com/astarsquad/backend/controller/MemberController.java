package com.astarsquad.backend.controller;

import com.astarsquad.backend.dto.MemberResponse;
import com.astarsquad.backend.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping
    public List<MemberResponse> findAll(@RequestParam(required = false) Boolean featured) {
        return memberService.findAll(Boolean.TRUE.equals(featured));
    }

    @GetMapping("/{id}")
    public MemberResponse findById(@PathVariable Long id) {
        return memberService.findById(id);
    }
}
