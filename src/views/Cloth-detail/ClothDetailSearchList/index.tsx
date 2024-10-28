import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { GetClothDetailListResponseDto } from 'src/apis/clothDetail/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { ClothDetailListItem } from 'src/types';
import './style.css';
import { MAIN_PATH } from 'src/constant';
import useClothSearchStore from 'src/stores/cloth-search.store';
import { getClothDetailSearchListRequest } from 'src/apis/clothDetail';

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
    // window 추가
    const queryParams = new URLSearchParams(window.location.search);
    const initialSearchWord = queryParams.get('search') || '';
    const { searchWord, setSearchWord } = useClothSearchStore();

    //                    function                     //
    const navigator = useNavigate();
    
    const getSearchClothDetailListResponse = (result: GetClothDetailListResponseDto | ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '검색어를 입력하세요.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') navigator (MAIN_PATH);
            return;
        }

        const { clothDetailList } = result as GetClothDetailListResponseDto;
        
        if (Array.isArray(clothDetailList)) {
            setClothDetailList(clothDetailList);
        } else {
            console.error("Fetched cloth detail list is not an array");
        }
    };

    useEffect(() => {
        if(!searchWord) return;
        getClothDetailSearchListRequest(searchWord).then(getSearchClothDetailListResponse);
    }, [searchWord]);

    useEffect(() => {
        setCurrentItems1(clothDetailList.slice(0, 8)); // clothDetailList의 첫 8개 항목을 설정
    }, [clothDetailList]);

    //                  render                  //
    return (
        <div>
            <div className='cloth-detail-list-container'>
                <div className='cloth-search-container'>
                    <div>
                        <div>SEARCH</div>
                        <div>
                            <div>"{searchWord}"</div>
                            <div>를 검색한 결과입니다.</div>
                        </div>
                    </div>
                </div>

                <div className='best-cloth-detail-list-wrap'>
                    {currentItems1.length > 0 ? (
                        currentItems1.map(item => (
                            <ListItem key={item.clothDetailName} {...item} />
                        ))
                    ) : (
                        <div className='no-results-message'>
                            검색어에 해당하는 리스트가 없습니다.
                        </div>
                    )}
                </div>
                <div></div>
            </div>
        </div>
    )
}
