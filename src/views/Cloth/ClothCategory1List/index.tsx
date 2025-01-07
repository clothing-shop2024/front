import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getBestClothCategory1ListRequest, getClothCategory1ListRequest, getClothCategory2ListRequest, getPriceAscClothCategory1ListRequest, getPriceAscClothCategory2ListRequest, getPriceDescClothCategory1ListRequest, getPriceDescClothCategory2ListRequest } from "src/apis/cloth";
import { GetClothListResponseDto } from "src/apis/cloth/dto/response";
import ResponseDto from "src/apis/response.dto";
import { CLOTH_INFO_ABSOLUTE_PATH } from "src/constant";
import { ClothListItem } from "src/types";
import './style.css';

//                    component                    //
function ListItem (props: ClothListItem) {

    //                   state                //
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
export default function ClothList() {

    //                      state                      //
    const [bestClothList, setBestClothList] = useState<ClothListItem[]>([]);
    const [clothList, setClothList] = useState<ClothListItem[]>([]);
    // 현재 화면에 보여지는 리스트
    const [currentItems1, setCurrentItems1] = useState<ClothListItem[]>([]);
    // 처음에는 16개만 표시
    const [itemsToShow, setItemsToShow] = useState<number>(8);
    const { category1 } = useParams();
    // const [clothCategory1, setClothCategory1] = useState<string>('');

    // best 슬라이드 관리
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentItems2, setCurrentItems2] = useState<ClothListItem[]>([]);

    // 동적 스타일 -> 해당 필터 클릭 시 진하게 표시
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    // category1에 따른 clothCategory2 동적 관리
    const categories = {
        "TOP": ["티셔츠", "셔츠/블라우스", "니트", "맨투맨/후드", "슬리브리스"],
        "BOTTOM": ["데님", "슬랙스", "트레이닝팬츠", "쇼츠"],
        "OUTER": ["자켓", "점퍼", "가디건", "코트"],
        "OPS/SKI": ["원피스", "미니스커트", "미디/롱스커트"],
        "ACC": ["악세서리", "슈즈", "가방", "etc"]
    };
    const selectedCategory2 = categories[category1 as keyof typeof categories] || [];
    const [category2, setCategory2] = useState<string>('');
    const [activeCategory2, setActiveCategory2] = useState<string | null>(null);

    //                    function                     //
    const navigator = useNavigate();

    const clothCategory1ListResponse = (result: GetClothListResponseDto | ResponseDto | null) => {
        if (!result || result.code !== 'SU') return;

        const { clothList: fetchedClothList } = result as GetClothListResponseDto;
        if (Array.isArray(fetchedClothList)) {
            setClothList(fetchedClothList); // 상태 업데이트
            setCurrentItems1(fetchedClothList.slice(0, itemsToShow)); // 초기 화면에 보여줄 아이템 설정
        } else {
            console.error("Fetched cloth detail list is not an array");
        }
    };

    const getBestClothCategory1ListResponse = (result: GetClothListResponseDto | ResponseDto | null) => {

        if (!result || result.code !== 'SU') return;

        const { clothList } = result as GetClothListResponseDto;

        if (Array.isArray(clothList)) {
            setBestClothList(clothList);
        } else {
            console.error("Fetched cloth detail list is not an array");
        }
    };

    const getPriceAscClothCategory1ListRespone = (result: GetClothListResponseDto | ResponseDto | null) => {

        if (!result || result.code !== 'SU') return;

        const { clothList } = result as GetClothListResponseDto;

        if (Array.isArray(clothList)) {
            setClothList(clothList);
            setCurrentItems1(clothList.slice(0, itemsToShow));
        } else {
            console.error("Fetched cloth detail list is not an array");
        }
    };

    const getPriceDescClothCategory1ListRespone = (result: GetClothListResponseDto | ResponseDto | null) => {

        if (!result || result.code !== 'SU') return;

        const { clothList } = result as GetClothListResponseDto;

        if (Array.isArray(clothList)) {
            setClothList(clothList);
            setCurrentItems1(clothList.slice(0, itemsToShow));
        } else {
            console.error("Fetched cloth detail list is not an array");
        }
    };

    const clothCategory2ListResponse = (result: GetClothListResponseDto | ResponseDto | null) => {
        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '존재하지 않는 카테고리를 선택하셨습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        const { clothList: fetchedClothList } = result as GetClothListResponseDto;
        if (Array.isArray(fetchedClothList)) {
            setClothList(fetchedClothList); // 상태 업데이트
            setCurrentItems1(fetchedClothList.slice(0, itemsToShow)); // 초기 화면에 보여줄 아이템 설정
        } else {
            console.error("Fetched cloth detail list is not an array");
        }
    };

    const getPriceAscClothCategory2ListRespone = (result: GetClothListResponseDto | ResponseDto | null) => {

        if (!result || result.code !== 'SU') return;

        const { clothList } = result as GetClothListResponseDto;

        if (Array.isArray(clothList)) {
            setClothList(clothList);
            setCurrentItems1(clothList.slice(0, itemsToShow));
        } else {
            console.error("Fetched cloth detail list is not an array");
        }
    };

    const getPriceDescClothCategory2ListRespone = (result: GetClothListResponseDto | ResponseDto | null) => {

        if (!result || result.code !== 'SU') return;

        const { clothList } = result as GetClothListResponseDto;

        if (Array.isArray(clothList)) {
            setClothList(clothList);
            setCurrentItems1(clothList.slice(0, itemsToShow));
        } else {
            console.error("Fetched cloth detail list is not an array");
        }
    };

    const onItemClickHandler = (item : number) => navigator(CLOTH_INFO_ABSOLUTE_PATH(item));

    //                event handler                    //
    const onPriceAscClickHandler = (category1: string) => {
        if (!category1) return;
        setItemsToShow(8);
        setActiveFilter('asc');
        if (!category2) {
            getPriceAscClothCategory1ListRequest(category1).then(getPriceAscClothCategory1ListRespone);
        } else {
            getPriceAscClothCategory2ListRequest(category2).then(getPriceAscClothCategory2ListRespone);
        }
    }
    
    const onPriceDescClickHandler = (category1: string) => {
        if (!category1) return;
        setItemsToShow(8);
        setActiveFilter('desc');
        if (!category2) {
            getPriceDescClothCategory1ListRequest(category1).then(getPriceDescClothCategory1ListRespone);
        } else {
            getPriceDescClothCategory2ListRequest(category2).then(getPriceDescClothCategory2ListRespone);
        }
        
    }

    const onAllCategory2ClickHandler = () => {
        setCategory2('');
        setItemsToShow(8);
        setActiveCategory2(null);
        setActiveFilter(null);
        getClothCategory1ListRequest(category1!).then(clothCategory1ListResponse);
    }

    const onCategory2ClickHandler = (selectedCategory2: string) => {
        setItemsToShow(8);
        setCategory2(selectedCategory2);
        setActiveCategory2(selectedCategory2);
        setActiveFilter(null);
    };
    
    const handleLoadMore = () => {
        const newItemsToShow = itemsToShow + 8;
        setItemsToShow(newItemsToShow);
        setCurrentItems1(clothList.slice(0, newItemsToShow)); // 새로운 아이템 설정
    };

    // effect //
    useEffect(() => {
        setCurrentItems1(clothList.slice(0, itemsToShow));
    }, [clothList, itemsToShow]);

    useEffect(() => {
        if (!category1) return;
        getClothCategory1ListRequest(category1).then(clothCategory1ListResponse);
        getBestClothCategory1ListRequest(category1).then(getBestClothCategory1ListResponse);
    }, [category1]);

    useEffect(() => {
        if (!category2) return;
        getClothCategory2ListRequest(category2).then(clothCategory2ListResponse);
    }, [category2]);

    // 슬라이드
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                (prevIndex + 1) % bestClothList.length
            );
        }, 3000); // 3초마다 슬라이드

        return () => clearInterval(interval); // Clean up
    }, [bestClothList]);

    useEffect(() => {
        // 슬라이드로 현재 4개의 아이템을 표시
        const visibleItems = bestClothList.slice(currentIndex, currentIndex + 4);
        if (visibleItems.length < 4) {
            visibleItems.push(...bestClothList.slice(0, 4 - visibleItems.length)); // 리스트 끝에 도달하면 처음부터 가져옴
        }
        setCurrentItems2(visibleItems);
    }, [currentIndex, bestClothList]);

    //                  render                  //
    return (
        <div>
            <div className='page-title-outside'>
                <div className='page-big-title' onClick={ () => window.location.reload() }>{category1}</div>
            </div>

            <div className='cloth-detail-list-container'>
                <div className='best-cloth-detail-list'>
                    <div className='best-cloth-detail-list-title'>best Item</div>
                    <div className='cloth-detail-list-wrap'>
                        {currentItems2.map(item => (
                            <ListItem key={item.clothName} {...item} />
                        ))}
                    </div>
                </div>

                <div className='cloth-detail-list-category2'>
                    <div className='cloth-detail-list-category2-title'>
                        <div onClick={onAllCategory2ClickHandler} className={!activeCategory2 ? 'active-filter' : ''}>전체</div>
                        {selectedCategory2.map((category2) => (
                            <div
                                key={category2}
                                onClick={() => onCategory2ClickHandler(category2)}
                                className={activeCategory2 === category2 ? 'active-filter' : ''}
                            >
                                {category2}
                            </div>
                        ))}
                    </div>
                    
                    <div className='cloth-detail-list-filter'>
                        <div 
                            onClick={() => onPriceAscClickHandler(category1 || '')} 
                            className={activeFilter === 'asc' ? 'active-filter' : ''}
                        >
                            낮은가격
                        </div>
                        <div 
                            onClick={() => onPriceDescClickHandler(category1 || '')} 
                            className={activeFilter === 'desc' ? 'active-filter' : ''}
                        >
                            높은가격
                        </div>
                        <div>사용후기</div>
                    </div>
                </div>

                {/* <div className='cloth-detail-list-wrap'>
                    {currentItems1.map(item => (
                        <ListItem key={item.clothDetailName} {...item} />
                    ))}
                </div> */}

               <div className='cloth-detail-list-wrap'>
                    {currentItems1.map(item => (
                        <div
                            key={item.clothName}
                            className="cloth-item"
                            onClick={() => onItemClickHandler(item.clothNumber)}  // 클릭 시 이동
                        >
                            <ListItem {...item} />
                        </div>
                    ))}
                </div>

                {itemsToShow < clothList.length && (
                    <div className='board-button' onClick={handleLoadMore}>MORE+
                    </div>
                )}
            </div>
        </div>
    )
}
