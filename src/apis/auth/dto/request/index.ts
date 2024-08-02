// description: 로그인 Request Body DTO 
export interface SignInRequestDto {
    userId : string;
    userPassword : string;
}

// description: 아이디 중복확인 Request Body DTO 
export interface IdCheckRequestDto {
    userId : string;
}

// description: 닉네임 중복확인 Request Body DTO 
export interface NicknameCheckRequestDto {
    nickname : string;
}

// description: 이메일 인증 Request Body DTO 
export interface EmailAuthRequestDto {
    userEmail : string;
}

// description: 이메일 인증 확인 Request Body DTO 
export interface EmailAuthCheckRequestDto {
    userEmail : string;
    authNumber : string;
}

// description: 회원가입 Request Body DTO 
export interface SignUpRequestDto {
    userId : string;
    password : string;
    userName : string;
    nickname : string;
    userEmail : string;
    authNumber : string;
    // userAddress : string;
    userBirthDay : string;
    joinPath : string;
    snsId : string | null;
    joinDate : string | null;
}

// description: 아이디 찾기 Request Body DTO 
export interface FindIdRequestDto {
    userName : string;
    userEmail : string;
    authNumber : string;
}

// description: 비밀번호 찾기 Request Body DTO 
export interface FindPasswordRequestDto {
    userId : string;
    userName : string;
    userEmail : string;
    authNumber : string;
}

// description: 비밀번호 재설정 Request Body DTO 
export interface FindPasswordResetRequestDto {
    userPassword : string;
}

