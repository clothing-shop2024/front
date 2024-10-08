import { ChangeEvent, KeyboardEvent } from "react";
import './style.css';

//                    component                    //
export interface InputBoxProps {
    label?: string;
    type: 'text' | 'password';
    value: string | number;
    placeholder?: string;
    onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    buttonTitle?: string;
    buttonStatus?: boolean;
    onButtonClickHandler?: () => void;
    message?: string;
    error?: boolean;
    onkeydownhandler?: (event: KeyboardEvent<HTMLInputElement>) => void ;
}

export default function InputBox({ label,onkeydownhandler, type, value, placeholder, onChangeHandler, buttonTitle, buttonStatus, onButtonClickHandler, message, error }: InputBoxProps) {

    //                    Render                       //
    const buttonClass = buttonStatus ? 'input-primary-button' : 'input-disable-button';
    const messageClass = 'input-message ' + (error ? 'error' : 'primary');
    
    return (
        <div className="input-box">
            <div className="input-label label">{label}</div>
            <div className="input-content-box">
                <input
                    className="input"
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChangeHandler}
                    onKeyDown={onkeydownhandler}
                />
                { buttonTitle && 
                <div className={buttonClass} onClick={onButtonClickHandler}>
                    {buttonTitle}
                </div> 
                }
            </div>
            <div className={messageClass}>
                {message}
            </div>
        </div>
    );
}