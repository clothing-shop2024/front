// description : Navigation URL PATH
export const MAIN_PATH = '/main';
export const SNS_PATH = '/sns/:accessToken/:expires';

// 회원가입 - 로그인 페이지
export const AUTH_PATH = '/authentication';
export const SIGN_IN_PATH = 'sign-in';
export const SIGN_UP_PATH = 'sign-up';
export const FIND_ID_PATH = 'find-id';
export const FIND_PASSWORD_PATH = 'find-password';
export const FIND_PASSWORD_RESET_PATH = '/find-password-reset/:userId';

// 공지사항
export const NOTICE_PATH = 'notice';
export const NOTICE_DETAIL_PATH = '/:noticeNumber';

// 문의사항
export const QNA_PATH = 'qna';
export const QNA_DETAIL_PATH = '/:qnaNumber';
export const QNA_REGIST_PATH = 'regist';
export const QNA_UPDATE_PATH = 'update/:qnaNumber';

// 자주하는 질문
export const FREQUENT_QNA_PATH = 'frequent-qna';

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