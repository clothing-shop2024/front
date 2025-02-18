import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router";
import { emailAuthCheckRequest, FindIdEmailAuthRequest, findPasswordRequest } from "src/apis/auth";
import { EmailAuthCheckRequestDto, FindIdEmailAuthRequestDto, FindPasswordRequestDto } from "src/apis/auth/dto/request";
import { FindIdResponseDto } from "src/apis/auth/dto/response";
import ResponseDto from "src/apis/response.dto";
import InputBox from "src/components/InputBox";
import { FIND_ID_ABSOLUTE_PATH, FIND_PASSWORD_ABSOLUTE_PATH, FIND_PASSWORD_RESET_ABSOLUTE_PATH, SIGN_IN_ABSOLUTE_PATH } from "src/constant";
import "./style.css";

// component: 비밀번호 찾기 //
export default function FindPassword() {

  // state //
  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [authNumber, setAuthNumber] = useState<string>('');

  const [userNameMessage, setUserNameMessage] = useState<string>('');
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [authNumberMessage, setAuthNumberMessage] = useState<string>('');

  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [isAuthNumberError, setAuthNumberError] = useState<boolean>(false);

  const [isEmailCheck, setIsEmailCheck] = useState<boolean>(false);
  const [isAuthNumberCheck, setAuthNumberCheck] = useState<boolean>(false);

  const [emailButtonStatus, setEmailButtonStatus] = useState<boolean>(false);
  const [authNumberButtonStatus, setAuthNumberButtonStatus] = useState<boolean>(false);

  const isFindPasswordActive = userId && userName && userEmail && authNumber && isEmailCheck && isAuthNumberCheck;
  const findPasswordButtonClass = `${isFindPasswordActive ? 'primary' : 'disable'}-button full-width`;

  // function //
  const navigator = useNavigate();

  // const emailAuthResponse = (result: ResponseDto | null) => {
  //   const emailMessage =
  //     !result ? '서버에 문제가 있습니다.' :
  //     result.code === 'VF' ? '이메일 형식이 아닙니다.' :
  //     result.code === 'MF' ? '인증번호 전송에 실패했습니다.' :
  //     result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

  //   const emailCheck = result !== null && result.code === 'DE';
  //   const emailError = !emailCheck;

  //   setEmailMessage(emailMessage);
  //   setIsEmailCheck(emailCheck);
  //   setIsEmailError(emailError);

  //   if (emailCheck) {
  //     setAuthNumber(''); 
  //     setAuthNumberButtonStatus(false); 
  //     setAuthNumberMessage('');
  //   }
  // };

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

  const findIdEmailAuthCheckResponse = (result: ResponseDto | null) => {
    const emailMessage = 
        !result ? '서버에 문제가 있습니다.' : 
        result.code === 'VF' ? '이메일 형식이 아닙니다.' :
        result.code === 'NU' ? '일치하는 이메일이 없습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' :
        result.code === 'SU' ? '인증번호가 전송되었습니다.' : '';

    const findEmailCheck = result !== null && result.code === 'SU';
    const findEmailError = !findEmailCheck;

    setEmailMessage(emailMessage);
    setIsEmailCheck(findEmailCheck);
    setIsEmailError(findEmailError);
  };

  const findPasswordResponse = (result: ResponseDto | null) => {
    const message =
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'AF' ? '아이디 또는 이름 또는 이메일이 일치하지 않습니다.' :
      result.code === 'VF' ? '입력 형식이 맞지 않습니다.' :
      result.code === 'NE' ? '존재하지 않는 이메일입니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
  
      if (!result || result.code !== "SU") {
        alert(message);
        return navigator(FIND_PASSWORD_ABSOLUTE_PATH);
      }
  
      const { userId } = result as FindIdResponseDto;
      setUserId(userId);
  };

  // event handler //
  const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserId(value);
  }

  const onUserNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserName(value);
    setUserNameMessage('');
  };

  const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserEmail(value);
    setEmailButtonStatus(value !== '');
    setIsEmailCheck(false);
    setAuthNumberCheck(false);
    setEmailMessage('');
  };

  const onAuthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAuthNumber(value);
    setAuthNumberButtonStatus(value !== '');
    setAuthNumberCheck(false);
    setAuthNumberMessage('');
  };

  // const onEmailButtonClickHandler = () => {
  //   if (!emailButtonStatus) return;

  //   const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
  //   const isEmailPattern = emailPattern.test(userEmail);

  //   if (!isEmailPattern) {
  //     setEmailMessage('이메일 형식이 아닙니다.');
  //     setIsEmailError(true);
  //     setIsEmailCheck(false);
  //     return;
  //   }

  //   const requestBody: EmailAuthRequestDto = { userEmail };
  //   emailAuthRequest(requestBody).then(emailAuthResponse);
  // };

  const onAuthNumberButtonClickHandler = () => {
    if (!authNumberButtonStatus || !authNumber) return;

    const requestBody: EmailAuthCheckRequestDto = {
      userEmail: userEmail,
      authNumber
    };

    emailAuthCheckRequest(requestBody).then(emailAuthCheckResponse);
  };

  const onFindIdEmailAuthButtonClickHandler = () => {

    const requestBody: FindIdEmailAuthRequestDto = { userName, userEmail };

    FindIdEmailAuthRequest(requestBody).then(findIdEmailAuthCheckResponse);
  };

  const onFindPasswordButtonClickHandler = () => {
    if (!emailButtonStatus) return;

    const requestBody: FindPasswordRequestDto = {
      userId,
      userName,
      userEmail,
      authNumber
    };

    findPasswordRequest(requestBody).then(findPasswordResponse);
    navigator(FIND_PASSWORD_RESET_ABSOLUTE_PATH);
  };

  const onSignInClickHandler = () => navigator(SIGN_IN_ABSOLUTE_PATH);
  const onFindIdInputClickHandler = () => navigator(FIND_ID_ABSOLUTE_PATH);
  const onPasswordKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    onFindPasswordButtonClickHandler();
  };

  // render //
  return (
    <div id="authentication-wrapper">
      <div className="title-text">비밀번호 찾기</div>
      <div className='authentication-find-password'>
        <div className='authentication-contents'>
          <InputBox
            label="아이디"
            type="text"
            value={userId}
            placeholder="아이디를 입력해주세요"
            onChangeHandler={onIdChangeHandler}
          />
          <InputBox
            label="이름"
            type="text"
            value={userName}
            placeholder="이름을 입력해주세요"
            onChangeHandler={onUserNameChangeHandler}
            message={userNameMessage}
            onkeydownhandler={onPasswordKeydownHandler}
          />
          <InputBox
            label="이메일"
            type="text"
            value={userEmail}
            placeholder="이메일을 입력해주세요"
            onChangeHandler={onEmailChangeHandler}
            buttonTitle='이메일 인증'
            buttonStatus={emailButtonStatus}
            onButtonClickHandler={onFindIdEmailAuthButtonClickHandler}
            message={emailMessage}
            error={isEmailError}
            onkeydownhandler={onPasswordKeydownHandler}
          />
          {isEmailCheck &&
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
          }
        </div>
        <div className='moving-find-password'>
          <div className={findPasswordButtonClass} onClick={onFindPasswordButtonClickHandler}>비밀번호 찾기</div>
        </div>
        <div className='moving-find-id-password'>
          <div className='moving-find' onClick={onFindIdInputClickHandler}>아이디 찾기</div>
          <div>{'/'}</div>
          <div className='moving-find' onClick={onSignInClickHandler}>로그인</div>
        </div>
      </div>
    </div>
  );
}
