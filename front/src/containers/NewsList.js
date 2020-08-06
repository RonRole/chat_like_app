import React, { useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import UserHeader from '../components/UserHeader'
import NewsActions from '../modules/newsModule/NewsActions'

const NewsList = ({
    ...props
}) => {
    const news = useSelector(state=>state.news.receivedNews)
    const users = useSelector(state=>state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(NewsActions.fetchReceivedNews())
    }, [])
    return (
        <ListGroup {...props}>
            {news.map((newsItem,index) => (
                <ListGroup.Item key={index}>
                    <UserHeader userImageUrl={(users[newsItem.sender_id] || users[0]).image.thumb.url} userName={(users[newsItem.sender_id] || users[0]).name}/>
                    <div>{newsItem.description}</div>
                    <div>{newsItem.created_at}</div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export default NewsList
