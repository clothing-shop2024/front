import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import { FIND_ID_ABSOLUTE_PATH, FIND_PASSWORD_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, SERVER_DOMAIN_URL, SIGN_IN_ABSOLUTE_PATH, SIGN_UP_ABSOLUTE_PATH } from "../../../constant";
import { SignInResponseDto } from "../../../apis/auth/dto/response";
import ResponseDto from "../../../apis/response.dto";
import { SignInRequestDto } from "../../../apis/auth/dto/request";
import { signInRequest } from "../../../apis/auth";
import InputBox from "../../../components/InputBox";
import "./style.css";

// component: Sns 로그인 //
export function Sns() {

    // state //
    const [ cookie, setCookie ] = useCookies();
    const { accessToken, expires } = useParams();

    // function //
    const navigator = useNavigate();

    // effect //
    useEffect(() => {
        if (!accessToken || !expires) return;
        const expiration = new Date(Date.now() + (Number(expires) * 1000));
        setCookie('accessToken', accessToken, { path: '/', expires: expiration });

        navigator(SIGN_IN_ABSOLUTE_PATH);
    }, []);

    // render //
    return (
        <></>
    );
}

// interface //
interface SnsContainerProps {
    title: string;
}

// component // 
function SnsContainer({ title }: SnsContainerProps) {

    // event handler //
    const onSnsButtonClickHandler = (type: 'kakao' | 'naver') => {
        window.location.href = SERVER_DOMAIN_URL +'/api/v1/auth/oauth2/' + type;
    };

    // render: sns화면 //
    return (
        <div className="authentication-sns-container">
            <div className="sns-container-title">{title}</div>
            <div className="sns-button-container">
                <div className="sns-button kakao-button" onClick={() => onSnsButtonClickHandler('kakao')}></div>
                <div className="sns-button naver-button" onClick={() => onSnsButtonClickHandler('naver')}></div>
            </div>
        </div>
    );
}

// component : 로그인 // 
export default function SignIn() {

    // state //
    const [cookie, setCookie] = useCookies(); 
    const [message, setMessage] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const isSignInActive = id && password;
    const signInButtonClass = `${isSignInActive ? 'primary' : 'disable'}-button full-width`;

    // function //
    const navigator = useNavigate();

    const signInResponse = (result: SignInResponseDto | ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '아이디와 비밀번호를 모두 입력하세요.' :
            result.code === 'SF' ? '로그인 정보가 일치하지 않습니다.' :
            // 토큰 생성 실패
            result.code === 'TF' ? '서버에 문제가 있습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
        setMessage(message);

        const isSuccess = result && result.code === 'SU';
        if (!isSuccess) return;

        const { accessToken, expires } = result as SignInResponseDto;
        const expiration = new Date(Date.now() + (expires * 1000));
        setCookie('accessToken', accessToken, { path: '/', expires: expiration })

        navigator(MAIN_ABSOLUTE_PATH);
    };

    // event handler //
    const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
        setMessage('');
    };

    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setMessage('');
    };

    const onPasswordKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        onSignInButtonClickHandler();
    };

    const onSignInButtonClickHandler = () => {
        if (!isSignInActive) return;

        if (!id || !password) {
            setMessage('아이디와 비밀번호를 모두 입력하세요.');
            return;
        }

        const requestBody: SignInRequestDto = {
            userId: id,
            password: password
        }
        signInRequest(requestBody).then(signInResponse);
    };

    const onFindIdInputClickHandler = () => navigator(FIND_ID_ABSOLUTE_PATH)
    const onFindPasswordClickHandler = () => navigator(FIND_PASSWORD_ABSOLUTE_PATH)
    const onSignUpClickHandler = () => navigator(SIGN_UP_ABSOLUTE_PATH)

    return (
        <div id="authentication-wrapper">
            <div className="authentication-title">로그인</div>
            <div className="authentication-sign-in">
                <div className="authentication-contents">
                    <div className="authentication-input-container">
                        <InputBox type="text" value={id} placeholder="아이디를 입력해주세요" onChangeHandler={onIdChangeHandler} />
                        <InputBox type="password" value={password} placeholder="비밀번호를 입력해주세요" onChangeHandler={onPasswordChangeHandler} onkeydownhandler={onPasswordKeydownHandler} message={message} error />
                    </div>
                    <div className="authentication-button-container">
                        <div className={signInButtonClass} onClick={onSignInButtonClickHandler}>로그인</div>
                    </div>

                    <div className="find-container">
                        <div className="text-link" onClick={onFindIdInputClickHandler}>아이디 찾기</div>
                        <div className="find-divider">{'\|'}</div>
                        <div className="text-link" onClick={onFindPasswordClickHandler}>비밀번호 찾기</div>
                    </div>

                    <div className="text-link">또는</div>
                    <SnsContainer title="SNS 로그인" />

                    <div className="sns-login">
                        <div className="kakao-login">
                            <div className="sns-icon kakao"></div>
                            <div>카카오 로그인</div>
                        </div>
                        <div className="naver-login">
                            <div className="sns-icon naver"></div>
                            <div>네이버 로그인</div>
                        </div>
                    </div>

                    <div className="user-sign-up" onClick={onSignUpClickHandler}>
                        <div className="text-link bold" >회원가입</div>
                        <div className="text-link">으로 이동&nbsp;</div>
                        <div className="right-pointer-img"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}