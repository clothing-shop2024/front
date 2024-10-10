import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import ResponseDto from "src/apis/response.dto";
import { getMyInfoRequest, patchUserInfoRequest } from "src/apis/user";
import { PatchUserInfoRequestDto } from "src/apis/user/dto/request";
import { GetMyInfoResponseDto, PatchUserInfoResponseDto } from "src/apis/user/dto/response";
import InputBox from "src/components/InputBox";
import { MAIN_ABSOLUTE_PATH, MY_PAGE_INFO_ABSOLUTE_PATH, MY_PAGE_INFO_UPDATE_ABSOLUTE_PATH } from "src/constant";
import useUserStore from "src/stores/user.store";
import "./style.css";

// component : 마이페이지 //
export default function MyPageInfoUpdate() {

  // state //
  const [cookies] = useCookies();
  const { loginUserRole } = useUserStore();
  const [userRole, setUserRole] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userBirthDay, setUserBirthDay] = useState<string>('');
  const [joinDate, setJoinDate] = useState<string>('');


  // function //
  const navigator = useNavigate();

  const getMyInfoResponse = (result: GetMyInfoResponseDto | ResponseDto | null) => {
    const message =
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'AF' ? '인증에 실패했습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
        alert(message);

        if (result?.code === 'AF') {
            navigator(MAIN_ABSOLUTE_PATH);
            return;
        };
        
        return;
    };

    const { userId, userName, nickname, userEmail, userBirthDay } = result as GetMyInfoResponseDto;
    setUserId(userId);
    setUserName(userName);
    setNickname(nickname);
    setUserEmail(userEmail);
    setUserBirthDay(userBirthDay);
    setUserRole(userRole);
    setJoinDate(joinDate);
};

const PatchUpdateUserInfoResponse = (result: PatchUserInfoResponseDto | ResponseDto | null) => {
  const message =
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'AF' ? '인증에 실패했습니다.' :
      result.code === 'NU' ? '사용자 정보가 일치하지 않습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccess = result && result.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }

    alert('정보가 성공적으로 수정되었습니다.');
    navigator(MY_PAGE_INFO_UPDATE_ABSOLUTE_PATH(userId));
};

  // event handler //

  const onUserNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const userName = event.target.value;
    setNickname(userName);
  };

  const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const nickname = event.target.value;
    setNickname(nickname);
  };

  const onUserBirthDayChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const userBirthDay = event.target.value;
    setNickname(userBirthDay);
  };

  const onUpdateButtonClickHandler = () => {
    if (!cookies.accessToken || !userId) return;

    const requestBody: PatchUserInfoRequestDto = { userName, nickname, userBirthDay };
    patchUserInfoRequest(userId, requestBody, cookies.accessToken).then(PatchUpdateUserInfoResponse);
  };

  const onMyPageInfoClickHandler = () => navigator(MY_PAGE_INFO_ABSOLUTE_PATH);
  const onMyPageInfoUpdateClickHandler = (userId:string) => navigator(MY_PAGE_INFO_UPDATE_ABSOLUTE_PATH(userId));

  // effect //
  let effectFlag = useRef(false);

  useEffect(() => {
    if (!cookies.accessToken) return;
    getMyInfoRequest(cookies.accessToken).then(getMyInfoResponse);
  }, []);
  
  useEffect(() => {
    if (!cookies.accessToken) return;
    if (!loginUserRole) return;
    if (effectFlag.current) return;
    effectFlag.current = true;
    if (loginUserRole !== 'ROLE_USER') {
      navigator(MAIN_ABSOLUTE_PATH);
      return;
    }
    getMyInfoRequest(cookies.accessToken).then(getMyInfoResponse);
  }, []);

  // render //
  return (
    <div id='my-page-update-wrapper'>
      <div className='my-page-update-container'>

      <div className="my-page-info-top">
          <div className="my-page-info-top-title" onClick={onMyPageInfoClickHandler}>마이페이지</div>
          <div className="my-page-info-top-title" onClick={() => onMyPageInfoUpdateClickHandler(userId)}>회원정보 수정</div>
        </div>

        <div className='short-divider-bottom-line'></div>
        <div className='my-page-update-container'>
          <div className='my-page-update-contents-title'>회원정보 수정</div>
          <div className='my-page-update-contents-box'>

            <div className='my-page-update-info-box'>
              <div className='my-page-update-info-left'>아이디</div>
              <div className='my-page-update-info'>{userId}</div>
            </div>
          
            <div className='my-page-update-info-box'>
              <div className='my-page-update-info-left'>비밀번호</div>
              <div className='my-page-update-info'>{password}</div>
            </div>

            <div className='my-page-update-info-box'>
              <div className='my-page-update-info-left'>이름</div>
              <div className='my-page-input-box'>
                <InputBox type='text' value={userName} placeholder='이름을 입력해주세요.' onChangeHandler={onUserNameChangeHandler} />
              </div>
            </div>

            <div className='my-page-update-info-box'>
              <div className='my-page-update-info-left'>닉네임</div>
              <div className='my-page-input-box'>
                <InputBox type='text' value={nickname} placeholder='닉네임을 입력해주세요.' onChangeHandler={onNicknameChangeHandler} />
              </div>
            </div>

            <div className='my-page-update-info-box'>
              <div className='my-page-update-info-left'>이메일</div>
              <div className='my-page-update=info'>{userEmail}</div>
            </div>

            <div className='my-page-update-info-box'>
              <div className='my-page-update-info-left'>생년월일</div>
              <div className='my-page-input-box'>
                <InputBox type='text' value={userBirthDay} placeholder='생년월일을 입력해주세요.' onChangeHandler={onUserBirthDayChangeHandler} />
              </div>
            </div>

          </div>
          <div className='my-page-update-button' onClick={onUpdateButtonClickHandler}>수정</div>
          <div className='my-page-delete-button'>회원탈퇴</div>
        </div>
      </div>
    </div>
  )
}
