// description : Navigation URL PATH
// description : 메인 페이지 URL
export const MAIN_PATH = '/shop';

// description : 인증 페이지 URL
export const AUTH_PATH = 'auth';
export const SIGN_IN_PATH = 'sign-in';
export const SIGN_UP_PATH = 'sign-up';
export const FIND_ID_PATH = 'find-id';
export const FIND_PASSWORD_PATH = 'find-password';
export const FIND_PASSWORD_RESET_PATH = 'find-password-reset/:userId';
export const SNS_PATH = 'sns/:accessToken/:expires';

// description : 옷 페이지 URL 
export const CLOTH_PATH = 'cloth';
export const CLOTH_LIST_PATH = 'list';
export const CLOTH_INFO_PATH = 'info';
export const CLOTH_INFO_REGIST_PATH = 'regist';
export const CLOTH_INFO_UPDATE_PATH = 'update';

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
export const QNA_DELETE_PATH = 'delete/:qnaNumber'

// description : 자주하는 질문 페이지 URL
export const FAQ_PATH = 'faq';

// description : 마이 페이지 URL
export const MY_PAGE_PATH = 'my-page';
export const MY_PAGE_INFO_PATH = 'info';
export const MY_PAGE_INFO_UPDATE_PATH = 'update/:userId';
export const MY_PAGE_INFO_DELETE_PATH = 'delete/:userId';

// description : 쿠폰 
export const MY_PAGE_COUPON_PATH = 'coupon';

// description : 내 주문 내역 페이지 URL
export const MY_ORDER_PATH = 'order';
export const MY_ORDER_DATAIL_PATH = 'detail';

// description : 관리자 페이지 URL
export const ADMIN_PATH = 'admin';

// description : 관리자 - 회원관리
export const ADMIN_USER_PATH = 'user';
export const ADMIN_USER_DATAIL_PATH = ':userId';
export const ADMIN_PRODUCT_PATH = 'product';
export const ADMIN_ORDER_PATH = 'order';

// description : 관리자 - 공지사항
export const ADMIN_BOARD_NOTICE_PATH = 'notice';
export const ADMIN_NOTICE_REGIST_PATH = 'regist';
export const ADMIN_NOTICE_UPDATE_PATH = 'update/:noticeNumber';
export const ADMIN_NOTICE_DELETE_PATH = 'delete';

// description : 관리자 - 문의사항 답변
export const ADMIN_QNA_COMMENT_PATH = 'comment';

// description : 관리자 - 문의사항 답변
// export const ADMIN_FAQ_REGIST_PATH = 'regist';
export const ADMIN_FAQ_UPDATE_PATH = 'update/:faqNumber';
export const ADMIN_FAQ_DELETE_PATH = 'delete/:faqNumber';

// description: Navigation 절대 URL PATH 
export const MAIN_ABSOLUTE_PATH = MAIN_PATH;

// description: 회원가입 절대 URL PATH 
export const SIGN_IN_ABSOLUTE_PATH = `${MAIN_PATH}/${AUTH_PATH}/${SIGN_IN_PATH}`;
export const SIGN_UP_ABSOLUTE_PATH = `${MAIN_PATH}/${AUTH_PATH}/${SIGN_UP_PATH}`;
export const FIND_ID_ABSOLUTE_PATH = `${MAIN_PATH}/${AUTH_PATH}/${FIND_ID_PATH}`;
export const FIND_PASSWORD_ABSOLUTE_PATH = `${MAIN_PATH}/${AUTH_PATH}/${FIND_PASSWORD_PATH}`;
export const FIND_PASSWORD_RESET_ABSOLUTE_PATH = (userId : string) => `${MAIN_PATH}/${AUTH_PATH}/find-password-reset/${userId}`;

// description: 마이페이지 URL PATH 
export const MY_PAGE_INFO_ABSOLUTE_PATH = `${MAIN_PATH}/${MY_PAGE_PATH}/${MY_PAGE_INFO_PATH}`;
export const MY_PAGE_INFO_UPDATE_ABSOLUTE_PATH = (userId : string) => `${MAIN_PATH}/${MY_PAGE_PATH}/update/${userId}`;
export const MY_PAGE_DELETE_ABSOLUTE_PATH = (userId : string) => `${MAIN_PATH}/${MY_PAGE_PATH}/delete/${userId}`;

// description: 공지사항 절대 URL PATH 
// ???? NOTICE_LIST 뺌
export const NOTICE_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${NOTICE_PATH}`;
export const NOTICE_DETAIL_ABSOLUTE_PATH = (noticeNumber : string | number) => `${MAIN_PATH}/${NOTICE_PATH}/${noticeNumber}` ;

// description: 문의사항 절대 URL PATH 
export const QNA_LIST_ABSOLUTE_PATH = `${MAIN_PATH}/${QNA_PATH}/${QNA_LIST_PATH}`;
export const QNA_DETAIL_ABSOLUTE_PATH = (qnaNumber : number) => `${MAIN_PATH}/${QNA_PATH}/${qnaNumber}`;
export const QNA_REGIST_ABSOLUTE_PATH = `${MAIN_PATH}/${QNA_PATH}/${REGIST_PATH}`;
export const QNA_UPDATE_ABSOLUTE_PATH = (qnaNumber : number) => `${MAIN_PATH}/${QNA_PATH}/${QNA_UPDATE_PATH}/${qnaNumber}`;
export const QNA_DELETE_ABSOLUTE_PATH = (qnaNumber : number) => `${MAIN_PATH}/${QNA_PATH}/${QNA_DELETE_PATH}/${qnaNumber}`;

// description: 자주하는 질문 절대 URL PATH 
export const FAQ_ABSOLUTE_PATH = `${MAIN_PATH}/${FAQ_PATH}`;

// description : 관리자 - 공지사항 절대 URL PATH
export const ADMIN_NOTICE_REGIST_ABSOLUTE_PATH = `${MAIN_PATH}/${ADMIN_PATH}/${NOTICE_PATH}/${REGIST_PATH}`;
export const ADMIN_NOTICE_UPDATE_ABSOLUTE_PATH = (noticeNumber : string | number) => `${MAIN_PATH}/${ADMIN_PATH}/${NOTICE_PATH}/update/${noticeNumber}`;
export const ADMIN_NOTICE_DELETE_ABSOLUTE_PATH = (noticeNumber : string | number) => `${MAIN_PATH}/${ADMIN_PATH}/${NOTICE_PATH}/${ADMIN_NOTICE_DELETE_PATH}/${noticeNumber}`;

// description : 관리자 - 문의사항 절대 URL PATH
export const QNA_COMMENT_ABSOLUTE_PATH = (qnaNumber : number) => `${MAIN_PATH}/${QNA_PATH}/${QNA_DETAIL_PATH}/${qnaNumber}/${ADMIN_QNA_COMMENT_PATH}`;

// description : 관리자 - 자주하는 질문 절대 URL PATH
export const FAQ_REGIST_ABSOLUTE_PATH = `${MAIN_PATH}/${ADMIN_PATH}/${FAQ_PATH}/${REGIST_PATH}`;
export const FAQ_UPDATE_ABSOLUTE_PATH = (faqNumber : number) => `${MAIN_PATH}/${ADMIN_PATH}/${FAQ_PATH}/${ADMIN_FAQ_UPDATE_PATH}/${faqNumber}`;
export const FAQ_DELETE_ABSOLUTE_PATH = (faqNumber : number) => `${MAIN_PATH}/${FAQ_PATH}/${ADMIN_FAQ_DELETE_PATH}/${faqNumber}`;

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
export const POST_FIND_ID_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/find-id`;
export const POST_FIND_PASSWORD_REQUEST_URL = `${SERVER_AUTH_MODULE_URL}/find-password`;
export const PATCH_FIND_PASSWORD_RESET_REQUEST_URL = (userId: string) => `${POST_FIND_PASSWORD_REQUEST_URL}/${userId}`;

// description: USER 모듈 내의 기능 URL
export const SERVER_USER_MODULE_URL = `${SERVER_API_URL}/user`;

export const GET_USER_INFO_REQUEST_URL = `${SERVER_USER_MODULE_URL}/`;
export const GET_MY_INFO_URL_REQUEST_URL = `${SERVER_USER_MODULE_URL}/info`;
export const PATCH_MY_INFO_UPDATE_URL_REQUEST_URL = (userId: string) => `${SERVER_USER_MODULE_URL}/info/update/${userId}`;
export const PATCH_MY_INFO_PASSWORD_MODIFY_REQUEST_URL = `${SERVER_USER_MODULE_URL}/info/password-modify`;
export const PATCH_MY_INFO_EMAIL_MODIFY_REQUEST_URL = `${SERVER_USER_MODULE_URL}/info/email-modify`;
export const DELETE_MY_INFO_URL = (userId: string) => `${SERVER_USER_MODULE_URL}/info/delete/${userId}`;

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
export const GET_QNA_DETAIL_URL = (qnaNumber: number | string) => `${SERVER_QNA_MODULE_URL}/list/${qnaNumber}`;
export const GET_MY_QNA_DETAIL_URL = `${SERVER_QNA_MODULE_URL}/mylist`;
export const POST_QNA_URL = `${SERVER_QNA_MODULE_URL}/regist`;
export const POST_QNA_COMMENT_URL = (qnaNumber: number | string) => `${SERVER_QNA_MODULE_URL}/${qnaNumber}/comment`;
export const PUT_QNA_URL = (qnaNumber: number | string) => `${SERVER_QNA_MODULE_URL}/${qnaNumber}/modify`;
export const DELETE_QNA_URL = (qnaNumber: number | string) => `${SERVER_QNA_MODULE_URL}/${qnaNumber}/delete`;

// description : 자주하는 질문 모듈 내의 기능 URL
export const SERVER_FAQ_MODULE_URL = `${SERVER_API_URL}/notice`;
export const GET_FAQ_LIST_URL = `${SERVER_FAQ_MODULE_URL}/list`;
export const POST_FAQ_URL = `${SERVER_FAQ_MODULE_URL}/regist`;
export const PUT_FAQ_URL = (faqNumber: number | string) => `${SERVER_FAQ_MODULE_URL}/${faqNumber}/modify`;
export const DELETE_FAQ_URL = (faqNumber: number | string) => `${SERVER_FAQ_MODULE_URL}/${faqNumber}/delete`;

//description: PAGE
export const COUNT_PER_PAGE = 10;
export const COUNT_PER_SECTION = 10;
export const COUNT_RESERVATION_PAGE = 6;

// description : IMAGE
export const IMAGE_URL = `${SERVER_DOMAIN_URL}/upload`;