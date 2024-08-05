import ResponseDto from "../../../response.dto";

// description: 로그인 유저 정보 반환 Response Body DTO
// export interface GetUserInfoResponseDto extends ResponseDto {
//   userEmailId: string;
//   nickname: string;
//   userName: string;
//   userTelNumber: string;
//   userAddress: string;
//   userRole: string;
// }

// description: 내 정보 불러오기 Response Body DTO
export interface GetMyInfoResponseDto extends ResponseDto{
  userId: string;
  userName: string;
  nickname: string;
  userEmail: string;
  userRole: string;
  joinPath: String;
  joinDate : String;
}

// description: 내 정보 수정하기 Response Body DTO
// export interface PatchUserInfoResponseDto extends ResponseDto{
//   nickname: string;
//   userEmailId: string;
//   userName: string;
//   userTelNumber: string;
//   userAddress: string;
//   userRole: string;
//   joinPath: String;
// }