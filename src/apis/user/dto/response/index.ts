import ResponseDto from "../../../response.dto";

// description: 로그인 유저 정보 반환 Response Body DTO
export interface GetSignInUserResponseDto extends ResponseDto {
  userId: string;
  nickname: string;
  userRole: string;
}

// description: 내 정보 불러오기 Response Body DTO
export interface GetMyInfoResponseDto extends ResponseDto{
  userId: string;
  userName: string;
  nickname: string;
  userEmail: string;
  userBirthDay: string;
  userRole: string;
  joinPath: String;
  joinDate : String;
  grade: 'VVIP' | 'VIP' | 'Red' | 'Orange' | 'Yellow' | 'White';
  points: number;
}

// description: 내 정보 수정하기 Response Body DTO
export interface PatchUserInfoResponseDto extends ResponseDto{
  password: string;
  nickname: string;
  userEmail: string;
  userBirthDay: string;
  userRole: string;
  joinPath: String;
}

// description: 나의 Q&A 전체 게시물 리스트 불러오기 Response Body DTO
// export interface GetMyInfoQnaListResponseDto extends ResponseDto {
//   qnaList: QnaListItem[];
// }