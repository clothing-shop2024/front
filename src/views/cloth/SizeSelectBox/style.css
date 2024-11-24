import { useState } from 'react';
import './style.css';

// interface
interface Prop {
  value: string;
  onChange: (value: string) => void;
}

const sizeListItem = [
  { name: 'S', value: 'S' },
  { name: 'M', value: 'M' },
  { name: 'L', value: 'L' },
  { name: 'XL', value: 'XL' },
  { name: 'XXL', value: 'XXL' },
];

// component
export default function SizeSelectBox({ value, onChange }: Prop) {
  // state
  const [show, setShow] = useState<boolean>(false);

  // event handler
  const onButtonClickHandler = () => setShow(!show);

  const onItemClickHandler = (value: string) => {
    onChange(value); // 사이즈 값 전달
    setShow(false);   // 리스트 닫기
  };

  // render
  const buttonClass = show ? 'select-close-button' : 'select-open-button';
  return (
    <div className="select-box">
      {value === '' ? (
        <div className="select-none">사이즈</div>
      ) : (
        <div className="select-item">{value}</div>
      )}
      <div className={buttonClass} onClick={onButtonClickHandler}></div>
      {show && (
        <div className="select-list">
          {sizeListItem.map((item) => (
            <div
              key={item.value}
              className="select-list-item-box"
              onClick={() => onItemClickHandler(item.value)}
            >
              <div className="select-item">{item.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
