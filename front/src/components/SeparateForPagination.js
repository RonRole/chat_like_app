import React, { useState, useEffect } from 'react'
import {Pagination} from 'react-bootstrap'
import RenderByCondition from './RenderByCondition'


const SeparateForPagination = ({
    itemLengthPerPage,
    WrapWith,
    className,
    children
}) => {
    const [selectedPage, setSelectedPage] = useState(1)
    //ページ数
    const pageLength = Math.max(Math.ceil(children.length/itemLengthPerPage), 1)
    //ページ分けされているかどうか
    const pageNated = pageLength > 1

    useEffect(() => {
        if(selectedPage > pageLength) {
            setSelectedPage(pageLength)
        }
    },[children])

    return (
        <>
            <WrapWith className={className}>
                {[...Array(itemLengthPerPage)].map((_,index) => {
                    const item = children[itemLengthPerPage*(selectedPage-1)+index]
                    return item
                })}
            </WrapWith>
            <RenderByCondition renderCondition={pageNated}>
                <Pagination>
                    {[...Array(pageLength)].map((_,index) => index+1).map(pageNumber => (
                        <Pagination.Item key={pageNumber} active={selectedPage === pageNumber} onClick = {() => setSelectedPage(pageNumber)}>
                            {pageNumber}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </RenderByCondition>
        </>
    )
}

SeparateForPagination.defaultProps = {
    itemLengthPerPage:3,
    WrapWith:'div',
    className:"",
}

export default SeparateForPagination