import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router";
import { CLOTH_CATEGORY1_LIST_ABSOLUTE_PATH, FAQ_LIST_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, NOTICE_LIST_ABSOLUTE_PATH, QNA_LIST_ABSOLUTE_PATH, SIGN_IN_ABSOLUTE_PATH, SIGN_UP_ABSOLUTE_PATH } from "src/constant";
import useUserStore from "src/stores/user.store";
import './style.css';

//                    component                    //
export const AllCategoryPopup = ({ onClose }: { onClose: () => void }) => {

    //                    state                        //
    const { pathname } = useLocation();
    const { loginUserRole, setLoginUserId, setLoginUserRole } = useUserStore();
    const [cookies, setCookie, removeCookie] = useCookies();
    

    //                event handler                    //
    const navigator = useNavigate();
    
    const notLoginInState = loginUserRole !== 'ROLE_USER' && loginUserRole !== 'ROLE_ADMIN';
    const loginInState = loginUserRole === 'ROLE_USER' || loginUserRole === 'ROLE_ADMIN';

    const onOuterClickHandler = () => navigator(CLOTH_CATEGORY1_LIST_ABSOLUTE_PATH('OUTER'));

    const onTopClickHandler = () => navigator(CLOTH_CATEGORY1_LIST_ABSOLUTE_PATH('TOP'));

    const onBottomClickHandler = () => navigator(CLOTH_CATEGORY1_LIST_ABSOLUTE_PATH('BOTTOM'));
    
    const onOpsClickHandler = () => navigator(CLOTH_CATEGORY1_LIST_ABSOLUTE_PATH('OPS/SKIRT'));

    const onAccClickHandler = () => navigator(CLOTH_CATEGORY1_LIST_ABSOLUTE_PATH('ACC'));

    const onNoticeClickHandler = () => {
        onClose();
        navigator(NOTICE_LIST_ABSOLUTE_PATH);
    }
    const onQnaClickHandler = () => {
        onClose();
        navigator(QNA_LIST_ABSOLUTE_PATH);
    }
    const onFaqClickHandler = () => {
        onClose();
        navigator(FAQ_LIST_ABSOLUTE_PATH);
    }

    const onSignInClickHandler = () => {
        onClose();
        navigator(SIGN_IN_ABSOLUTE_PATH);
    }
    const onSignUpClickHandler = () => {
        onClose();
        navigator(SIGN_UP_ABSOLUTE_PATH);
    }
    const onLogOutClickHandler = () => {
        removeCookie('accessToken', { path: '/' });
        setLoginUserId('');
        setLoginUserRole('');
        onClose();
        navigator(MAIN_ABSOLUTE_PATH);
        window.location.reload();
    };

    const onOverlayClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        // e.target이 오버레이인 경우에만 닫기 실행
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    //                    render                       //
    return (
        <div className='modal-overlay' onClick={onOverlayClickHandler}>
            <div className='all-category-side-bar'>
                <div className='close-all-category' onClick={onClose}>x</div>

                <div className='all-cloth-category-detail'>
                    <div className='side-bar-button-container'>
                        <div className='side-bar-button' onClick={onOuterClickHandler}>OUTER</div>
                    </div>
                    <div className='side-bar-button-container'>
                        <div className='side-bar-button' onClick={onTopClickHandler}>TOP</div>
                    </div>
                    <div className='side-bar-button-container'>
                        <div className='side-bar-button' onClick={onBottomClickHandler}>BOTTOM</div>
                    </div>
                    <div className='side-bar-button-container'>
                        <div className='side-bar-button' onClick={onOpsClickHandler}>OPS/SKIRT</div>
                    </div>
                    <div className='side-bar-button-container'>
                        <div className='side-bar-button' onClick={onAccClickHandler}>ACC</div>
                    </div>
                </div>

                <div className='all-board-category'>
                    <div className='side-bar-button-container'>
                        <div className='side-bar-button' onClick={onNoticeClickHandler}>공지사항</div>
                    </div>
                    <div className='side-bar-button-container'>
                        <div className='side-bar-button' onClick={onQnaClickHandler}>문의사항</div>
                    </div>
                    <div className='side-bar-button-container'>
                        <div className='side-bar-button' onClick={onFaqClickHandler}>자주하는질문(FAQ)</div>
                    </div>
                </div>

                <div className='side-bar-login-container'>
                    {notLoginInState && 
                    <>
                        <div className='side-bar-button-container'>
                            <div className='side-bar-button' onClick={onSignInClickHandler}>로그인</div>
                        </div>
                        <div className='side-bar-button-container'>
                            <div className='side-bar-button' onClick={onSignUpClickHandler}>회원가입</div>
                        </div>
                    </>
                    }

                    {loginInState &&
                        <>
                            <div className='side-bar-button-container'>
                                <div className='side-bar-button' >주문조회</div>
                            </div>
                            <div className='side-bar-button-container'>
                                <div className='side-bar-button' onClick={onLogOutClickHandler}>로그아웃</div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}


export default AllCategoryPopup;
