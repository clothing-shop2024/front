import axios from "axios";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import { GET_ADMIN_USER_ASC_LIST_URL, GET_ADMIN_USER_DETAIL_URL, GET_ADMIN_USER_GRADE_SEARCH_LIST_URL, GET_ADMIN_USER_ID_SEARCH_LIST_URL, GET_ADMIN_USER_LIST_URL, GET_ADMIN_USER_NAME_SEARCH_LIST_URL, GET_MY_INFO_REQUEST_URL, GET_MY_QNA_LIST_URL, GET_USER_INFO_REQUEST_URL, PATCH_MY_INFO_UPDATE_REQUEST_URL, POST_EMAIL_AUTH_REQUEST_URL, POST_MY_INFO_DELETE_REQUEST_URL, PUT_MY_INFO_EMAIL_MODIFY_REQUEST_URL, PUT_MY_INFO_PASSWORD_MODIFY_REQUEST_URL } from "../../constant";
import ResponseDto from "../response.dto";
import { DeleteUserRequestDto, EmailAuthRequestDto, PatchUserInfoRequestDto, PutMyInfoEmailRequestDto, PutMyInfoPasswordRequestDto } from "./dto/request";
import { GetAdminUserListResponseDto, GetMyInfoResponseDto, GetMyQnaListResponseDto, GetSignInUserResponseDto, } from "./dto/response";

// function: 로그인 유저 정보 불러오기 API 함수
export const getSignInUserRequest = async (accessToken: string) => {
    const result = await axios
        .get(GET_USER_INFO_REQUEST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetSignInUserResponseDto>)
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

// function: 내 정보 불러오기 API 함수
export const getMyInfoRequest = async (accessToken: string) => {
    const result = await axios
        .get(GET_MY_INFO_REQUEST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetMyInfoResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 회원정보 수정 API 함수 
export const patchUserInfoRequest = async (userId: string, requestBody: PatchUserInfoRequestDto,  accessToken: string) => {
    const result = await axios.patch(PATCH_MY_INFO_UPDATE_REQUEST_URL(userId), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 내정보 패스워드 수정 API 함수
export const putMyInfoPwRequest = async (requestBody: PutMyInfoPasswordRequestDto, accessToken: string) => {
    const result = await axios
        .put(PUT_MY_INFO_PASSWORD_MODIFY_REQUEST_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
return result;
};

// function: 내정보 이메일 수정 API 함수
export const putMyInfoEmailRequest = async (requestBody: PutMyInfoEmailRequestDto, accessToken: string) => {
    const result = await axios
        .put(PUT_MY_INFO_EMAIL_MODIFY_REQUEST_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
return result;
};

// function: 내 정보 삭제하기 API 함수 
export const deleteUserRequest = async (requestBody: DeleteUserRequestDto, accessToken: string, userId: string) => {
    const result = await axios
        .post(POST_MY_INFO_DELETE_REQUEST_URL(userId), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
return result;
};

// function : 마이페이지 Q&A 전체 리스트 불러오기 API 함수
export const getMyQnaListRequest = async(accessToken: string) => {
    const result = await axios
        .get(GET_MY_QNA_LIST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetMyQnaListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 관리자페이지 최신 회원순 회원 관리 리스트 불러오기 API 함수
export const getUserListRequest = async(accessToken: string) => {
    const result = await axios
        .get(GET_ADMIN_USER_LIST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetAdminUserListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 관리자페이지 오래된 회원순 회원 관리 리스트 불러오기 API 함수
export const getUserAscListRequest = async(accessToken: string) => {
    const result = await axios
        .get(GET_ADMIN_USER_ASC_LIST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetAdminUserListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 관리자페이지 회원 아이디로 검색 리스트 불러오기 API 함수
export const getUserIdSearchListRequest = async(accessToken: string, word: string) => {
    const config = { 
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        params: { word } 
    }
    
    const result = await axios
        .get(GET_ADMIN_USER_ID_SEARCH_LIST_URL, config)
        .then(requestHandler<GetAdminUserListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 관리자페이지 회원 이름으로 검색 리스트 불러오기 API 함수
export const getUserNameSearchListRequest = async(accessToken: string, word: string) => {
    const config = { 
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        params: { word } 
    }
    
    const result = await axios
        .get(GET_ADMIN_USER_NAME_SEARCH_LIST_URL, config)
        .then(requestHandler<GetAdminUserListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 관리자페이지 회원 등급으로 검색 리스트 불러오기 API 함수
export const getUserGradeSearchListRequest = async(accessToken: string, word: string) => {
    const config = { 
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        params: { word } 
    }
    
    const result = await axios
        .get(GET_ADMIN_USER_GRADE_SEARCH_LIST_URL, config)
        .then(requestHandler<GetAdminUserListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function: 관리자페이지 회원 상세 정보 불러오기 API 함수
export const getUserDetailRequest = async (accessToken: string, nickname: string) => {
    const result = await axios
        .get(GET_ADMIN_USER_DETAIL_URL(nickname), bearerAuthorization(accessToken))
        .then(requestHandler<GetMyInfoResponseDto>)
        .catch(requestErrorHandler);
    return result;
};
