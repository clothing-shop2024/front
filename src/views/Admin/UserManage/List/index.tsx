import React from 'react'

export default function UserManageList() {
    return (
        <div>
            <div className='list-table-search-box'>
                <div className='list-table-search-input-box'>
                    <input className='list-table-search-input' placeholder='검색어를 입력하세요.'/>
                </div>
                <div>검색</div>
            </div>
            <div>
                <div className='list-table-top'>
                    <div className='list-table-total-board'>전체<span className='emphasis'> 건</span> | 페이지<span className='emphasis'>  / </span>
                    </div>
                </div>
                <div>
                    <div>신규 회원</div>
                    <div>오래된 회원</div>
                    <div>주문순</div>
                </div>
            </div>
        </div>
    )
}
