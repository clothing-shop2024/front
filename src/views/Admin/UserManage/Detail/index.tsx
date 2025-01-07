

import useUserStore from "src/stores/user.store";
import "./style.css";
import { useNavigate, useParams } from "react-router";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { GetAdminUserListResponseDto, GetMyInfoResponseDto } from "src/apis/user/dto/response";
import ResponseDto from "src/apis/response.dto";
import { ADMIN_USER_LIST_ABSOLUTE_PATH } from "src/constant";

//                    component                    //
export default function UserDetail() {

    //                      state                      //
    const { loginUserId, loginUserRole } = useUserStore();
    const { nickname } = useParams();

    const [cookies] = useCookies();

    const [userId, setUserId] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [userEmail, setUesrEmail] = useState<string>('');
    const [joinDate, setJoinDate] = useState<string>('');
    const [grade, setGrade] = useState<string>('');
    // const [points, setPoints] = useState<number>('');

    //                    function                     //
    const navigator = useNavigate();

    const getUserDetailResponse = (result: GetAdminUserListResponseDto | ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '잘못된 접수번호입니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'NU' ? '존재하지 않는 회원입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') {
                navigator(ADMIN_USER_LIST_ABSOLUTE_PATH);
                return;
            }
            navigator(ADMIN_USER_LIST_ABSOLUTE_PATH);
            return;
        }

        const { userId, userName, userEmail, joinDate, grade, points } = result as GetMyInfoResponseDto;
        setUserId(userId);
        setUserName(userName);
        setUesrEmail(userEmail);
        // setJoinDate(joinDate);
        setGrade(grade);
        // setPoints(points);

    }

    //                      render                      //
    return (
        <div>
            <div className="user-detail-info">
                <div className="user-detail-contents id">
                    <div className="user-detail-title">ID</div>
                    <div className="user-detail-content">내용</div>
                </div>
                <div className="user-detail-contents nickname">
                    <div className="user-detail-title">NICKNAME</div>
                    <div className="user-detail-content">내용</div>
                </div>
                <div className="user-detail-contents name">
                    <div className="user-detail-title">NAME</div>
                    <div className="user-detail-content">내용</div>
                </div>
                <div className="user-detail-contents email">
                    <div className="user-detail-title">EMAIL</div>
                    <div className="user-detail-content">내용</div>
                </div>
                <div className="user-detail-contents grade">
                    <div className="user-detail-title">GRADE</div>
                    <div className="user-detail-content">내용</div>
                </div>
                <div className="user-detail-contents points">
                    <div className="user-detail-title">POINTS</div>
                    <div className="user-detail-content">내용</div>
                </div>
                <div className="user-detail-contents coupon">
                    <div className="user-detail-title">COUPON</div>
                    <div className="user-detail-content">내용</div>
                </div>
                <div className="user-detail-contents joindate">
                    <div className="user-detail-title">JOINDATE</div>
                    <div className="user-detail-content">내용</div>
                </div>
            </div>

            <div className="user-detail-more-info">
                <div>주문</div>
                <div>|</div>
                <div>환불</div>
                <div>|</div>
                <div>후기</div>
            </div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        
    )
}
