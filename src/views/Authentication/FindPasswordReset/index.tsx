import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ResponseDto from "src/apis/response.dto";
import InputBox from "src/components/InputBox";
import "./style.css";

export default function FindPasswordReset() {

  //                      state                      //
  const { userId } = useParams();

  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [isEqualPassword, setEqualPassword] = useState<boolean>(false);
  const [isPasswordPattern, setPasswordPattern] = useState<boolean>(false);
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');

  const isFindPwActive = isPasswordPattern && isEqualPassword;
  const findPwResetButtonClass = `${isFindPwActive ? 'primary' : 'disable'}-button full-width`;

  //                    function                     //
  const navigator = useNavigate();

  const findPasswordResetResponse = (result: ResponseDto | null) => {
    const message =
      !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '입력 형식이 맞지 않습니다.' :
        result.code === 'AF' ? '사용자 정보와 불일치 합니다.' :
          result.code === 'DBE' ? '서버에 문제가 있습니다.' : ''

    const isSuccess = result && result.code === 'SU';

    if (!isSuccess) {
      alert(message);
    }
  };

  //                event handler                    //
  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);

    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/;
    const isPasswordPattern = passwordPattern.test(value);
    setPasswordPattern(isPasswordPattern);

    const passwordMessage =
      isPasswordPattern ? '' :
        value ? '영문, 숫자를 혼용하여 8 ~ 13자 입력해주세요.' : '';
    setPasswordMessage(passwordMessage);

    const isEqualPassword = passwordCheck === value;
    setEqualPassword(isEqualPassword);

    const passwordCheckMessage =
      isEqualPassword ? '' :
        passwordCheck ? '비밀번호가 일치하지 않습니다.' : '';
    setPasswordCheckMessage(passwordCheckMessage);
  };

  const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPasswordCheck(value);

    const isEqualPassword = password === value;
    setEqualPassword(isEqualPassword);

    const passwordCheckMessage =
      isEqualPassword ? '' :
        value ? '비밀번호가 일치하지 않습니다.' : '';
    setPasswordCheckMessage(passwordCheckMessage);
  };

  const onPasswordKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    onFindPasswordResetButtonClickHandler();
  };

  const onFindPasswordResetButtonClickHandler = () => {

    if (!isFindPwActive || !userId) return;

    if (!password || !passwordCheck) {
      alert('모든 내용을 입력해주세요.');
      return;
    };

    // const requestBody: FindPasswordResetRequestDto = { userEmail, authNumber, password };

    // findPasswordResetRequest(requestBody).then(findPasswordResetResponse);

    alert('비밀번호가 변경되었습니다.');
    // navigator(SIGN_IN_ABSOLUTE_PATH);
  };

  // render //
  return (
    <div id="authentication-wrapper">
    <div className="title-text">비밀번호 재설정</div>
    <div className='authentication-sign-up'>
        <div className='authentication-find-password'>
            <InputBox 
                label="비밀번호" 
                type="password" 
                value={password} 
                placeholder="비밀번호를 입력해주세요" 
                onChangeHandler={onPasswordChangeHandler} 
                message={passwordMessage} error />
                <InputBox label="비밀번호 확인" 
                type="password" 
                value={passwordCheck} 
                placeholder="비밀번호를 입력해주세요" 
                onChangeHandler={onPasswordCheckChangeHandler} 
                onkeydownhandler={onPasswordKeydownHandler} 
                message={passwordCheckMessage} error 
            />
        <div className="authentication-button-container">
            <div className={findPwResetButtonClass} onClick={ onFindPasswordResetButtonClickHandler }>확인</div>
        </div>
    </div>
    </div>
</div>
  )
}
