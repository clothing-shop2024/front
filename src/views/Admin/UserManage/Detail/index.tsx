

import "./style.css";

export default function UserDetail() {
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
