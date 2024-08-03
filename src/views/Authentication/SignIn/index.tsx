import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import { FIND_ID_ABSOLUTE_PATH, FIND_PASSWORD_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, SERVER_DOMAIN_URL, SIGN_IN_ABSOLUTE_PATH, SIGN_UP_ABSOLUTE_PATH } from "../../../constant";
import { SignInResponseDto } from "../../../apis/auth/dto/response";
import ResponseDto from "../../../apis/response.dto";
import { SignInRequestDto } from "../../../apis/auth/dto/request";
import { signInRequest } from "../../../apis/auth";
import InputBox from "../../../components/InputBox";

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
    const [, setCookie] = useCookies();
    const [message, setMessage] = useState<string>('');
    const [Id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // function //
    const navigator = useNavigate();

    const signInResponse = (result: SignInResponseDto | ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '아이디와 비밀번호를 모두 입력하세요.' :
            result.code === 'SF' ? '로그인 정보가 일치하지 않습니다.' :
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
        if (!Id || !password) {
            setMessage('이에일과 비밀번호를 모두 입력하세요.');
            return;
        }

        const requestBody: SignInRequestDto = {
            userId: Id,
            userPassword: password
        }
        signInRequest(requestBody).then(signInResponse);
    };

    const onFindIdInputClickHandler = () => navigator(FIND_ID_ABSOLUTE_PATH)
    const onFindPasswordInputClickHandler = () => navigator(FIND_PASSWORD_ABSOLUTE_PATH)
    const onSignUpClickHandler = () => navigator(SIGN_UP_ABSOLUTE_PATH)

    return (
        <div id="authentication-wrapper">
        <div className="authentication-contents">
            <div className="authentication-sign-title">로그인</div>
            <div className="authentication-sign-container">
                <div className="authentication-contents-box">
                    <div className="authentication-input-container">
                        <InputBox type="text" value={Id} placeholder="아이디를 입력해주세요" onChangeHandler={onIdChangeHandler} />
                        <InputBox type="password" value={password} placeholder="비밀번호를 입력해주세요" onChangeHandler={onPasswordChangeHandler} onkeydownhandler={onPasswordKeydownHandler} message={message} error />
                    </div>
                    <div className="authentication-button-container">
                        <div className="primary-button full-width" onClick={onSignInButtonClickHandler}>로그인</div>
                    </div>
                </div>
                <div className="find-container">
                    <div className="find-email">
                        <div className="text-link" onClick={onFindIdInputClickHandler}>이메일 찾기</div>
                    </div>
                    <div className="find-divider">{'\|'}</div>
                    <div className="reset-password">
                        <div className="text-link" onClick={onFindPasswordInputClickHandler}>비밀번호 재설정</div>
                    </div>
                    <div className="find-divider">{'\|'}</div>
                    <div className="user-sign-up">
                        <div className="text-link" onClick={onSignUpClickHandler}>회원가입</div>
                    </div>
                </div>
                <SnsContainer title="SNS 로그인" />
            </div>
        </div>
    </div>
    );
}