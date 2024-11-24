import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { GetClothInfoResponseDto } from 'src/apis/cloth/dto/response';
import { DeleteClothFavoriteRequest, GetFavoriteCheckStatusRequest, PostClothFavoriteRequest } from 'src/apis/cloth/favorite';
import { GetFavoriteCheckResponseDto } from 'src/apis/cloth/favorite/dto/response';
import { PostOrderRequest } from 'src/apis/cloth/order';
import { PostOrderResponseDto } from 'src/apis/cloth/order/dto/response';
import ResponseDto from 'src/apis/response.dto';
import clothDefault from 'src/assets/image/cloth_default.jpg';
import useUserStore from 'src/stores/user.store';
import './style.css';

// component : 옷 주문 페이지 //
export default function ClothInfo() {

  // state //
  const [cookies] = useCookies();
  const { clothNumber } = useParams();
  const { clothId } = useParams();
  const { loginUserId, loginUserRole } = useUserStore();
  const [favoriteUserId, setFavoriteUserId] = useState<string | number>(''); // 옷 즐겨찾기(찜)
  const [clothImage, setClothImage] = useState<string>(''); // 옷 이미지
  const [clothName, setClothName] = useState<string>(''); // 옷 이름
  const [clothCategory, setClothCategory] = useState<string>(''); // 옷 카테고리
  const [clothFeatures, setClothFeatures] = useState<string>(''); // 옷의 상세설명
  const [sizeNumber, setSizeNumber] = useState<number>(0);
  const [sizeName, setSizeName] = useState<string>('');
  const [colorNumber, setColorNumber] = useState<number>(0);
  const [colorName, setColorName] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(''); // 색상 선택(사용자)
  const [selectedSize, setSelectedSize] = useState<string>(''); // 사이즈 선택(사용자)

  const [clothPrice, setClothPrice] = useState<number>(0); // 가격 저장
  const [clothStock, setClothStock] = useState<number>(0); // 옷의 재고 저장
  const [favoriteClothId, setFavoriteClothId] = useState<number>(0); // 즐겨찾기 저장

    // function //
    const navigator = useNavigate();

    // 옷 정보 받아오기
    const GetClothInfoResponse = (result : GetClothInfoResponseDto | null) => {
      if (!result || result.code !== 'SU') {
        return;
      }

      const { stock, sizeNumber, sizeName, colorNumber, colorName, clothName, clothCategory, clothFeatures, clothPrice, clothImage } = result;
      
      setClothImage(clothImage);
      setClothName(clothName);
      setClothCategory(clothCategory);
      setClothFeatures(clothFeatures);
      setClothPrice(clothPrice);
      setClothStock(stock);
      setSizeNumber(sizeNumber)
      setSizeName(sizeName);
      setColorNumber(colorNumber);
      setColorName(colorName);
    }

     // 주문 성공/실패 응답 처리
    const PostOrderResponse = (result: ResponseDto | null) => {
      if (!result || result.code !== 'SU') {
          alert("주문에 실패했습니다.");
          return;
      }
      alert("주문이 완료되었습니다.");
  };

  // 옷 찜하기
    const PostClothFavoriteResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '필수 데이터를 입력하지 않았습니다.' :
            result.code === 'NR' ? '존재하지 않는 식당입니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'NU' ? '존재하지 않는 사용자입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
        alert(message);
        return;
    }

    if (!clothId) return;
    // 왜 오류가 나지..
    // GetFavoriteCheckStatusRequest(clothId, cookies.accessToken).then(GetFavoriteCheckStatusRequest);
}

  // 찜 삭제
  const DeleteClothFavoriteResponse = (result: ResponseDto | null) => {
      const message =
          !result ? '서버에 문제가 있습니다.' :
          result.code === 'VF' ? '필수 데이터를 입력하지 않았습니다.' :
          result.code === 'NR' ? '존재하지 않는 식당입니다.' :
          result.code === 'AF' ? '권한이 없습니다.' :
          result.code === 'NU' ? '존재하지 않는 사용자입니다.' :
          result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

      if (!result || result.code !== 'SU') {
          alert(message);
          return;
      }

      setFavoriteUserId("");
      setFavoriteClothId(0);
  }

  // 찜 상태 확인
    const GetFavoriteCheckStatusResponse = (result: GetFavoriteCheckResponseDto | ResponseDto | null) => {
        if (!result || result.code !== 'SU') {
            if (!result || result.code !== 'NU') return;
    }

    const {  userId, clothId } = result as GetFavoriteCheckResponseDto;
    setFavoriteUserId(favoriteUserId);
    setFavoriteClothId(favoriteClothId);
    };

  // 주문 제출 함수
  const onOrderSubmit = (result: PostOrderResponseDto | ResponseDto | null) => {
    if (!clothNumber || !selectedColor || !selectedSize) return;
    const requestBody = {
        clothNumber,
        sizeNumber,
        sizeName: selectedSize,
        colorNumber,
        colorName: selectedColor,
        quantity: 1,  // 기본적으로 수량 1로 설정
    };

    PostOrderRequest(clothNumber, requestBody, cookies.accessToken).then(PostOrderResponse);
  };

  // event handler //
  const onFavoriteClickHandler = () => {
    if (!loginUserId || !clothId || !cookies.accessToken) return;
    PostClothFavoriteRequest(clothId, cookies.accessToken).then(PostClothFavoriteResponse)
  };

  const onCancleFavoriteClickHandler = () => {
    if (!loginUserId || !clothId || !cookies.accessToken) return;
    DeleteClothFavoriteRequest(clothId, cookies.accessToken).then(DeleteClothFavoriteResponse)
}

  // effect //
  useEffect(() => {
    if (!clothId) {
        return;
    }

    // GetClothInfoRequest(clothId, cookies.accessToken).then(GetClothInfoResponse);
  }, [clothId, cookies.accessToken]);

  useEffect(() => {
      if (!clothId) return;

    if (!cookies.accessToken) return;
    GetFavoriteCheckStatusRequest(clothId, cookies.accessToken).then(GetFavoriteCheckStatusResponse);
  }, [cookies.accessToken, clothId]);

  return (
    <div id="cloth-order-page-wrapper">
        <div className="cloth-order-page-container">
            <div className="cloth-order-top-container">
                <img src={clothImage ? clothImage : clothDefault}/>
                <div className="cloth-order-top">
                    <div className="cloth-order-name-box">
                        <div className="cloth-order-name">{clothName}</div>
                        <div className="cloth-order-price">{clothPrice} 원</div>
                    </div>
                    <div className="cloth-order-category-box">
                        <div className="cloth-order-category">{clothCategory}</div>
                    </div>
                </div>
            </div>

           <div className="cloth-order-middle-container">
          <div className="cloth-order-selection-box">
            <div className="cloth-order-selection">
              <label>색상 선택</label>
              <div className="cloth-order-color-options">
                {['red', 'blue', 'green', 'black', 'white'].map((color, index) => (
                  <button
                    key={index}
                    style={{ backgroundColor: color }}
                    className={colorName === color ? 'selected' : ''}
                    onClick={() => setColorName(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="cloth-order-selection">
              <label>사이즈 선택</label>
              <div className="cloth-order-size-options">
                {['S', 'M', 'L', 'XL'].map((size, index) => (
                  <button
                    key={index}
                    className={sizeName === size ? 'selected' : ''}
                    onClick={() => setSizeName(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

            {/* <div className="cloth-order-actions">
                <div onClick={onOrderSubmit} disabled={!selectedColor || !selectedSize}>
                    주문하기
                </div>
            </div> */}

          <div className='cloth_id'>
                <div>
                    {loginUserRole === "ROLE_USER" && (loginUserId === favoriteUserId && Number(clothId) === favoriteClothId ?
                    (<div className='cloth-id-favorite-heart' onClick={onCancleFavoriteClickHandler}></div>) :   
                    (<div className='restaurant-info-favorite-non-heart' onClick={onFavoriteClickHandler}></div>))}
                </div>
          </div>

          <div className="cloth-order-bottom-container">
              <div className="cloth-order-features">
                  <div>특징</div>
                  <div>{clothFeatures}</div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
