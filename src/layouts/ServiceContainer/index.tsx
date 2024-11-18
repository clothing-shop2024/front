import { ChangeEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useLocation, useNavigate } from "react-router";
import ResponseDto from "src/apis/response.dto";
import { getMyInfoRequest, getSignInUserRequest } from "src/apis/user";
import { GetMyInfoResponseDto, GetSignInUserResponseDto } from "src/apis/user/dto/response";
import AllCategoryPopup from "src/components/AllCategoryPopup";
import { ADMIN_USER_LIST_ABSOLUTE_PATH, CLOTH_DETAIL_SEARCH_LIST_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, SIGN_IN_ABSOLUTE_PATH } from "src/constant";
import useClothSearchStore from "src/stores/cloth-search.store";
import useUserStore from "src/stores/user.store";
import { MY_PAGE_INFO_ABSOLUTE_PATH } from '../../constant/index';
import './style.css';

//                    component                    //
function TopBar() {

    //                      state                      //
    const { pathname } = useLocation();
    const { loginUserRole, setLoginUserId, setLoginUserRole } = useUserStore();


    const [cookies, removeCookie] = useCookies();
    const [userName, setUserName] = useState<string>('');
    const [isShownCategory, setIsShownCategory] = useState(false);

    // search
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialSearchWord = queryParams.get('search') || '';
    const { searchWord, setSearchWord } = useClothSearchStore();
    const [inputSearchWord, setInputSearchWord] = useState<string>(searchWord);

    const openAllCategoryHandler = () => {
        setIsShownCategory(true); 
    };

    const closeAllCategoryHandler = () => {
        setIsShownCategory(false); 
    };

    //                    function                     //
    const navigator = useNavigate();

    const notLoginInState = loginUserRole !== 'ROLE_USER' && loginUserRole !== 'ROLE_ADMIN';
    const loginInState = loginUserRole === 'ROLE' || loginUserRole === 'ROLE_ADMIN';

    const getMyInfoResponse = (result: GetMyInfoResponseDto | ResponseDto | null) => {
      if (!result) return;

      const { userName } = result as GetMyInfoResponseDto;
      setUserName(userName);
    };

    //                event handler                    //
    const onLogoClickHandler = () => {
      if (pathname === MAIN_ABSOLUTE_PATH) {
        window.location.reload();
      } else {
        navigator(MAIN_ABSOLUTE_PATH);
      }
    }

    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputSearchWord(event.target.value);
    };

    const onSearchButtonClickHandler = () => {
        setSearchWord(inputSearchWord);
        navigator(CLOTH_DETAIL_SEARCH_LIST_ABSOLUTE_PATH + `?search=${searchWord}`);
    };

    const onSignInClickHandler = () => navigator(SIGN_IN_ABSOLUTE_PATH);
    const onMyPageClickHandler = () => navigator(MY_PAGE_INFO_ABSOLUTE_PATH);
    const onAdminPageClickHandler = () => navigator(ADMIN_USER_LIST_ABSOLUTE_PATH);

    const onLogOutClickHandler = () => {
        removeCookie('accessToken', { path: '/' });
        setLoginUserId('');
        setLoginUserRole('');
        navigator(MAIN_ABSOLUTE_PATH);
        window.location.reload();
    };

    //                    effect                       //
    useEffect(() => {
        if (!cookies.accessToken) return;
        getMyInfoRequest(cookies.accessToken).then(getMyInfoResponse);
    }, [cookies.accessToken]);

    //                    render                        //
    return (
        <div className='topbar'>
            <div className='all-category-box' onClick={openAllCategoryHandler}>≡</div>
            {isShownCategory && 
                <AllCategoryPopup onClose={closeAllCategoryHandler} />
            }

            <div className='logo-button' onClick={onLogoClickHandler}>logo</div>

            <div className='topbar-right'>
                <div className='topbar-right-search'>
                    <div className='search-cloth-input-box'>
                        <input className='search-cloth-input' value={inputSearchWord} onChange={onSearchWordChangeHandler} />
                    </div>
                    <div className='search-cloth-button search' onClick={onSearchButtonClickHandler}></div>
                </div>
                <div className='topbar-right-user'>
                { notLoginInState &&
                    <div className='sign-in-button' onClick={onSignInClickHandler}>Login</div>
                }
                {loginUserRole === 'ROLE_USER' &&
                <div className="top-bar-role">
                    <div className="sign-in-wrapper">
                        <div className="user-mypage-button person"></div>
                        <div className="user-button" onClick={onMyPageClickHandler}>{userName}님</div>
                    </div>
                    <div className="logout-button" onClick={onLogOutClickHandler}>로그아웃</div>
                </div>
                }
                {loginUserRole === 'ROLE_ADMIN' && 
                    <div className="top-bar-role">
                        <div className="sign-in-wrapper">
                            <div className="user-mypage-button person"></div>
                            <div className="user-button" onClick={onAdminPageClickHandler}>관리자님</div>
                        </div>
                        <div className="logout-button" onClick={onLogOutClickHandler}>로그아웃</div>
                    </div>
                }
                </div>
                <div className='tobar-right-cart'>Cart</div>
            </div>
        </div>
    );
}


//                    component                    //
export default function ServiceContainer() {

    //                      state                      //
    const { setLoginUserId, setLoginUserRole } = useUserStore();

    const [cookies] = useCookies();

    //                    function                    //
    const getSignInUserResponse = (result: GetSignInUserResponseDto | ResponseDto | null) => {
        if (!result) return;
    
        const { userId, userRole } = result as GetSignInUserResponseDto;

        setLoginUserId(userId);
        setLoginUserRole(userRole);
    };

    //                    effect                    //
    useEffect(() => {
        if (!cookies.accessToken) {
            return;
        }

        getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
    }, [cookies.accessToken]);



    //                    render                    //
    return (
        <div id="wrapper">
            <TopBar />
            <div className="main-container">
                <Outlet />
            </div>
        </div>
    )
}
