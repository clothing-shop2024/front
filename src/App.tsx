import { useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import './App.css';

import { ADMIN_NOTICE_REGIST_ABSOLUTE_PATH, ADMIN_PATH, AUTH_PATH, FIND_ID_PATH, FIND_PASSWORD_PATH, FIND_PASSWORD_RESET_PATH, MAIN_ABSOLUTE_PATH, MAIN_PATH, MY_PAGE_INFO_PATH, MY_PAGE_INFO_UPDATE_PATH, MY_PAGE_PATH, NOTICE_DETAIL_PATH, NOTICE_PATH, QNA_LIST_PATH, QNA_PATH, SIGN_IN_PATH, SIGN_UP_PATH, SNS_PATH } from './constant';
import ServiceContainer from './layouts/ServiceContainer';
import FindId from './views/Authentication/FindId';
import FindPassword from './views/Authentication/FindPassword';
import FindPasswordReset from './views/Authentication/FindPasswordReset';
import SignIn, { Sns } from './views/Authentication/SignIn';
import SignUp from './views/Authentication/SignUp';
import NoticeDetail from './views/Board/Notice/NoticeDetail';
import NoticeList from './views/Board/Notice/NoticeList';
import NoticeRegist from './views/Board/Notice/NoticeRegist';
import QnaList from './views/Board/Qna/QnaList';
import Main from './views/Main';
import MyPageInfo from './views/MyPage/MyPageInfo';
import MyPageInfoUpdate from './views/MyPage/MyPageInfoUpdate';

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
                </Route>

                {/* 공지사항 페이지 */}
                <Route path={NOTICE_PATH}>
                    <Route index element={<NoticeList />} />
                    <Route path={NOTICE_DETAIL_PATH} element={<NoticeDetail />} />
                </Route>

                {/* 문의사항 페이지 */}
                <Route path={QNA_PATH}>
                    <Route path={QNA_LIST_PATH} element={<QnaList />} />
                </Route>

                {/* // route : 관리자 페이지 */}
                <Route path={ADMIN_PATH}>

                    
                    {/* // route : 관리자 - 게시물 (공지사항) 관리 페이지 */}
                    <Route path={ADMIN_NOTICE_REGIST_ABSOLUTE_PATH} element={<NoticeRegist />} />

                </Route>


            </Route>
        </Routes>
    );
}

export default App;