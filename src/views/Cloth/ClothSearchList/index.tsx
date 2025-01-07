import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { GetClothListResponseDto } from 'src/apis/cloth/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { ClothListItem } from 'src/types';
import { MAIN_PATH } from 'src/constant';
import useClothSearchStore from 'src/stores/cloth-search.store';
import { getClothSearchListRequest } from 'src/apis/cloth';
import './style.css';

//                    component                    //
function ListItem (props: ClothListItem) {

    //                   function                 //
    const {
        clothName,
        price,
        discountPrice,
        ratingAvg,
        clothImageNumber,
        clothMainImage
    } = props;

    //                  render                  //
    return (
      <>
          <div className='cloth-detail-list'>
              <div className='cloth-detail-image'>
                  <img style={{ width: '230px', height: '180px'}} src={clothMainImage} />
              </div>
              <div className='cloth-detail-bottom'>
                  <div className='cloth-detail-name'>{clothName}</div>
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
export default function ClothSearchList() {

    //                      state                      //
    const [clothList, setClothList] = useState<ClothListItem[]>([]);
    const [currentItems1, setCurrentItems1] = useState<ClothListItem[]>([]);
    const [itemsToShow, setItemsToShow] = useState<number>(8);
    // window 추가
    const queryParams = new URLSearchParams(window.location.search);
    const initialSearchWord = queryParams.get('search') || '';
    const { searchWord, setSearchWord } = useClothSearchStore();

    //                    function                     //
    const navigator = useNavigate();
    
    const getSearchClothListResponse = (result: GetClothListResponseDto | ResponseDto | null) => {

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

        const { clothList } = result as GetClothListResponseDto;
        
        if (Array.isArray(clothList)) {
            setClothList(clothList);
        } else {
            console.error("Fetched cloth detail list is not an array");
        }
    };

    useEffect(() => {
        if(!searchWord) return;
        getClothSearchListRequest(searchWord).then(getSearchClothListResponse);
    }, [searchWord]);

    useEffect(() => {
        setCurrentItems1(clothList.slice(0, 8)); // clothList의 첫 8개 항목을 설정
    }, [clothList]);

    //                  render                  //
    return (
        <div>
            <div className='page-title-outside'>
                <div className='page-big-title'>SEARCH</div>
            </div>
            <div className='cloth-search-contents'>
                <div>" <strong>{searchWord}</strong> "</div>
                <div>를 검색한 결과입니다.</div>
            </div>

            {currentItems1.length > 0 ? (
                <div className='best-cloth-detail-list-wrap'>
                    {currentItems1.map(item => (
                        <ListItem key={item.clothName} {...item} />
                    ))}
                </div>
            ) : (
                <div className='no-results-message'>
                    검색 결과가 없습니다.
                </div>
            )}
        </div>
    )
}
