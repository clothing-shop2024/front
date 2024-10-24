import { ClothDetailListItem } from 'src/types';
import './style.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { GetClothDetailListResponseDto } from 'src/apis/clothDetail/dto/response';
import ResponseDto from 'src/apis/response.dto';

//                    component                    //
function ListItem (props: ClothDetailListItem) {

    //                   function                 //
    const {
        clothDetailName,
        clothImage1,
        price,
        discountPrice,
        ratingAvg
    } = props;

    //                  render                  //
    return (
      <>
          <div className='cloth-detail-list'>
              <div className='cloth-detail-image'>
                  <img src={clothImage1} />
              </div>
              <div className='cloth-detail-bottom'>
                  <div className='cloth-detail-name'>{clothDetailName}</div>
                  <div className='cloth-detail-all-price'>
                      <div className='cloth-detail-price'>{price}</div>
                      <div className='cloth-detail-discount-price'>{discountPrice}</div>
                  </div>
                  <div className='cloth-detail-rating-avg'>{ratingAvg}</div>
              </div>
          </div>
      </>
    );

};

//                    component                    //
export default function ClothDetailSearchList() {

    //                      state                      //
    const [clothDetailList, setClothDetailList] = useState<ClothDetailListItem[]>([]);
    const [currentItems1, setCurrentItems1] = useState<ClothDetailListItem[]>([]);
    const [itemsToShow, setItemsToShow] = useState<number>(8);
    const queryParams = new URLSearchParams(location.search);
    const initialSearchWord = queryParams.get('search') || '';
    const [searchWord, setSearchWord] = useState<string>(initialSearchWord);

    //                    function                     //
    const navigator = useNavigate();

    const clothDetailSearchListResponse = (result: GetClothDetailListResponseDto | ResponseDto | null) => {

    };


    //                  render                  //
    return (
        <div>
            <div className='cloth-search-outside'>
                <div className='cloth-search-container'>
                    <div>
                        <div>SEARCH</div>
                        <div>찾으시는 상품의 이름을 입력하세요.</div>
                    </div>
                    <div className='search-word'>
                        <div>상품명</div>
                        <input />
                    </div>
                    <div className='seach-button'>검색</div>

                </div>
            </div>
        </div>
    )
}
