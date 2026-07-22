package com.astarsquad.backend.service;

import com.astarsquad.backend.dto.MemberRequest;
import com.astarsquad.backend.dto.MemberResponse;
import com.astarsquad.backend.entity.Member;
import com.astarsquad.backend.exception.ResourceNotFoundException;
import com.astarsquad.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {

    private static final String PHOTO_FOLDER = "members";

    private final MemberRepository memberRepository;
    private final CloudinaryStorageService cloudinaryStorageService;

    @Transactional(readOnly = true)
    public List<MemberResponse> findAll(boolean featuredOnly) {
        List<Member> members = featuredOnly
                ? memberRepository.findAllByFeaturedTrueOrderBySortOrderAscIdAsc()
                : memberRepository.findAllByOrderBySortOrderAscIdAsc();
        return members.stream().map(MemberResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public MemberResponse findById(Long id) {
        return MemberResponse.from(getOrThrow(id));
    }

    @Transactional
    public MemberResponse create(MemberRequest request) {
        Member member = Member.builder()
                .fullName(request.fullName())
                .university(request.university())
                .scholarshipName(request.scholarshipName())
                .major(request.major())
                .graduationYear(request.graduationYear())
                .bio(request.bio())
                .bioEn(request.bioEn())
                .linkedinUrl(request.linkedinUrl())
                .githubUrl(request.githubUrl())
                .otherUrl(request.otherUrl())
                .featured(request.featured())
                .sortOrder(request.sortOrder())
                .build();
        return MemberResponse.from(memberRepository.save(member));
    }

    @Transactional
    public MemberResponse update(Long id, MemberRequest request) {
        Member member = getOrThrow(id);
        member.setFullName(request.fullName());
        member.setUniversity(request.university());
        member.setScholarshipName(request.scholarshipName());
        member.setMajor(request.major());
        member.setGraduationYear(request.graduationYear());
        member.setBio(request.bio());
        member.setBioEn(request.bioEn());
        member.setLinkedinUrl(request.linkedinUrl());
        member.setGithubUrl(request.githubUrl());
        member.setOtherUrl(request.otherUrl());
        member.setFeatured(request.featured());
        member.setSortOrder(request.sortOrder());
        return MemberResponse.from(member);
    }

    @Transactional
    public MemberResponse updatePhoto(Long id, MultipartFile file) {
        Member member = getOrThrow(id);
        var uploaded = cloudinaryStorageService.upload(file, PHOTO_FOLDER, "image");
        member.setPhotoUrl(uploaded.url());
        return MemberResponse.from(member);
    }

    @Transactional
    public void delete(Long id) {
        Member member = getOrThrow(id);
        memberRepository.delete(member);
    }

    private Member getOrThrow(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thành viên có id=" + id));
    }
}
