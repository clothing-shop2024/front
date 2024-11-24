import { useState } from 'react';
import './style.css';

// interface
interface Prop {
  value: string;
  onChange: (value: string) => void;
}

const listItem = [
  { name: 'Red', value: 'red' },
  { name: 'Blue', value: 'blue' },
  { name: 'Green', value: 'green' },
  { name: 'Black', value: 'black' },
  { name: 'White', value: 'white' },
];

// component
export default function ColorSelectBox({ value, onChange }: Prop) {
  // state
  const [show, setShow] = useState<boolean>(false);

  // event handler
  const onButtonClickHandler = () => setShow(!show);

  const onItemClickHandler = (value: string) => {
    onChange(value); // 색상 값 전달
    setShow(false);   // 리스트 닫기
  };

  // render
  const buttonClass = show ? 'select-close-button' : 'select-open-button';
  return (
    <div className="select-box">
      {value === '' ? (
        <div className="select-none">색상</div>
      ) : (
        <div className="select-item" style={{ backgroundColor: value }}>
          {value}
        </div>
      )}
      <div className={buttonClass} onClick={onButtonClickHandler}></div>
      {show && (
        <div className="select-list">
          {listItem.map((item) => (
            <div
              key={item.value}
              className="select-list-item-box"
              onClick={() => onItemClickHandler(item.value)}
            >
              <div className="select-item" style={{ backgroundColor: item.value }}>
                {item.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


