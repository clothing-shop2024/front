// description : Navigation URL PATH
// description : 메인 페이지 URL
export const MAIN_PATH = '/shop';

// description : 인증 페이지 URL
export const AUTH_PATH = 'auth';
export const SIGN_IN_PATH = 'sign-in';
export const SIGN_UP_PATH = 'sign-up';
export const FIND_ID_PATH = 'find-id';
export const FIND_PASSWORD_PATH = 'find-password';
export const FIND_PASSWORD_RESET_PATH = 'find-password-reset';
export const SNS_PATH = 'sns/:accessToken/:expires';

// description : 옷 페이지 URL 
export const CLOTH_PATH = 'cloth';
export const CLOTH_LIST_PATH = 'list';
export const CLOTH_INFO_PATH = 'info/:clothNumber';
export const CLOTH_INFO_REGIST_PATH = 'regist';
export const CLOTH_INFO_UPDATE_PATH = 'update/:clothNumber';
export const CLOTH_CATEGORY1_PATH = ':category1';
export const CLOTH_SEARCH_PATH = 'search';

// description : 찜 페이지 URL 
export const FAVORITE_PATH = 'favorite';
export const FAVORITE_LIST_PATH = 'list';

// description : 장바구니 페이지 URL
export const CART_PATH = 'cart';
export const CART_LIST_PATH = 'list';

// description : 주문 페이지 URL
export const ORDER_PATH = 'order';
export const ORDER_DATAIL_PATH = 'detail';

// description : 결제 페이지 URL 
export const PAYMENT_PATH = 'payment';
export const PAYMENT_DATAIL_PATH = 'detail';

// description : 환불 페이지 URL
export const CANCEL_PATH = 'cancel';
export const CANCEL_DATAIL_PATH = 'detail';
export const CANCEL_REFUND_PATH = 'refund';

// description : 리뷰 페이지 URL 
export const REVIEW_PATH = 'review';
export const REVIEW_LIST_PATH = 'list';
export const REVIEW_DATAIL_PATH = '/:reviewNumber';
export const REVIEW_WRITE_PATH = 'write/:userId';
export const REVIEW_UPDATE_PATH = 'update/:userId';
export const REVIEW_DELETE_PATH = 'delete/:userId';

// description : regist 통합 !!!!!!!!!!!!!!!!!!!
export const REGIST_PATH = 'regist';

// description : 공지사항 페이지 URL
export const NOTICE_PATH = 'notice';
export const NOTICE_LIST_PATH = 'list';
export const NOTICE_DETAIL_PATH = ':noticeNumber';

// description : 문의사항 페이지 URL
export const QNA_PATH = 'qna';
export const QNA_LIST_PATH = 'list';
export const QNA_DETAIL_PATH = ':qnaNumber';
// export const QNA_REGIST_PATH = 'regist';
export const QNA_UPDATE_PATH = 'update/:qnaNumber';

// description : 자주하는 질문 페이지 URL
export const FAQ_PATH = 'faq';
export const FAQ_LIST_PATH = 'list';

// description : 마이 페이지 URL
export const MY_PAGE_PATH = 'my-page';
export const MY_PAGE_INFO_PATH = 'info';
export const USER_PASSWORD_UPDATE_PATH = 'password-update';
export const USER_EMAIL_UPDATE_PATH = 'email-update';
export const MY_PAGE_INFO_UPDATE_PATH = 'update/:userId';
export const MY_PAGE_INFO_DELETE_PATH = 'delete/:userId';
export const MY_PAGE_QNA_LIST_PATH = 'qna/list';

// description : 쿠폰 
export const MY_PAGE_COUPON_PATH = 'coupon';

// description : 내 주문 내역 페이지 URL
export const MY_ORDER_PATH = 'order';
export const MY_ORDER_DATAIL_PATH = 'detail';

// description : 관리자 페이지 URL
export const ADMIN_PATH = 'admin';
export const ADMIN_LIST_PATH = 'list';

// description : 관리자 - 회원관리
export const ADMIN_USER_PATH = 'user';
export const ADMIN_USER_DETAIL_PATH = ':nickname';
export const ADMIN_ORDER_PATH = 'order';
export const ADMIN_COUPON_PATH = 'coupon';

// description : 관리자 - 상품관리
export const ADMIN_CLOTH_PATH = 'cloth';


// description : 관리자 - 공지사항
export const ADMIN_BOARD_NOTICE_PATH = 'notice';
// export const ADMIN_NOTICE_REGIST_PATH = 'regist';
export const ADMIN_NOTICE_UPDATE_PATH = 'update/:noticeNumber';

// description : 관리자 - 문의사항 답변
export const ADMIN_QNA_COMMENT_PATH = 'comment';

// description : 관리자 - 자주하는 질문
export const ADMIN_FAQ_PATH = 'faq';
// export const ADMIN_FAQ_REGIST_PATH = 'regist';
export const ADMIN_FAQ_UPDATE_PATH = 'update/:faqNumber';

// description: Navigation 절대 URL PATH 
export const MAIN_ABSOLUTE_PATH = MAIN_PATH;

// description: 회원가입 절대 URL PATH 
export const SIGN_IN_ABSOLUTE_PATH = `${MAIN_PATH}/${AUTH_PATH}/${SIGN_IN_PATH}`;
export const SIGN_UP_ABSOLUTE_PATH = `${MAIN_PATH}/${AUTH_PATH}/${SIGN_UP_PATH}`;
export const FIND_ID_ABSOLUTE_PATH = `${MAIN_PATH}/${AUTH_PATH}/${FIND_ID_PATH}`;
export const FIND_PASSWORD_ABSOLUTE_PATH = `${MAIN_PATH}/${AUTH_PATH}/${FIND_PASSWORD_PATH}`;
// export const FIND_PASSWORD_RESET_ABSOLUTE_PATH = (userId : string) => `${MAIN_PATH}/${AUTH_PATH}/${FIND_PASSWORD_PATH}/${userId}`;
export const FIND_PASSWORD_RESET_ABSOLUTE_PATH = `${MAIN_PATH}/${AUTH_PATH}/${FIND_PASSWORD_RESET_PATH}`;

// description: 마이페이지 절대 URL PATH 
export const MY_PAGE_INFO_ABSOLUTE_PATH = `${MAIN_PATH}/${MY_PAGE_PATH}/${MY_PAGE_INFO_PATH}`;
export const MY_PAGE_INFO_UPDATE_ABSOLUTE_PATH = (userId : string) => `${MAIN_PATH}/${MY_PAGE_PATH}/update/${userId}`;
export const USER_PASSWORD_UPDATE_ABSOLUTE_PATH = `${MAIN_PATH}/${MY_PAGE_PATH}/${USER_PASSWORD_UPDATE_PATH}`;
export const USER_EMAIL_UPDATE_ABSOLUTE_PATH = `${MAIN_PATH}/${MY_PAGE_PATH}/${USER_EMAIL_UPDATE_PATH}`;
export const MY_PAGE_INFO_DELETE_ABSOLUTE_PATH = (userId : string) => `${MAIN_PATH}/${MY_PAGE_PATH}/delete/${userId}`;
export const MY_PAGE_COUPON_ABSOLUTE_PATH = `${MAIN_PATH}/${MY_PAGE_PATH}/${MY_PAGE_COUPON_PATH}`;
export const MY_PAGE_QNA_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${MY_PAGE_PATH}/${QNA_PATH}/${QNA_LIST_PATH}`;

// description: 옷 상세 리스트 절대 URL PATH
export const CLOTH_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${CLOTH_PATH}/list`;
export const CLOTH_CATEGORY1_LIST_ABSOLUTE_PATH = (category1: string) => `${MAIN_PATH}/${CLOTH_PATH}/list/${category1}`;
export const CLOTH_SEARCH_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${CLOTH_PATH}/list/search`;

// description: 옷 주문 페이지 URL PATH
export const CLOTH_INFO_ABSOLUTE_PATH = (clothId: number) => `${MAIN_PATH}/${CLOTH_PATH}/${CLOTH_LIST_PATH}/info/${clothId}`;
export const CLOTH_INFO_UPDATE_ABSOLUTE_PATH = (clothId: number) => `${MAIN_PATH}/${CLOTH_PATH}/${CLOTH_LIST_PATH}/update/${clothId}`;

// description: 공지사항 절대 URL PATH 
// ???? NOTICE_LIST 뺌
export const NOTICE_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${NOTICE_PATH}/list`;
export const NOTICE_DETAIL_ABSOLUTE_PATH = (noticeNumber : string | number) => `${MAIN_PATH}/${NOTICE_PATH}/${noticeNumber}` ;

// description: 문의사항 절대 URL PATH 
export const QNA_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${QNA_PATH}/${QNA_LIST_PATH}`;
export const QNA_DETAIL_ABSOLUTE_PATH = (qnaNumber : number | string) => `${MAIN_PATH}/${QNA_PATH}/${qnaNumber}`;
export const QNA_REGIST_ABSOLUTE_PATH = `${MAIN_PATH}/${QNA_PATH}/${REGIST_PATH}`;
export const QNA_UPDATE_ABSOLUTE_PATH = (qnaNumber : number | string) => `${MAIN_PATH}/${QNA_PATH}/update/${qnaNumber}`;

// description: 자주하는 질문 절대 URL PATH 
export const FAQ_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${FAQ_PATH}/list`;
export const FAQ_DETAIL_ABSOLUTE_PATH = (faqNumber : string | number) => `${MAIN_PATH}/${FAQ_PATH}/list/${faqNumber}` ;

// description : 관리자 - 공지사항 절대 URL PATH
export const ADMIN_NOTICE_REGIST_ABSOLUTE_PATH = `${MAIN_PATH}/${ADMIN_PATH}/${NOTICE_PATH}/${REGIST_PATH}`;
export const ADMIN_NOTICE_UPDATE_ABSOLUTE_PATH = (noticeNumber : string | number) => `${MAIN_PATH}/${ADMIN_PATH}/${NOTICE_PATH}/update/${noticeNumber}`;
export const ADMIN_NOTICE_DELETE_ABSOLUTE_PATH = (noticeNumber : string | number) => `${MAIN_PATH}/${ADMIN_PATH}/${NOTICE_PATH}/delete/${noticeNumber}`;

// description : 관리자 - 문의사항 절대 URL PATH
export const QNA_COMMENT_ABSOLUTE_PATH = (qnaNumber : number) => `${MAIN_PATH}/${QNA_PATH}/${qnaNumber}/${ADMIN_QNA_COMMENT_PATH}`;

// description : 관리자 - 자주하는 질문 절대 URL PATH
export const ADMIN_FAQ_REGIST_ABSOLUTE_PATH = `${MAIN_PATH}/${ADMIN_PATH}/${FAQ_PATH}/${REGIST_PATH}`;
export const ADMIN_FAQ_UPDATE_ABSOLUTE_PATH = (faqNumber : number | string) => `${MAIN_PATH}/${ADMIN_PATH}/${FAQ_PATH}/update/${faqNumber}`;
export const ADMIN_FAQ_DELETE_ABSOLUTE_PATH = (faqNumber : number | string) => `${MAIN_PATH}/${FAQ_PATH}/delete/${faqNumber}`;

// description : 관리자페이지 절대 URL PATH
export const ADMIN_USER_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${ADMIN_PATH}/${ADMIN_USER_PATH}/list`;
export const ADMIN_USER_ASC_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${ADMIN_PATH}/${ADMIN_USER_PATH}/list/asc`;
export const ADMIN_CLOTH_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${ADMIN_PATH}/${ADMIN_CLOTH_PATH}/list`;
export const ADMIN_ORDER_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${ADMIN_PATH}/${ADMIN_ORDER_PATH}/list`;
export const ADMIN_COUPON_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${ADMIN_PATH}/${ADMIN_COUPON_PATH}/list`;
export const ADMIN_USER_DETAIL_ABSOLUTE_PATH = (nickname: string) => `${MAIN_PATH}/${ADMIN_PATH}/${ADMIN_USER_PATH}/${nickname}`;

// description : 관리자페이지 절대 URL PATH (사이드바를 위해)
export const ADMIN_USER_MANAGE_ABSOLUTE_PATH = `${MAIN_PATH}/${ADMIN_PATH}/${ADMIN_USER_PATH}`;
export const ADMIN_CLOTH_MANAGE_ABSOLUTE_PATH = `${MAIN_PATH}/${ADMIN_PATH}/${ADMIN_CLOTH_PATH}`;
export const ADMIN_ORDER_MANAGE_ABSOLUTE_PATH = `${MAIN_PATH}/${ADMIN_PATH}/${ADMIN_ORDER_PATH}`;
export const ADMIN_COUPON_MANAGE_ABSOLUTE_PATH = `${MAIN_PATH}/${ADMIN_PATH}/${ADMIN_COUPON_PATH}`;


// description: API URL PATH
export const SERVER_DOMAIN_URL ='http://localhost:4000';
export const SERVER_API_URL = `${SERVER_DOMAIN_URL}/api/shop`;

// description: AUTH 모듈 내의 기능 URL
export const SERVER_AUTH_MODULE_URL = `${SERVER_API_URL}/auth`;

export const POST_SIGN_IN_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/sign-in`;
export const SNS_SIGN_IN_REQUEST_URL = (type: string) => `${SERVER_AUTH_MODULE_URL}/oauth2/${type}`;
export const POST_ID_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/id-check`;
export const POST_NICKNAME_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/nickname-check`;
export const POST_EMAIL_AUTH_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/email-auth`;
export const POST_EMAIL_AUTH_CHECK_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/email-auth-check`;
export const POST_SIGN_UP_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/sign-up`;
export const POST_FIND_ID_EMAIL_AUTH_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/find-id-email-auth`;
export const POST_FIND_ID_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/find-id`;
export const POST_FIND_PASSWORD_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/find-password`;
export const PUT_FIND_PASSWORD_RESET_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/find-password-reset`;

// description: USER 모듈 내의 기능 URL
export const SERVER_USER_MODULE_URL = `${SERVER_API_URL}/user`;

export const GET_USER_INFO_REQUEST_URL = `${SERVER_USER_MODULE_URL}/`;
export const GET_MY_INFO_REQUEST_URL = `${SERVER_USER_MODULE_URL}/info`;
export const PATCH_MY_INFO_UPDATE_REQUEST_URL = (userId: string) => `${SERVER_USER_MODULE_URL}/info-update/${userId}`;
export const PUT_MY_INFO_PASSWORD_MODIFY_REQUEST_URL = `${SERVER_USER_MODULE_URL}/info/password-modify`;
export const PUT_MY_INFO_EMAIL_MODIFY_REQUEST_URL = `${SERVER_USER_MODULE_URL}/info/email-modify`;
export const POST_MY_INFO_DELETE_REQUEST_URL = (userId: string) => `${SERVER_USER_MODULE_URL}/info-delete/${userId}`;
export const GET_MY_QNA_LIST_URL = `${SERVER_USER_MODULE_URL}/qna/list`;

// description : 옷 주문 상세페이지 모듈 내의 기능 URL
export const SERVER_CLOTH_INFO_MODULE_URL = `${SERVER_API_URL}/cloth-info`;
export const GET_CLOTH_INFO_URL = (clothId : string | number) => `${SERVER_CLOTH_INFO_MODULE_URL}/${clothId}`;
export const POST_CLOTH_INFO_URL = `{SERVER_CLOTH_INFO_MODULE_URL}/order`;

// description : 옷 상세 전체 리스트 URL
export const SERVER_CLOTH_MODULE_URL = `${SERVER_API_URL}/cloth`;
export const GET_CLOTH_LIST_URL = `${SERVER_CLOTH_MODULE_URL}/list`;
export const GET_BEST_CLOTH_LIST_URL = `${SERVER_CLOTH_MODULE_URL}/list/best`;
export const GET_BEST_CLOTH_CATEGORY1_LIST_URL = (category1: string) => `${SERVER_CLOTH_MODULE_URL}/list/category1/${category1}/best`;
export const GET_CLOTH_CATEGORY1_LIST_URL = (category1: string) => `${SERVER_CLOTH_MODULE_URL}/list/category1/${category1}`;
export const GET_PRICE_ASC_CLOTH_CATEGORY1_LIST_URL = (category1: string) => `${SERVER_CLOTH_MODULE_URL}/list/category1/${category1}/price-asc`;
export const GET_PRICE_DESC_CLOTH_CATEGORY1_LIST_URL = (category1: string) => `${SERVER_CLOTH_MODULE_URL}/list/category1/${category1}/price-desc`;
export const GET_CLOTH_SEARCH_LIST_URL = `${SERVER_CLOTH_MODULE_URL}/list/search`;
export const GET_CLOTH_CATEGORY2_LIST_URL = (category2: string) => `${SERVER_CLOTH_MODULE_URL}/list/category2/${category2}`;
export const GET_PRICE_ASC_CLOTH_CATEGORY2_LIST_URL = (category2: string) => `${SERVER_CLOTH_MODULE_URL}/list/category2/${category2}/price-asc`;
export const GET_PRICE_DESC_CLOTH_CATEGORY2_LIST_URL = (category2: string) => `${SERVER_CLOTH_MODULE_URL}/list/category2/${category2}/price-desc`;

// description: FAVORITE 모듈 내의 기능 URL
export const SERVER_FAVORITE_MODULE_URL = `${SERVER_CLOTH_INFO_MODULE_URL}/favorite`;
export const GET_FAVORITE_LIST_URL = `${SERVER_FAVORITE_MODULE_URL}/list`;
export const POST_FAVORITE_REQUEST_URL = (clothId: number | string) => `${SERVER_FAVORITE_MODULE_URL}/${clothId}`;
export const DELETE_FAVORITE_REQUEST_URL = (clothId: number | string) => `${SERVER_FAVORITE_MODULE_URL}/${clothId}`;
export const GET_FAVORITE_CHECK_REQUEST_URL = (clothId: number | string) => `${SERVER_FAVORITE_MODULE_URL}/${clothId}`;

// description: order 모듈 내의 기능 URL
export const SERVER_ORDER_MODULE_URL = `${SERVER_CLOTH_INFO_MODULE_URL}/order`;
export const POST_ORDER_REQUEST_URL = (clothNumber: number | string) => `${SERVER_ORDER_MODULE_URL}/${clothNumber}`;

// description : 공지사항 모듈 내의 기능 URL
export const SERVER_NOTICE_MODULE_URL = `${SERVER_API_URL}/notice`;
export const GET_NOTICE_LIST_URL = `${SERVER_NOTICE_MODULE_URL}/list`;
export const GET_NOTICE_DETAIL_URL = (noticeNumber: number | string) => `${GET_NOTICE_LIST_URL}/${noticeNumber}`;
export const POST_NOTICE_URL = `${SERVER_NOTICE_MODULE_URL}/regist`;
export const PUT_NOTICE_URL = (noticeNumber: number | string) => `${SERVER_NOTICE_MODULE_URL}/${noticeNumber}/modify`;
export const INCREASE_NOTICE_VIEW_COUNT_URL = (noticeNumber: number | string) => `${SERVER_NOTICE_MODULE_URL}/${noticeNumber}/increase-view-count`;
export const DELETE_NOTICE_URL = (noticeNumber: number | string) => `${SERVER_NOTICE_MODULE_URL}/${noticeNumber}/delete`;

// description : 문의사항 모듈 내의 기능 URL
export const SERVER_QNA_MODULE_URL = `${SERVER_API_URL}/qna`;
export const GET_QNA_LIST_URL = `${SERVER_QNA_MODULE_URL}/list`;
export const GET_SEARCH_QNA_LIST_URL = `${GET_QNA_LIST_URL}/search`;
export const GET_QNA_CATEGORY_LIST_URL = (qnaCategory: string) => `${GET_QNA_LIST_URL}/category/${qnaCategory}`;
export const GET_QNA_CATEGORY_SEARCH_LIST_URL= (qnaCategory: string) => `${GET_QNA_LIST_URL}/category/${qnaCategory}/search`;
export const GET_QNA_DETAIL_URL = (qnaNumber: number | string) => `${SERVER_QNA_MODULE_URL}/list/${qnaNumber}`;
export const POST_QNA_URL = `${SERVER_QNA_MODULE_URL}/regist`;
export const PUT_QNA_COMMENT_URL = (qnaNumber: number | string) => `${SERVER_QNA_MODULE_URL}/${qnaNumber}/comment`;
export const PUT_QNA_URL = (qnaNumber: number | string) => `${SERVER_QNA_MODULE_URL}/${qnaNumber}/modify`;
export const DELETE_QNA_URL = (qnaNumber: number | string) => `${SERVER_QNA_MODULE_URL}/${qnaNumber}/delete`;

// description : 자주하는 질문 모듈 내의 기능 URL
export const SERVER_FAQ_MODULE_URL = `${SERVER_API_URL}/faq`;
export const GET_FAQ_LIST_URL = `${SERVER_FAQ_MODULE_URL}/list`;
export const GET_FAQ_CATEGORY_LIST_URL = (faqCategory: string) => `${GET_FAQ_LIST_URL}/category/${faqCategory}`;
export const GET_FAQ_DETAIL_URL = (faqNumber: number | string) => `${GET_FAQ_LIST_URL}/${faqNumber}`;
export const POST_FAQ_URL = `${SERVER_FAQ_MODULE_URL}/regist`;
export const PUT_FAQ_URL = (faqNumber: number | string) => `${SERVER_FAQ_MODULE_URL}/${faqNumber}/modify`;
export const DELETE_FAQ_URL = (faqNumber: number | string) => `${SERVER_FAQ_MODULE_URL}/${faqNumber}/delete`;

// description : 관리자페이지 회원관리
// export const SERVER_ADMIN_MODULE_URL = `${SERVER_API_URL}/admin`;
export const SERVER_USER_MANAGE_MODULE_URL = `${SERVER_API_URL}/user/admin`;
export const GET_ADMIN_USER_LIST_URL = `${SERVER_USER_MANAGE_MODULE_URL}/list/desc`;
export const GET_ADMIN_USER_ASC_LIST_URL = `${SERVER_USER_MANAGE_MODULE_URL}/list/asc`;
export const GET_ADMIN_USER_ID_SEARCH_LIST_URL = `${SERVER_USER_MANAGE_MODULE_URL}/list/userId/search`;
export const GET_ADMIN_USER_NAME_SEARCH_LIST_URL = `${SERVER_USER_MANAGE_MODULE_URL}/list/userName/search`;
export const GET_ADMIN_USER_GRADE_SEARCH_LIST_URL = `${SERVER_USER_MANAGE_MODULE_URL}/list/grade/search`;
export const GET_ADMIN_USER_DETAIL_URL = (nickname: string) => `${SERVER_USER_MANAGE_MODULE_URL}/list/${nickname}`
// description : 관리자페이지 상품관리
export const SERVER_CLOTH_MANAGE_MODULE_URL = `${SERVER_API_URL}/cloth/admin`;
export const GET_ADMIN_CLOTH_LIST_URL = `${SERVER_CLOTH_MANAGE_MODULE_URL}/list`;
export const GET_ADMIN_CLOTH_DETAIL_URL = (clothId: string) => `${SERVER_CLOTH_MANAGE_MODULE_URL}/${clothId}`;

// description: PAGE
export const COUNT_PER_PAGE = 10;
export const COUNT_PER_SECTION = 10;
export const COUNT_RESERVATION_PAGE = 6;
export const COUNT_CLOTH_LIST_PAGE = 16;

export const ITEM_PER_PAGE1 = 8;
export const ITEM_PER_PAGE2 = 5;

// description : IMAGE
export const IMAGE_URL = `${SERVER_DOMAIN_URL}/upload`;