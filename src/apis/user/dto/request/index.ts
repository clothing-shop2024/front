// description: 이메일 인증 Request Body DTO 
export interface EmailAuthRequestDto {
    userEmail: string;
}

// description: 내정보 비밀번호 수정 Request Body DTO
export interface PutMyInfoPasswordRequestDto {
    password: string;
}

// description: 내정보 이메일 수정 Request Body Dto 
export interface PutMyInfoEmailRequestDto {
    userEmail: string;
    authNumber: string;
}

// description: 회원정보 수정 Request Body DTO
export interface PatchUserInfoRequestDto {
    // password: string;
    userEmail: string;
    nickname: string;
    // userAddress: string;
    userBirthDay: string;
}

// description: 회원 탈퇴 Request Body DTO
export interface DeleteUserRequestDto {
    password: string;
}