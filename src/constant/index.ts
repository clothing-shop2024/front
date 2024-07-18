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

// description: Navigation 절대 URL PATH 
export const MAIN_ABSOLUTE_PATH = MAIN_PATH;

// 회원가입 - 로그인 페이지
export const SIGN_IN_ABSOLUTE_PATH = `${AUTH_PATH}/${SIGN_IN_PATH}`;
export const SIGN_UP_ABSOLUTE_PATH = `${AUTH_PATH}/${SIGN_UP_PATH}`;
export const FIND_ID_ABSOLUTE_PATH = `${AUTH_PATH}/${FIND_ID_PATH}`;
export const FIND_PASSWORD_ABSOLUTE_PATH = `${AUTH_PATH}/${FIND_PASSWORD_PATH}`;
export const FIND_PASSWORD_RESET_ABSOLUTE_PATH = (userId : string) => `${AUTH_PATH}/find-password-reset/${userId}`;

// description: API URL PATH
export const SERVER_DOMAIN_URL = process.env.REACT_APP_REST_API_SERVER;
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