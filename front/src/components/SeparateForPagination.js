import React from 'react'

const SeparateForPagination = ({
    itemLengthPerPage,
    selectedPage,
    WrapWith,
    className,
    children,
}) => {
    return (
        <WrapWith className={className}>
            {[...Array(itemLengthPerPage)].map((_,index) => (
                children[itemLengthPerPage*(selectedPage-1)+index]
            ))}
        </WrapWith>
    )
}

SeparateForPagination.defaultProps = {
    itemLengthPerPage:3,
    selectedPage:1,
    WrapWith:'div',
    className:"",
}

export default SeparateForPagination