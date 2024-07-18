import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import './App.css';

import { AUTH_PATH, MAIN_ABSOLUTE_PATH, SIGN_IN_PATH, SIGN_UP_PATH, SNS_PATH } from './constant';
import SignIn, { Sns } from './views/Authentication/SignIn';
import SignUp from './views/Authentication/SignUp';

// component: root 경로 컴포넌트
function Index() {
  //   function   //
  const navigate = useNavigate();

  //   effect   //
  useEffect(() => {
    navigate(MAIN_ABSOLUTE_PATH);
  }, [navigate]);

  //   render   //
  return <></>;
}

// component: Application 컴포넌트
function App() {
  return (
    // BrowserRouter 왜 붙여야 하는지 모르지만 안 붙이면 에러나요...
    <BrowserRouter>
      <Routes>
        <Route index element={<Index />} />
        <Route path={SNS_PATH} element={<Sns />} />
        
        {/* 인증페이지 */}
        <Route path={AUTH_PATH}>
          <Route path={SIGN_IN_PATH} element={<SignIn />} />
          <Route path={SIGN_UP_PATH} element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
