import { ChangeEvent, useEffect, useRef, useState } from "react";
import useAuthStore from "src/stores/auth.store";
import { getYYYYMMDD } from "src/utils";
import "./style.css";

interface DatePickerPopupProps {
    onClose: () => void;
    onSelectDate: (date: string) => void;
}

export const DatePickerPopup = ({ onClose, onSelectDate }: DatePickerPopupProps ) => {
    const today = new Date();
    const [birthDay, setBirthDay] = useState<string | null>(null);
    const { setUserBirthDay } = useAuthStore();
    const dateInputRef = useRef<HTMLInputElement>(null);

    const dateSelectHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setBirthDay(value);
        setUserBirthDay(value);
        // onSelectDate(value);
    };

    const handleConfirm = () => {
        if (birthDay) {
            setUserBirthDay(birthDay);
            onSelectDate(birthDay);
            console.log(setUserBirthDay);
        }
        onClose();
    };

    useEffect(() => {
        if (dateInputRef.current) {
            dateInputRef.current.focus();
        }
    }, []);

    return (
        <div className="modal-overlay"> {/* 팝업 배경 오버레이 */}
            <div className="date-popup-wrapper">
                <div className="date-popup-container">
                    <div className="date-popup-top">생년월일 선택</div>
                    <div className="date-popup-contents">
                        <div className="date-popup-content">
                            <div className="date-popup-title">생년월일</div>
                            <div className="date-popup-calender">
                                <input
                                    className="date-calender"
                                    ref={dateInputRef}
                                    type="date"
                                    max={getYYYYMMDD(today)}
                                    onChange={dateSelectHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="date-popup-button">
                        <div className="primary-button choice" onClick={handleConfirm}>확인</div>
                        <div className="error-button cancel" onClick={onClose}>취소</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatePickerPopup;
