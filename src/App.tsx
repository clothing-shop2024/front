import { useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import './App.css';

import { ADMIN_FAQ_UPDATE_PATH, ADMIN_NOTICE_UPDATE_PATH, ADMIN_PATH, ADMIN_LIST_PATH, ADMIN_USER_PATH, AUTH_PATH, CLOTH_CATEGORY1_PATH, CLOTH_INFO_PATH, CLOTH_LIST_PATH, CLOTH_PATH, CLOTH_SEARCH_PATH, FAQ_LIST_PATH, FAQ_PATH, FIND_ID_PATH, FIND_PASSWORD_PATH, FIND_PASSWORD_RESET_PATH, MAIN_ABSOLUTE_PATH, MAIN_PATH, MY_PAGE_COUPON_PATH, MY_PAGE_INFO_DELETE_PATH, MY_PAGE_INFO_PATH, MY_PAGE_INFO_UPDATE_PATH, MY_PAGE_PATH, MY_PAGE_QNA_LIST_PATH, NOTICE_DETAIL_PATH, NOTICE_LIST_PATH, NOTICE_PATH, QNA_DETAIL_PATH, QNA_LIST_PATH, QNA_PATH, QNA_UPDATE_PATH, REGIST_PATH, SIGN_IN_PATH, SIGN_UP_PATH, SNS_PATH, USER_EMAIL_UPDATE_PATH, USER_PASSWORD_UPDATE_PATH, ADMIN_CLOTH_PATH, ADMIN_USER_DETAIL_PATH } from './constant';
import AdminContainer from './layouts/AdminContainer';
import ServiceContainer from './layouts/ServiceContainer';
import UserManageList from './views/Admin/UserManage/List';
import FindId from './views/Authentication/FindId';
import FindPassword from './views/Authentication/FindPassword';
import FindPasswordReset from './views/Authentication/FindPasswordReset';
import SignIn, { Sns } from './views/Authentication/SignIn';
import SignUp from './views/Authentication/SignUp';
import FaqList from './views/Board/Faq/FaqList';
import FaqRegist from './views/Board/Faq/FaqRegist';
import FaqUpdate from './views/Board/Faq/FaqUpdate';
import NoticeDetail from './views/Board/Notice/NoticeDetail';
import NoticeList from './views/Board/Notice/NoticeList';
import NoticeRegist from './views/Board/Notice/NoticeRegist';
import NoticeUpdate from './views/Board/Notice/NoticeUpdate';
import QnaDetail from './views/Board/Qna/QnaDetail';
import QnaList from './views/Board/Qna/QnaList';
import QnaRegist from './views/Board/Qna/QnaRegist';
import QnaUpdate from './views/Board/Qna/QnaUpdate';
import ClothList from './views/Cloth/ClothCategory1List';
import ClothSearchList from './views/Cloth/ClothSearchList';
import Main from './views/Main';
import EmailModify from './views/MyPage/EmailModify';
import MyPageCoupon from './views/MyPage/MyPageCoupon';
import MyPageInfo from './views/MyPage/MyPageInfo';
import MyPageInfoDelete from './views/MyPage/MyPageInfoDelete';
import MyPageInfoUpdate from './views/MyPage/MyPageInfoUpdate';
import PasswordModify from './views/MyPage/PasswordModify';
// import ClothInfo from './views/cloth/ClothInfo/index';
import MyPageQna from './views/MyPage/MyPageQna';
import ClothMange from './views/Admin/ClothManage/List';
import UserDetail from './views/Admin/UserManage/Detail';

// component: root 경로 컴포넌트
function Index() {

    //   function   //
    const navigate = useNavigate();

    //   effect   //
    useEffect(() => {
        navigate(MAIN_ABSOLUTE_PATH);
    }, []);

    //   render   //
    return <></>;
}

// component: Application 컴포넌트
function App() {
    return (
        <Routes>
            <Route index element={<Index />} />

            {/* 메인 페이지 */}
            <Route path={MAIN_PATH} element={<ServiceContainer />}>
                <Route index element={<Main />} />

                {/* 인증 페이지 */}
                <Route path={AUTH_PATH}>
                    <Route path={SIGN_IN_PATH} element={<SignIn />} />
                    <Route path={SNS_PATH} element={<Sns />} />
                    <Route path={SIGN_UP_PATH} element={<SignUp />} />
                    <Route path={FIND_ID_PATH} element={<FindId />} />
                    <Route path={FIND_PASSWORD_PATH} element={<FindPassword />} />
                    <Route path={FIND_PASSWORD_RESET_PATH} element={<FindPasswordReset />} />
                </Route>

                {/* 마이 페이지 */}
                <Route path={MY_PAGE_PATH}>
                    <Route path={MY_PAGE_INFO_PATH} element={<MyPageInfo />} />
                    <Route path={MY_PAGE_INFO_UPDATE_PATH} element={<MyPageInfoUpdate />} />
                    <Route path={USER_PASSWORD_UPDATE_PATH} element={<PasswordModify />} />
                    <Route path={USER_EMAIL_UPDATE_PATH} element={<EmailModify />} />
                    <Route path={MY_PAGE_INFO_DELETE_PATH} element={<MyPageInfoDelete />} />
                    <Route path={MY_PAGE_COUPON_PATH} element={<MyPageCoupon />} />
                    <Route path={MY_PAGE_QNA_LIST_PATH} element={<MyPageQna />} />
                </Route>

                {/* 옷 페이지 */}
                <Route path={CLOTH_PATH}>
                    <Route path={CLOTH_LIST_PATH}>
                        <Route path={CLOTH_CATEGORY1_PATH} element={<ClothList />} />
                        <Route path={CLOTH_SEARCH_PATH} element={<ClothSearchList />} />
                        {/* <Route path={CLOTH_INFO_PATH} element={<ClothInfo />} /> */}
                    </Route>
                </Route>

                {/* 공지사항 페이지 */}
                <Route path={NOTICE_PATH}>
                    <Route path={NOTICE_LIST_PATH} element={<NoticeList />} />
                    <Route path={NOTICE_DETAIL_PATH} element={<NoticeDetail />} />
                </Route>

                {/* 문의사항 페이지 */}
                <Route path={QNA_PATH}>
                    <Route path={QNA_LIST_PATH} element={<QnaList />} />
                    <Route path={QNA_DETAIL_PATH} element={<QnaDetail />} />
                    <Route path={REGIST_PATH} element={<QnaRegist />} />
                    <Route path={QNA_UPDATE_PATH} element={<QnaUpdate />} />
                </Route>

                {/* 자주하는 질문 페이지 FaqList */}
                <Route path={FAQ_PATH}>
                    <Route path={FAQ_LIST_PATH} element={<FaqList />} />
                </Route>

                {/* // route : 관리자 페이지 */}
                <Route path={ADMIN_PATH} element={<AdminContainer />}>

                    <Route path={ADMIN_USER_PATH}>
                        <Route path={ADMIN_LIST_PATH} element={<UserManageList />} />
                        <Route path={ADMIN_USER_DETAIL_PATH} element={<UserDetail />} />
                    </Route>

                    <Route path={ADMIN_CLOTH_PATH}>
                        <Route path={ADMIN_LIST_PATH} element={<ClothMange />} />
                    </Route>
                    
                    {/* // route : 관리자 - 게시물 (공지사항) 관리 페이지 */}
                    <Route path={NOTICE_PATH}>
                        <Route path={REGIST_PATH} element={<NoticeRegist />} />
                        <Route path={ADMIN_NOTICE_UPDATE_PATH} element={<NoticeUpdate />} />
                    </Route>

                    <Route path={FAQ_PATH}>
                        <Route path={REGIST_PATH} element={<FaqRegist />} />
                        <Route path={ADMIN_FAQ_UPDATE_PATH} element={<FaqUpdate />} />
                    </Route>
                </Route>

            </Route>
        </Routes>
    );
}

export default App;