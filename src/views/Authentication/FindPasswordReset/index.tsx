import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router";
import { emailAuthCheckRequest, findPasswordResetRequest } from "src/apis/auth";
import { EmailAuthCheckRequestDto, FindPasswordResetRequestDto } from "src/apis/auth/dto/request";
import ResponseDto from "src/apis/response.dto";
import InputBox from "src/components/InputBox";
import { SIGN_IN_ABSOLUTE_PATH } from "src/constant";
import "./style.css";

export default function FindPasswordReset() {
  // const { userId } = useParams();

  const [userEmail, setUserEmail] = useState<string>('');
  const [authNumber, setAuthNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [isEqualPassword, setEqualPassword] = useState<boolean>(false);
  const [isPasswordPattern, setPasswordPattern] = useState<boolean>(false);
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');

  const [authNumberMessage, setAuthNumberMessage] = useState<string>('');
  const [isAuthNumberError, setAuthNumberError] = useState<boolean>(false);
  const [isAuthNumberCheck, setAuthNumberCheck] = useState<boolean>(false);
  const [authNumberButtonStatus, setAuthNumberButtonStatus] = useState<boolean>(false);


  const isFindPasswordActive = isPasswordPattern && isEqualPassword && userEmail && authNumber;
  const findPasswordResetButtonClass = `${isFindPasswordActive ? 'primary' : 'disable'}-button full-width`;

  const navigator = useNavigate();

  const emailAuthCheckResponse = (result: ResponseDto | null) => {
    const authNumberMessage =
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'VF' ? '인증번호를 입력해주세요.' :
      result.code === 'AF' ? '인증번호가 일치하지 않습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' :
      result.code === 'SU' ? '인증번호가 확인되었습니다.' : '';

    const authNumberCheck = result !== null && result.code === 'SU';
    const authNumberError = !authNumberCheck;

    setAuthNumberMessage(authNumberMessage);
    setAuthNumberCheck(authNumberCheck);
    setAuthNumberError(authNumberError);
  };

  const findPasswordResetResponse = (result: ResponseDto | null) => {
    const message = !result ? '서버에 문제가 있습니다.' :
      result.code === 'VF' ? '입력 형식이 맞지 않습니다.' :
      result.code === 'AF' ? '사용자 정보와 불일치 합니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccess = result && result.code === 'SU';
    if (!isSuccess) {
      alert(message);
    } else {
      alert('비밀번호가 성공적으로 변경되었습니다.');
      navigator(SIGN_IN_ABSOLUTE_PATH);
    }
  };

  const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };

  const onAuthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAuthNumber(value);
    setAuthNumberButtonStatus(value !== '');
    setAuthNumberCheck(false);
    setAuthNumberMessage('');
  };

  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);

    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/;
    const isPasswordPattern = passwordPattern.test(value);
    setPasswordPattern(isPasswordPattern);

    const passwordMessage = isPasswordPattern ? '' : 
      value ? '영문, 숫자를 혼용하여 8 ~ 13자 입력해주세요.' : '';
    setPasswordMessage(passwordMessage);

    const isEqualPassword = passwordCheck === value;
    setEqualPassword(isEqualPassword);

    const passwordCheckMessage = isEqualPassword ? '' : 
      passwordCheck ? '비밀번호가 일치하지 않습니다.' : '';
    setPasswordCheckMessage(passwordCheckMessage);
  };

  const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPasswordCheck(value);

    const isEqualPassword = password === value;
    setEqualPassword(isEqualPassword);

    const passwordCheckMessage = isEqualPassword ? '' : 
      value ? '비밀번호가 일치하지 않습니다.' : '';
    setPasswordCheckMessage(passwordCheckMessage);
  };

  const onPasswordKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    onFindPasswordResetButtonClickHandler();
  };

  const onAuthNumberButtonClickHandler = () => {
    if (!authNumberButtonStatus || !authNumber) return;

    const requestBody: EmailAuthCheckRequestDto = {
      userEmail: userEmail,
      authNumber
    };

    emailAuthCheckRequest(requestBody).then(emailAuthCheckResponse);
  };

  const onFindPasswordResetButtonClickHandler = () => {
    if (!isFindPasswordActive ) return;
    alert('비밀번호가 성공적으로 변경되었습니다.');

    const requestBody: FindPasswordResetRequestDto = { userEmail, authNumber, password };
    findPasswordResetRequest(requestBody).then(findPasswordResetResponse);
  };

  return (
    <div id="authentication-wrapper">
      <div className="title-text">비밀번호 재설정</div>
      <div className='authentication-sign-up'>
        <InputBox 
          label="이메일" 
          type="text" 
          value={userEmail} 
          placeholder="이메일을 입력해주세요" 
          onChangeHandler={onEmailChangeHandler} 
        />
          <InputBox
            label="인증번호"
            type="text"
            value={authNumber}
            placeholder="인증번호 4자리를 입력해주세요"
            onChangeHandler={onAuthNumberChangeHandler}
            buttonTitle="인증 확인"
            buttonStatus={authNumberButtonStatus}
            onButtonClickHandler={onAuthNumberButtonClickHandler}
            message={authNumberMessage}
            error={isAuthNumberError}
          />
        <InputBox 
          label="비밀번호" 
          type="password" 
          value={password} 
          placeholder="새 비밀번호를 입력해주세요" 
          onChangeHandler={onPasswordChangeHandler} 
          message={passwordMessage} 
          error 
        />
        <InputBox 
          label="비밀번호 확인" 
          type="password" 
          value={passwordCheck} 
          placeholder="새 비밀번호를 입력해주세요" 
          onChangeHandler={onPasswordCheckChangeHandler} 
          onkeydownhandler={onPasswordKeydownHandler} 
          message={passwordCheckMessage} 
          error 
        />
        <div className="authentication-button-container">
          <div className={findPasswordResetButtonClass} onClick={onFindPasswordResetButtonClickHandler}>확인</div>
        </div>
      </div>
    </div>
  );
}
