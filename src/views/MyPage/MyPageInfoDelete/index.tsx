import { ChangeEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import ResponseDto from "src/apis/response.dto";
import { deleteUserRequest } from "src/apis/user";
import InputBox from "src/components/InputBox";
import { MAIN_ABSOLUTE_PATH } from "src/constant";
import useUserStore from "src/stores/user.store";
import "./style.css";

// component: 회원탈퇴
export default function MyPageInfoDelete() {

    // state //
    const [cookies, setCookie, removeCookie] = useCookies();

    const { userId } = useParams();
    const [password, setPassword] = useState<string>('');
    const {setLoginUserId, setLoginUserRole} = useUserStore();
    const [passwordMessage, setPasswordMessage] = useState<string>('');

    // function //
    const navigator = useNavigate();
  
    const deleteUserResponse = (result: ResponseDto | null) => {
      const message =
          !result ? '서버에 문제가 있습니다.' :
          result.code === 'AF' ? '권한이 없습니다.' :
          result.code === 'VF' ? '올바르지 않은 접근입니다.' :
          result.code === 'NI' ? '존재하지 않는 유저정보입니다.' :
          result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

      if (!result || result.code !== 'SU'){
          alert(message);
          return;
      };
      alert('회원탈퇴가 성공하였습니다.');

      removeCookie('accessToken', { path: '/' });
      navigator(MAIN_ABSOLUTE_PATH);
      setLoginUserId("");
      setLoginUserRole("");
      window.location.reload();
  };

     // event handler //
  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setPassword(password);

    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/;
    const isPasswordPattern = passwordPattern.test(password);

    const passwordMessage = 
      isPasswordPattern ? '' :
      password ? '영문, 숫자를 혼용하여 8~13자 입력해주세요.' : '';
    setPasswordMessage(passwordMessage);
  };

  const onDeleteButtonClickHandler = () => {
    if (!userId || !cookies.accessToken) return;

    const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
    if (!isConfirm) return;

    const requestBody = { password }; // 비밀번호 포함
    deleteUserRequest(requestBody, cookies.accessToken, userId).then(deleteUserResponse);
};

  // effect //
  useEffect(() => {
  if (!cookies.accessToken || !userId) return;
}, [cookies.accessToken]);

  return (
    <div id='resign-wrapper'>
    <div className='resign-container'>
      <div className='resign-title'>회원 탈퇴</div>
      <div className='resign-box'>
        <div className='resign-content caution-title'>회원 탈퇴 시 주의사항!</div>
        <div className='resign-content caution-contents'>1. 회원 정보 및 모든 게시물(리뷰, 문의) 삭제 처리됨
          <p>
            회원탈퇴 즉시 아래에 해당하는 개인정보가 삭제됩니다.
            <br />
            개인정보 : 이메일 계정, 비밀번호, 휴대폰번호, 생일, 성별 정보 삭제
          </p>
        </div>
      </div>
      <div className='resign-password'>
        <InputBox label="비밀번호 재입력" type="password" value={password} placeholder="비밀번호를 입력해주세요." onChangeHandler={onPasswordChangeHandler} message={passwordMessage} error />
      </div>
      <div className='delete-button' onClick={onDeleteButtonClickHandler}>회원 탈퇴하기</div>
    </div>
  </div>
  )
}
