// description:  자주하는 질문 등록하기 Request Body DTO
export interface PostFaqRequestDto {
    faqQuestion: string;
    faqAnswer: string;
    faqCategory: string;
};

// description:  자주하는 질문 수정하기 Request Body DTO
export interface PutFaqRequestDto {
    faqQuestion: string;
    faqAnswer: string;
    faqCategory: string;
};
