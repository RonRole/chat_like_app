import React, { useState } from 'react'
import {Pagination} from 'react-bootstrap'


const SeparateForPagination = ({
    itemLengthPerPage,
    WrapWith,
    className,
    children
}) => {
    const [selectedPage, setSelectedPage] = useState(1)
    return (
        <>
            <WrapWith className={className}>
                {[...Array(itemLengthPerPage)].map((_,index) => {
                    const item = children[itemLengthPerPage*(selectedPage-1)+index]
                    return item
                })}
            </WrapWith>
            {[children.length/itemLengthPerPage].filter(length => length > 1).map((_,index) => {
                return (
                    <Pagination key={index}>
                        {[...Array(Math.ceil(children.length/itemLengthPerPage))].map((_,index) => index+1).map(pageNumber => (
                            <Pagination.Item key={pageNumber} active={selectedPage === pageNumber} onClick = {() => setSelectedPage(pageNumber)}>
                                {pageNumber}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                )
            })}
        </>
    )
}

SeparateForPagination.defaultProps = {
    itemLengthPerPage:3,
    selectedPage:1,
    WrapWith:'div',
    className:"",
}

export default SeparateForPagination