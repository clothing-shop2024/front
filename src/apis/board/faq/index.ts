import { bearerAuthorization, requestErrorHandler, requestHandler } from "src/apis"
import { DELETE_FAQ_URL, GET_FAQ_LIST_URL, POST_FAQ_URL, PUT_FAQ_URL } from "src/constant"
import { GetFaqListResponseDto } from "./dto/response"
import axios from "axios";
import { PostFaqRequestDto, PutFaqRequestDto } from "./dto/request";
import ResponseDto from "src/apis/response.dto";

// function : 자주하는 질문 전체 리스트 불러오기 API 함수
export const getFaqListRequest = async(accessToken: string) => {
    const result = await axios
        .get(GET_FAQ_LIST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetFaqListResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 자주하는 질문 작성 API 함수
export const postFaqReuqest = async(requestBody: PostFaqRequestDto, accessToken: string) => {
    const result = await axios
        .post(POST_FAQ_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 자주하는 질문 수정 API 함수
export const putFaqRequest = async(faqNumber: number | string, requestBody: PutFaqRequestDto, accessToken: string) => {
    const result = await axios
        .patch(PUT_FAQ_URL(faqNumber), requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};


// function : 공지사항 게시물 삭제 API 함수
export const deleteFaqRequest = async(faqNumber: number | string, accessToken: string)=>{
    const result = await axios
        .delete(DELETE_FAQ_URL(faqNumber), bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)  
        .catch(requestErrorHandler);      
    return result; 
};