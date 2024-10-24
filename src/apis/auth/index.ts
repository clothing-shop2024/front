import axios from "axios";
import { requestErrorHandler, requestHandler } from "../";
import { POST_EMAIL_AUTH_CHECK_REQUEST_URL, POST_EMAIL_AUTH_REQUEST_URL, POST_FIND_ID_EMAIL_AUTH_REQUEST_URL, POST_FIND_ID_REQUEST_URL, POST_FIND_PASSWORD_REQUEST_URL, POST_ID_CHECK_REQUEST_URL, POST_NICKNAME_CHECK_REQUEST_URL, POST_SIGN_IN_REQUEST_URL, POST_SIGN_UP_REQUEST_URL } from "../../constant";
import { PUT_FIND_PASSWORD_RESET_REQUEST_URL } from '../../constant/index';
import ResponseDto from "../response.dto";
import { EmailAuthCheckRequestDto, EmailAuthRequestDto, FindIdEmailAuthRequestDto, FindIdRequestDto, FindPasswordRequestDto, FindPasswordResetRequestDto, IdCheckRequestDto, NicknameCheckRequestDto, SignInRequestDto, SignUpRequestDto } from "./dto/request";
import { FindIdResponseDto, SignInResponseDto } from "./dto/response";

// function : 로그인 API 함수
export const signInRequest = async (requestBody: SignInRequestDto) => {
    const result = await axios
        .post(POST_SIGN_IN_REQUEST_URL, requestBody)
        .then(requestHandler<SignInResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 아이디 중복 확인 API 함수
export const IdCheckRequest = async (requestBody: IdCheckRequestDto) => {
    const result = await axios
        .post(POST_ID_CHECK_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 닉네임 중복 확인 API 함수
export const NicknameCheckRequest = async (requestBody: NicknameCheckRequestDto) => {
    const result = await axios
        .post(POST_NICKNAME_CHECK_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 이메일 인증 API 함수
export const emailAuthRequest = async (requestBody: EmailAuthRequestDto) => {
    const result = await axios
        .post(POST_EMAIL_AUTH_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 이메일 인증 확인 API 함수
export const emailAuthCheckRequest = async (requestBody: EmailAuthCheckRequestDto) => {
    const result = await axios
        .post(POST_EMAIL_AUTH_CHECK_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 회원가입 API 함수
export const signUpRequest = async (requestBody: SignUpRequestDto) => {
    const result = await axios
        .post(POST_SIGN_UP_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 아이디 인증 확인 API 함수
export const FindIdEmailAuthRequest = async (requestBody: FindIdEmailAuthRequestDto) => {
    const result = await axios
        .post(POST_FIND_ID_EMAIL_AUTH_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 아이디 찾기 API 함수
export const findIdRequest = async (requestBody: FindIdRequestDto) => {
    const result = await axios
        .post(POST_FIND_ID_REQUEST_URL, requestBody)
        .then(requestHandler<FindIdResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 비밀번호 찾기 API 함수
export const findPasswordRequest = async (requestBody: FindPasswordRequestDto) => {
    const result = await axios
        .post(POST_FIND_PASSWORD_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 비밀번호 찾기 비밀번호 재설정 API 함수
export const findPasswordResetRequest = async (requestBody: FindPasswordResetRequestDto) => {
    const result = await axios
        .put(PUT_FIND_PASSWORD_RESET_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};