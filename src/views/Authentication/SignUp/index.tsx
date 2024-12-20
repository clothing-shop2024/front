import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { emailAuthCheckRequest, emailAuthRequest, IdCheckRequest, NicknameCheckRequest, signUpRequest } from "../../../apis/auth";
import { EmailAuthCheckRequestDto, EmailAuthRequestDto, IdCheckRequestDto, NicknameCheckRequestDto, SignUpRequestDto } from "../../../apis/auth/dto/request";
import ResponseDto from "../../../apis/response.dto";
import InputBox from "../../../components/InputBox";
import { SIGN_IN_ABSOLUTE_PATH } from "../../../constant";
import { getYYYYMMDD } from "src/utils";
import "./style.css";
import useAuthStore from "src/stores/auth.store";
import { termsOfUse, personalInformation, shoppingInformation } from "src/utils"

//                    component : 회원가입               //
export default function SignUp() {

    //                      state                      //
    const [searchParam ] = useSearchParams();
    
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [authNumber, setAuthNumber] = useState<string>('');

    const today = new Date();
    const [birthDay, setBirthDay] = useState<string | null>(null);
    const { setUserBirthDay } = useAuthStore();
    const dateInputRef = useRef<HTMLInputElement>(null);
    const [isSolarCalendar, setIsSolarCalendar] = useState<boolean>(true);

    const [idButtonStatus, setIdButtonStatus] = useState<boolean>(false);
    const [NicknameButtonStatus, setNicknameButtonStatus] = useState<boolean>(false);
    const [emailButtonStatus, setEmailButtonStatus] = useState<boolean>(false);
    const [authNumberButtonStatus, setAuthNumberButtonStatus] = useState<boolean>(false);

    const [isIdCheck, setIdCheck] = useState<boolean>(false);
    const [isEqualPassword, setEqualPassword] = useState<boolean>(false);
    const [isPasswordPattern, setPasswordPattern] = useState<boolean>(false);
    const [isNicknameCheck, setNicknameCheck] = useState<boolean>(false);
    const [isEmailCheck, setEmailCheck] = useState<boolean>(false);
    const [isEmailPattern, setEmailPattern] = useState<boolean>(false);
    const [isAuthNumberCheck, setAuthNumberCheck] = useState<boolean>(false);
    const [isBirthdayChecked, setIsBirthdayChecked] = useState(false);
    const [isAllTermsChecked, setIsAllTermsChecked] = useState(false);
    const [termsChecked, setTermsChecked] = useState({
        termsOfUse: false,
        personalInformation: false,
        shoppingInformation: false,
    });

    const [idMessage, setIdMessage] = useState<string>('');
    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
    const [userNameMessage, setUserNameMessage] = useState<string>('');
    const [NicknameMessage, setNicknameMessage] = useState<string>('');
    const [emailMessage, setEmailMessage] = useState<string>('');
    const [authNumberMessage, setAuthNumberMessage] = useState<string>('');

    const [isIdError, setIdError] = useState<boolean>(false);
    const [isNicknameError, setNicknameError] = useState<boolean>(false);
    const [isEmailError, setEmailError] = useState<boolean>(false);
    const [isAuthNumberError, setAuthNumberError] = useState<boolean>(false);

    const isSignUpActive = isIdCheck && isEqualPassword && isPasswordPattern && isNicknameCheck && isEmailCheck && isEmailPattern && isAuthNumberCheck &&
    (!isBirthdayChecked || !!birthDay) && termsChecked.termsOfUse && termsChecked.personalInformation;
    const signUpButtonClass = `${isSignUpActive ? 'primary' : 'disable'}-button full-width`;

    //                    function                    //
    const navigator = useNavigate();

    const idCheckResponse = (result: ResponseDto | null) => {
        const idMessage = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '아이디는 빈 값 혹은 공백으로만 이루어질 수 없습니다.' :
            result.code === 'DI' ?  '이미 사용중인 아이디입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' :
            result.code === 'SU' ? '사용 가능한 아이디입니다.' : '';
            
        const idError = !(result && result.code === 'SU');
        const idCheck = !idError;

        setIdMessage(idMessage);
        setIdError(idError);
        setIdCheck(idCheck);
    };

    const NicknameCheckResponse = (result: ResponseDto | null) => {
        const NicknameMessage = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '닉네임은 빈 값 혹은 공백으로만 이루어질 수 없습니다.' :
            result.code === 'DN' ?  '이미 사용중인 닉네임입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' :
            result.code === 'SU' ? '사용 가능한 닉네임입니다.' : '';

        const NicknameError = !(result && result.code === 'SU');
        const NicknameCheck = !NicknameError;

        setNicknameMessage(NicknameMessage);
        setNicknameError(NicknameError);
        setNicknameCheck(NicknameCheck);
    };

    const emailAuthResponse = (result: ResponseDto | null) => {
        const emailMessage = 
            !result ? '서버에 문제가 있습니다.' : 
            result.code === 'VF' ? '이메일 형식이 아닙니다.' :
            result.code === 'DE' ? '중복된 이메일입니다.' :
            result.code === 'MF' ? '인증번호 전송에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : 
            result.code === 'SU' ? '인증번호가 전송되었습니다.' : '';

        const emailCheck = result !== null && result.code === 'SU';
        const emailError = !emailCheck;

        setEmailMessage(emailMessage);
        setEmailCheck(emailCheck);
        setEmailError(emailError);
    };

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

    const signUpResponse = (result: ResponseDto | null) => {
        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '입력 형식이 맞지 않습니다.' : 
            result.code === 'DI' ? '이미 사용중인 아이디입니다.' :
            result.code === 'DE' ? '중복된 이메일입니다.' :
            result.code === 'AF' ? '인증번호가 일치하지 않습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : ''

        const isSuccess = result && result.code === 'SU';
        if (!isSuccess) {
            alert(message);
            return;
        }

    };

    //                    event handler                //
    const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setId(value);
        setIdButtonStatus(value !== '');
        setIdCheck(false);
        setIdMessage('');
    };

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

    const onUserNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserName(value);
        setUserNameMessage('');
    };

    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setNickname(value);
        setNicknameButtonStatus(value !== '');
        setNicknameCheck(false);
        setNicknameMessage('');
    };

    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserEmail(value);
        setEmailButtonStatus(value !== '');
        setEmailCheck(false);
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

    const onIdButtonClickHandler = () => {
        if(!idButtonStatus || !id || !id.trim()) return;

        const requestBody: IdCheckRequestDto = { userId: id };
        IdCheckRequest(requestBody).then(idCheckResponse);
    };

    const onNicknameButtonClickHandler = () => {
        if(!NicknameButtonStatus || !nickname || !nickname.trim()) return;

        const requestBody: NicknameCheckRequestDto = { nickname: nickname };
        NicknameCheckRequest(requestBody).then(NicknameCheckResponse);
    };

    const onEmailButtonClickHandler = () => {
        if(!emailButtonStatus) return;

        const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
        const isEmailPattern = emailPattern.test(userEmail);
        setEmailPattern(isEmailPattern);

        if (!isEmailPattern) {
            setEmailMessage('이메일 형식이 아닙니다.');
            setEmailError(true);
            setEmailCheck(false);
            return;
        };

        const requestBody: EmailAuthRequestDto = { userEmail: userEmail };
        emailAuthRequest(requestBody).then(emailAuthResponse);
    };

    const onAuthNumberButtonClickHandler = () => {
        if(!authNumberButtonStatus || !authNumber) return;

        const requestBody: EmailAuthCheckRequestDto = {
            userEmail: userEmail,
            authNumber
        };

        emailAuthCheckRequest(requestBody).then(emailAuthCheckResponse);
    };
    
    const onBirthdayCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        setIsBirthdayChecked(checked);

        if (!checked) {
            setBirthDay(null);
            setUserBirthDay(null);
            setIsSolarCalendar(true);
        }
    };

    const onBirthdayChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        if (isBirthdayChecked) {
            setBirthDay(value);
            setUserBirthDay(value);
        }
    };

    const handleSolarLunarChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        if (isBirthdayChecked) {
            setIsSolarCalendar(value === "solar");
        }
    };

    const onAllTermsChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;

        setIsAllTermsChecked(isChecked);
        setTermsChecked({
            termsOfUse: isChecked,
            personalInformation: isChecked,
            shoppingInformation: isChecked,
        });
    }

    const onTermChangeHandler = (event: ChangeEvent<HTMLInputElement>, term: string) => {
        const isChecked = event.target.checked;
        const updatedTerms = { ...termsChecked, [term]: isChecked };
        setTermsChecked(updatedTerms);
        setIsAllTermsChecked(Object.values(updatedTerms).every((value) => value));
    };

    const onSignUpButtonClickHandler = () => {
        if (!isSignUpActive) return;

        if (!id || !password || !passwordCheck || !userName || !nickname || !userEmail || !authNumber ) {
            alert('모든 내용을 입력해주세요.');
            return;
        } else {
            if (isBirthdayChecked == true) {
                if (!birthDay) {
                    alert('모든 내용을 입력해주세요.');
                    return;
                }
            }
        }

        alert('회원가입에 성공하였습니다.')
    
        let joinPath = searchParam.get('joinPath');

        joinPath = joinPath === null ? 'HOME' : joinPath;

        const joinDate = searchParam.get('joinDate');

        const requestBody: SignUpRequestDto = {
            userId: id,
            password: password,
            userName: userName,
            nickname: nickname,
            userEmail: userEmail,
            authNumber: authNumber,
            userBirthDay: isBirthdayChecked ? birthDay : null,
            solarLunarCalendar: isBirthdayChecked ? isSolarCalendar : null,
            joinPath,
            joinDate
        };
        
        signUpRequest(requestBody).then(signUpResponse);
        console.log(requestBody);

        navigator(SIGN_IN_ABSOLUTE_PATH);
    };

    //                    render                       //

    return (
        <div id="authentication-wrapper">
            <div className="authentication-title">회원가입</div>
            <div className="authentication-sign-up">
                <div className="authentication-contents">
                    <div className="authentication-input-container">
                        <InputBox 
                            label="아이디" 
                            type="text" 
                            value={id} 
                            placeholder="아이디를 입력해주세요" 
                            onChangeHandler={onIdChangeHandler} 
                            buttonTitle="중복 확인" 
                            buttonStatus={idButtonStatus} 
                            onButtonClickHandler={onIdButtonClickHandler} 
                            message={idMessage} 
                            error={isIdError} 
                        />
                        <InputBox 
                            label="비밀번호" 
                            type="password" 
                            value={password} 
                            placeholder="비밀번호를 입력해주세요" 
                            onChangeHandler={onPasswordChangeHandler} 
                            message={passwordMessage} error 
                        />
                        <InputBox 
                            label="비밀번호 확인" 
                            type="password" 
                            value={passwordCheck} 
                            placeholder="비밀번호를 입력해주세요"
                            onChangeHandler={onPasswordCheckChangeHandler} 
                            message={passwordCheckMessage} error 
                        />
                        <InputBox 
                            label="이름"
                            type="text" 
                            value={userName} 
                            placeholder="이름을 입력해주세요" 
                            onChangeHandler={ onUserNameChangeHandler }
                            message={userNameMessage} 
                            error 
                        />
                        <InputBox 
                            label="닉네임"
                            type="text" 
                            value={nickname} 
                            placeholder="닉네임을 입력해주세요" 
                            onChangeHandler={ onNicknameChangeHandler } 
                            buttonTitle="중복 확인" 
                            buttonStatus={NicknameButtonStatus} 
                            onButtonClickHandler={onNicknameButtonClickHandler} 
                            message={NicknameMessage} 
                            error={isNicknameError} 
                        />
                        <InputBox 
                            label="이메일" 
                            type="text" 
                            value={userEmail} 
                            placeholder="이메일을 입력해주세요" 
                            onChangeHandler={onEmailChangeHandler} 
                            buttonTitle="이메일 인증" 
                            buttonStatus={emailButtonStatus} 
                            onButtonClickHandler={onEmailButtonClickHandler} 
                            message={emailMessage} 
                            error={isEmailError} 
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
                        <div className="authentication-birthday">
                            <div className="authentication-birthday-check-box">
                                <div className="authentication-birthday-title">생년월일</div>
                                <input
                                    type="checkbox"
                                    checked={isBirthdayChecked}
                                    onChange={onBirthdayCheckChangeHandler}
                                />
                            </div>
                            {isBirthdayChecked && (
                            <div className="authentication-birthday-solar">
                                <input
                                    className="date-calender"
                                    ref={dateInputRef}
                                    type="date"
                                    max={getYYYYMMDD(today)}
                                    onChange={onBirthdayChangeHandler}
                                />
                                <div className="authentication-solar-lunar-select">
                                    <label>
                                        <input 
                                        type="radio"
                                        name="solarLunar"
                                        value="true"
                                        checked={isSolarCalendar !== null ? isSolarCalendar : undefined}
                                        onChange={handleSolarLunarChange}
                                         /> 양력
                                    </label>
                                    <label>
                                        <input 
                                        type="radio"
                                        name="solarLunar"
                                        value="false"
                                        checked={!isSolarCalendar}
                                        onChange={handleSolarLunarChange}
                                         /> 음력
                                    </label>
                                </div>
                            </div>
                        )}
                            
                        </div>
                        
                    </div>

                    <div className="sign-up-terms">
                        <div className="terms-agree">
                            <input
                                type="checkbox"
                                checked={isAllTermsChecked}
                                onChange={onAllTermsChangeHandler}
                            />&nbsp;
                            전체 약관 동의
                        </div>
                        <div className="terms-title">[필수]이용약관</div>
                        <div className="terms">{termsOfUse}</div>
                        <div className="terms-agree">
                            이용약관에 동의하십니까?
                            &nbsp;
                            <input
                                type="checkbox"
                                checked={termsChecked.termsOfUse}
                                onChange={(e) => onTermChangeHandler(e, "termsOfUse")}
                            />&nbsp;
                            동의함
                        </div>
                        <div className="terms-title">[필수]개인정보 수집 및 이용 동의</div>
                        <div className="terms">{personalInformation}</div>
                        <div className="terms-agree">
                            개인정보 수집 및 이용에 동의하십니까?
                            &nbsp;
                            <input
                                type="checkbox"
                                checked={termsChecked.personalInformation}
                                onChange={(e) => onTermChangeHandler(e, "personalInformation")}
                            />&nbsp;
                            동의함
                        </div>
                        <div className="terms-title">[선택]쇼핑정보 수신 동의</div>
                        <div className="terms">{shoppingInformation}</div>
                        <div className="terms-agree">
                            쇼핑정보 수신 동의하십니까?
                            &nbsp;
                            <input
                                type="checkbox"
                                checked={termsChecked.shoppingInformation}
                                onChange={(e) => onTermChangeHandler(e, "shoppingInformation")}
                            />&nbsp;
                            동의함
                        </div>
                    </div>

                    <div className="authentication-button-container">
                        <div className={signUpButtonClass} onClick={ onSignUpButtonClickHandler }>가입하기</div>
                    </div>
                </div>
            </div>
        </div>
    );
}