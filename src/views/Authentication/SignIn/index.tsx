import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import { SERVER_DOMAIN_URL, SIGN_IN_ABSOLUTE_PATH } from "../../../constant";

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

// component // 
export default function SignIn() {
    return (
        <div>로그인 화면</div>
    );
}