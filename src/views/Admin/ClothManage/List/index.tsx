
import './style.css';


//                    component                    //
export default function ClothMange() {

    //                  render                  //
    return (
        <div>
            <div className='cloth-list-category1-filter'>
                <div>OUTER</div>
                <div>TOP</div>
                <div>BOTTOM</div>
                <div>SKI/OPS</div>
                <div>ACC</div>
            </div>
            <div className='cloth-list-table-search-box'>
                <div className='list-table-search-input-box'>
                    <input
                        className='list-table-search-input'
                        placeholder='검색어를 입력하세요.'
                    />
                </div>
                <div>검색</div>
            </div>
            <div className='cloth-list-table-top'>
                <div className='list-table-top'>
                    <div className='list-table-total-board'>전체<span className='emphasis'> 건</span> | 페이지<span className='emphasis'>  / </span>
                    </div>
                </div>
                <div className='cloth-list-filter'>
                    <div>최신순</div>
                    <div>과거순</div>
                    <div>인기순</div>
                    <div>리뷰순</div>
                    <div>찜순</div>
                </div>
            </div>
        </div>
    )
}
