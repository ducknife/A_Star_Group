import { useLanguage, type Language } from "../context/LanguageContext";

export const translations = {
  vi: {
    nav: {
      home: "Trang chủ",
      about: "Giới thiệu",
      members: "Thành viên",
      documents: "Tài liệu",
      contact: "Liên hệ",
      documentsCta: "Kho tài liệu",
    },
    footer: {
      navigation: "Điều hướng",
      contact: "Liên hệ",
      connect: "Kết nối",
      address: "Việt Nam",
      rights: "Đã đăng ký bản quyền.",
      login: "Đăng nhập",
    },
    home: {
      exploreMembers: "Khám phá thành viên",
      documentLibrary: "Kho tài liệu",
      learnMore: "Tìm hiểu thêm về chúng tôi",
      viewAll: "Xem tất cả",
      viewDocumentLibrary: "Xem kho tài liệu",
      contactNow: "Liên hệ ngay",
      coreValuesEyebrow: "Giá trị cốt lõi",
      missionTitle: "Sứ mệnh của A* SQUAD",
      peopleEyebrow: "Con người",
      featuredMembersTitle: "Thành viên tiêu biểu",
      resourcesEyebrow: "Tài nguyên",
      latestDocumentsTitle: "Tài liệu mới nhất",
      loadingMembers: "Đang tải danh sách thành viên...",
      loadingDocuments: "Đang tải tài liệu...",
      noFeaturedMembers: "Chưa có thành viên nổi bật nào được thêm.",
      noDocuments: "Chưa có tài liệu nào được đăng tải.",
      ctaTitle: "Trở thành một phần của A* SQUAD",
      ctaSubtitle:
        "Bạn là học sinh, sinh viên đạt học bổng và muốn kết nối với cộng đồng? Hãy liên hệ với chúng tôi.",
    },
    about: {
      eyebrow: "Định hướng",
      title: "Mục tiêu & Giá trị cốt lõi",
    },
    members: {
      eyebrow: "Cộng đồng A* SQUAD",
      title: "Thành viên",
      description: "Những cá nhân xuất sắc đã đạt học bổng và cùng đồng hành trong cộng đồng A* SQUAD.",
      searchPlaceholder: "Tìm theo tên, trường, học bổng...",
      loading: "Đang tải danh sách thành viên...",
      noResults: "Không tìm thấy thành viên phù hợp.",
      empty: "Chưa có thành viên nào được thêm.",
    },
    memberDetail: {
      back: "Quay lại danh sách thành viên",
      loading: "Đang tải hồ sơ thành viên...",
      notFound: "Không tìm thấy thành viên này.",
      otherLink: "Liên kết",
    },
    documents: {
      eyebrow: "Kho lưu trữ",
      title: "Tài liệu",
      description: "Tài liệu, hướng dẫn học bổng và biểu mẫu được A* SQUAD tổng hợp và chia sẻ cho cộng đồng.",
      all: "Tất cả",
      searchPlaceholder: "Tìm theo tiêu đề, mô tả...",
      search: "Tìm kiếm",
      loading: "Đang tải tài liệu...",
      noResults: "Không tìm thấy tài liệu phù hợp.",
      empty: "Chưa có tài liệu nào trong danh mục này.",
    },
    documentDetail: {
      back: "Quay lại kho tài liệu",
      loading: "Đang tải tài liệu...",
      notFound: "Không tìm thấy tài liệu này.",
      downloads: "lượt tải",
      download: "Tải xuống",
    },
    documentCard: {
      viewDetail: "Xem chi tiết",
      download: "Tải xuống",
    },
    contact: {
      eyebrow: "Kết nối với chúng tôi",
      title: "Liên hệ",
      description: "Bạn quan tâm đến A* SQUAD, muốn hợp tác hoặc có câu hỏi? Gửi lời nhắn cho chúng tôi.",
      email: "Email",
      address: "Địa chỉ",
      fullName: "Họ và tên",
      message: "Lời nhắn",
      sentTitle: "Đã gửi lời nhắn thành công",
      sentSubtitle: "Chúng tôi sẽ phản hồi bạn qua email sớm nhất có thể.",
      sendAnother: "Gửi lời nhắn khác",
      send: "Gửi lời nhắn",
      sending: "Đang gửi...",
      rateLimited: "Bạn đã gửi lời nhắn quá nhiều lần. Vui lòng thử lại sau ít phút.",
      genericError: "Gửi lời nhắn thất bại. Vui lòng thử lại sau.",
    },
    notFound: {
      oops: "Oops!",
      message: "Trang bạn tìm không tồn tại hoặc đã được di chuyển.",
      home: "Về trang chủ",
    },
    categories: {
      SCHOLARSHIP_GUIDE: "Hướng dẫn học bổng",
      STUDY_MATERIAL: "Tài liệu học tập",
      REPORT: "Báo cáo & Tổng kết",
      TEMPLATE: "Biểu mẫu",
      OTHER: "Khác",
    },
    common: {
      prevPage: "Trang trước",
      nextPage: "Trang sau",
      openMenu: "Mở menu",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      members: "Members",
      documents: "Documents",
      contact: "Contact",
      documentsCta: "Document Library",
    },
    footer: {
      navigation: "Navigation",
      contact: "Contact",
      connect: "Connect",
      address: "Vietnam",
      rights: "All rights reserved.",
      login: "Log in",
    },
    home: {
      exploreMembers: "Explore Members",
      documentLibrary: "Document Library",
      learnMore: "Learn more about us",
      viewAll: "View all",
      viewDocumentLibrary: "View document library",
      contactNow: "Contact us now",
      coreValuesEyebrow: "Core Values",
      missionTitle: "The A* SQUAD Mission",
      peopleEyebrow: "People",
      featuredMembersTitle: "Featured Members",
      resourcesEyebrow: "Resources",
      latestDocumentsTitle: "Latest Documents",
      loadingMembers: "Loading members...",
      loadingDocuments: "Loading documents...",
      noFeaturedMembers: "No featured members have been added yet.",
      noDocuments: "No documents have been uploaded yet.",
      ctaTitle: "Become part of A* SQUAD",
      ctaSubtitle:
        "Are you a student who has earned a scholarship and want to connect with the community? Get in touch with us.",
    },
    about: {
      eyebrow: "Direction",
      title: "Goals & Core Values",
    },
    members: {
      eyebrow: "The A* SQUAD Community",
      title: "Members",
      description:
        "Outstanding individuals who have earned scholarships and continue to grow together within the A* SQUAD community.",
      searchPlaceholder: "Search by name, school, scholarship...",
      loading: "Loading members...",
      noResults: "No matching members found.",
      empty: "No members have been added yet.",
    },
    memberDetail: {
      back: "Back to members",
      loading: "Loading member profile...",
      notFound: "This member could not be found.",
      otherLink: "Link",
    },
    documents: {
      eyebrow: "Archive",
      title: "Documents",
      description: "Documents, scholarship guides, and templates compiled and shared by A* SQUAD with the community.",
      all: "All",
      searchPlaceholder: "Search by title, description...",
      search: "Search",
      loading: "Loading documents...",
      noResults: "No matching documents found.",
      empty: "No documents in this category yet.",
    },
    documentDetail: {
      back: "Back to document library",
      loading: "Loading document...",
      notFound: "This document could not be found.",
      downloads: "downloads",
      download: "Download",
    },
    documentCard: {
      viewDetail: "View details",
      download: "Download",
    },
    contact: {
      eyebrow: "Get in touch",
      title: "Contact",
      description: "Interested in A* SQUAD, want to collaborate, or have a question? Send us a message.",
      email: "Email",
      address: "Address",
      fullName: "Full name",
      message: "Message",
      sentTitle: "Message sent successfully",
      sentSubtitle: "We'll get back to you by email as soon as possible.",
      sendAnother: "Send another message",
      send: "Send message",
      sending: "Sending...",
      rateLimited: "You've sent too many messages. Please try again in a few minutes.",
      genericError: "Failed to send message. Please try again later.",
    },
    notFound: {
      oops: "Oops!",
      message: "The page you're looking for doesn't exist or has been moved.",
      home: "Back to home",
    },
    categories: {
      SCHOLARSHIP_GUIDE: "Scholarship Guide",
      STUDY_MATERIAL: "Study Material",
      REPORT: "Report & Summary",
      TEMPLATE: "Template",
      OTHER: "Other",
    },
    common: {
      prevPage: "Previous page",
      nextPage: "Next page",
      openMenu: "Open menu",
    },
  },
} as const;

export function useTranslation() {
  const { language } = useLanguage();
  return { t: translations[language], language };
}

/** Picks the English variant when active and present, otherwise falls back to Vietnamese. */
export function pickLang(language: Language, vi: string, en?: string): string {
  return language === "en" && en ? en : vi;
}

export function pickLangOptional(language: Language, vi?: string, en?: string): string | undefined {
  return language === "en" && en ? en : vi;
}
