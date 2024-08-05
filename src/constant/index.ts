// description : Navigation URL PATH
// description : 메인 페이지 URL
export const MAIN_PATH = '/shop';

// description : 인증 페이지 URL
export const AUTH_PATH = '/authentication';
export const SIGN_IN_PATH = 'sign-in';
export const SIGN_UP_PATH = 'sign-up';
export const FIND_ID_PATH = 'find-id';
export const FIND_PASSWORD_PATH = 'find-password';
export const FIND_PASSWORD_RESET_PATH = 'find-password-reset/:userId';
export const SNS_PATH = '/sns/:accessToken/:expires';

// description : 옷 페이지 URL 
export const CLOTH_PATH = '/cloth';
// 옷 전체
export const CLOTH_LIST_PATH = 'list';
// 옷 정보
export const CLOTH_INFO_PATH = 'info';
// 옷 정보 등록
export const CLOTH_INFO_REGIST_PATH = 'regist';
// 옷 정보 수정
export const CLOTH_INFO_UPDATE_PATH = 'update';

// description : 찜 페이지 URL 
export const FAVORITE_PATH = 'favorite';
// 전체 찜 목록 -> 옷 상세 페이지
export const FAVORITE_LIST_PATH = 'list';

// description : 장바구니 페이지 URL
export const CART_PATH = 'cart';
// 전체 장바구니 목록 
export const CART_LIST_PATH = 'list';

// description : 주문 페이지 URL
export const ORDER_PATH = 'order';
// 주문상세
export const ORDER_DATAIL_PATH = 'detail';

// description : 결제 페이지 URL 
export const PAYMENT_PATH = 'payment';
// 결제 상세 
export const PAYMENT_DATAIL_PATH = 'detail';

// description : 환불 페이지 URL
export const CANCEL_PATH = 'cancel';
// 주문 취소 
export const CANCEL_DATAIL_PATH = 'detail';
// 환불
export const CANCEL_REFUND_PATH = 'refund';

// description : 리뷰 페이지 URL 
export const REVIEW_PATH = 'review';
// 전체 리뷰 
export const REVIEW_LIST_PATH = 'list';
// 리뷰 상세
export const REVIEW_DATAIL_PATH = 'datail/:reviewNumber';
// 리뷰 작성
export const REVIEW_WRITE_PATH = 'write/:userId';
// 리뷰 수정(삭제버튼도 함께)
export const REVIEW_UPDATE_PATH = 'update/:userId';

// description : 공지사항 페이지 URL
export const NOTICE_PATH = 'notice';
// 공지 리스트
export const NOTICE_LIST_PATH = 'list';
// 공지 상세
export const NOTICE_DETAIL_PATH = '/:noticeNumber';

// description : 문의사항 페이지 URL
export const QNA_PATH = 'qna';
// 문의 전체 
export const QNA_LIST_PATH = 'list';
// 문의 상세
export const QNA_DETAIL_PATH = '/:qnaNumber';
// 문의 등록
export const QNA_REGIST_PATH = 'regist';
// 문의 수정
export const QNA_UPDATE_PATH = 'update/:qnaNumber';

// description : 자주하는 질문 페이지 URL
export const FREQUENT_QNA_PATH = 'frequent-qna';

// description : 마이 페이지 URL
export const MY_PAGE_PATH = '/my-page';
// 회원 정보
export const MY_PAGE_INFO_PATH = 'info';
// 회원 정보 수정
export const MY_PAGE_INFO_UPDATE_PATH = 'update/:userId';
// 회원 탈퇴
export const MY_PAGE_INFO_DELETE_PATH = 'delete/:userId';
// 쿠폰 
export const MY_PAGE_COUPON_PATH = 'coupon';

// description : 내 주문 내역 페이지 URL
// 전체 주문 내역
export const MY_ORDER_PATH = 'order';
// 주문 상세 
export const MY_ORDER_DATAIL_PATH = 'detail';

// description : 관리자 페이지 URL
export const ADMIN_PATH = '/admin';

// 회원관리
export const ADMIN_USER_PATH = 'user';
// 회원관리 상세
export const ADMIN_USER_DATAIL_PATH = ':userId';
// 상품관리 
export const ADMIN_PRODUCT_PATH = 'product';
// 주문관리
export const ADMIN_ORDER_PATH = 'order';

export const ADMIN_BOARD_PATH = 'board';
export const ADMIN_BORAD_NOTICE_PATH = 'notice';
// 공지 등록
export const ADMIN_BOARD_NOTICE_REGIST_PATH = 'regist';
// 공지 수정
export const ADMIN_BOARD_NOTICE_UPDATE_PATH = 'update/:noticeNumber';
// 문의 답변?
export const ADMIN_BOARD_QNA_PATH = 'qna';

// description: Navigation 절대 URL PATH 
export const MAIN_ABSOLUTE_PATH = MAIN_PATH;

// 회원가입 - 로그인 페이지
export const SIGN_IN_ABSOLUTE_PATH = `${AUTH_PATH}/${SIGN_IN_PATH}`;
export const SIGN_UP_ABSOLUTE_PATH = `${AUTH_PATH}/${SIGN_UP_PATH}`;
export const FIND_ID_ABSOLUTE_PATH = `${AUTH_PATH}/${FIND_ID_PATH}`;
export const FIND_PASSWORD_ABSOLUTE_PATH = `${AUTH_PATH}/${FIND_PASSWORD_PATH}`;
export const FIND_PASSWORD_RESET_ABSOLUTE_PATH = (userId : string) => `${AUTH_PATH}/find-password-reset/${userId}`;

// 공지사항
export const NOTICE_ABSOLUTE_PATH = `${MAIN_PATH}/${NOTICE_PATH}`;
export const NOTICE_DETAIL_ABSOLUTE_PATH = (noticeNumber : number) => `${MAIN_PATH}/${NOTICE_PATH}/${noticeNumber}` ;

// 문의사항
export const QNA_ABSOLUTE_PATH = `${MAIN_PATH}/${QNA_PATH}`;
export const QNA_DETAIL_ABSOLUTE_PATH = (qnaNumber : number) => `${MAIN_PATH}/${QNA_PATH}/${qnaNumber}`;
export const QNA_REGIST_ABSOLUTE_PATH = `${MAIN_PATH}/${QNA_PATH}/${QNA_REGIST_PATH}`;
export const QNA_UPDATE_ABSOLUTE_PATH = (qnaNumber : number) => `${MAIN_PATH}/${QNA_PATH}/${QNA_UPDATE_PATH}/${qnaNumber}`;

// 자주하는 질문
export const FREQUENT_QNA_ABSOLUTE_PATH = `${MAIN_PATH}/${FREQUENT_QNA_PATH}`;

// description: API URL PATH
export const SERVER_DOMAIN_URL ='http://localhost:4000';
export const SERVER_API_URL = `${SERVER_DOMAIN_URL}/api/v1`;

// description: AUTH 모듈 내의 기능 URL
export const SERVER_AUTH_MODULE_URL = `${SERVER_API_URL}/auth`;

export const POST_SIGN_IN_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/sign-in`;
export const SNS_SIGN_IN_REQUEST_URL = (type: string) => `${SERVER_AUTH_MODULE_URL}/oauth2/${type}`;
export const POST_ID_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/id-check`;
export const POST_NICKNAME_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/nickname-check`;
export const POST_EMAIL_AUTH_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/email-auth`;
export const POST_EMAIL_AUTH_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/email-auth-check`;
export const POST_SIGN_UP_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/sign-up`;
export const POST_FIND_ID_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/find-id`;
export const POST_FIND_PASSWORD_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/find-password`;
export const PATCH_FIND_PASSWORD_RESET_REQUEST_URL = (userId: string) => `${POST_FIND_PASSWORD_REQUEST_URL}/${userId}`;