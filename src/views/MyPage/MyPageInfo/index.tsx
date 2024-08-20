import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import ResponseDto from "src/apis/response.dto";
import { getMyInfoRequest } from "src/apis/user";
import { GetMyInfoResponseDto } from "src/apis/user/dto/response";
import { MAIN_ABSOLUTE_PATH, MY_PAGE_INFO_ABSOLUTE_PATH, MY_PAGE_INFO_UPDATE_ABSOLUTE_PATH } from "src/constant";
import useUserStore from "src/stores/user.store";
import "./style.css";

// component : 마이페이지 //
export default function MyPageInfo() {

  // state //
  const { loginUserRole } = useUserStore();

  const [cookies, setCookie, removeCookie] = useCookies();

  const [userId, setUserId] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [grade, setGrade] = useState<'VVIP' | 'VIP' | 'Red' | 'Orange' | 'Yellow' | 'White'>('White'); // 등급 상태 추가
  const [points, setPoints] = useState<number>(0); // 포인트 상태 추가

  // function //
  const navigator = useNavigate();

  const getMyInfoResponse = (result: GetMyInfoResponseDto | ResponseDto | null) => {
    // console.log('API Response:', result); 
    const message =
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'AF' ? '인증에 실패했습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
        alert(message);

        if (result?.code === 'AF') {
            navigator(MAIN_ABSOLUTE_PATH);
            return;
        };
        
        return;
    };

    const { userId, nickname, grade, points } = result as GetMyInfoResponseDto;
    setUserId(userId);
    setNickname(nickname);
    setGrade(grade);
    setPoints(points);
};

  // event handler //
  const onMyPageInfoClickHandler = () => navigator(MY_PAGE_INFO_ABSOLUTE_PATH);
  const onMyPageInfoUpdateClickHandler = (userId:string) => navigator(MY_PAGE_INFO_UPDATE_ABSOLUTE_PATH(userId));

  //   effect   //
  useEffect (() => {
    // loginUserRole !== 'ROLE_USER' 이거 때문에 튕김 
    if (!cookies.accessToken) navigator(MAIN_ABSOLUTE_PATH);
    else getMyInfoRequest(cookies.accessToken).then(getMyInfoResponse);
}, []);

  return (
    <div id="my-page-info-wrapper">
      <div className="my-page-info-container">

        <div className="my-page-info-top">
          <div className="my-page-info-top-title" onClick={onMyPageInfoClickHandler}>마이페이지</div>
          <div className="my-page-info-top-title" onClick={() => onMyPageInfoUpdateClickHandler(userId)}>회원정보 수정</div>
        </div>

        <div className="my-page-info-profile">
          <div className="photo">기본프로필</div>
          <div className="nickname">
            {nickname} <span className="grade">({grade})</span>
          </div>
        </div>

        <div className="my-page-info-user1">
          {/* <div className="member">회원등급</div> */}
          <div className="member">포인트{points}</div>
          <div className="member">쿠폰</div>
        </div>

        <div className="my-page-info-user2">
          <div className="order-detail">주문내역</div>
          <div className="order-detail">환불페이지</div>
          <div className="order-detail">나의 리뷰</div>
          <div className="order-detail">나의 문의 내역</div>
          <div className="order-detail">찜 목록</div>
        </div>

        <div className="my-order-processing-big-box">
          <div className="my-order-processing">나의 주문처리 현황</div>
          <div className="my-order-processing-box">
            <div className="order-completion">입금완료</div>
            <div className="order-completion">배송준비중</div>
            <div className="order-completion">배송중</div>
            <div className="order-completion">배송완료</div>
            <div className="order-completion">확정</div>
          </div>
        </div>
      
      </div>
    </div>

  );
}