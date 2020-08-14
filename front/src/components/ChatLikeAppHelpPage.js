import React from 'react'
import { Carousel, Image } from 'react-bootstrap'
import Size from '../style-components/Size'
import styled from 'styled-components'

const StyledImageWrapper = styled.div`
    width:100%;
    height:calc(100vh - 56px);
    display:flex;
    justify-content: center;
    align-items: center;
    background-color:rgba(0,0,0,0.8);
`

const StyledImage = styled(Image)`
    width:80%;
    display:block;
    opacity: 0.5;
    position: absolute;
    object-fit:contain;
`

const ChatLikeAppHelpPage = ({
    ...props
}) => {
    return (
        <Carousel {...props}z>
            <Carousel.Item >
                <StyledImageWrapper>
                    <StyledImage src={`${process.env.PUBLIC_URL}/pictures/create_user.png`} alt='sawai' />
                </StyledImageWrapper>
                <Carousel.Caption>
                    <p>「Sign Up」リンクから新規登録画面に移動し、アカウントを作成します。</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
                <StyledImageWrapper>
                    <StyledImage src={`${process.env.PUBLIC_URL}/pictures/move_to_talkrooms.png`} alt='sawai' />
                </StyledImageWrapper>
                <Carousel.Caption>
                    <p>「Talk Rooms」リンクからトークルーム一覧画面に移動します。</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
                <StyledImageWrapper>
                    <StyledImage src={`${process.env.PUBLIC_URL}/pictures/move_to_talkrooms.png`} alt='sawai' />
                </StyledImageWrapper>
                <Carousel.Caption>
                    <p>「管理ルーム」ボタンをクリックし、表示を管理ルーム一覧に変更します。</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
                <StyledImageWrapper>
                    <StyledImage src={`${process.env.PUBLIC_URL}/pictures/add_talk_room.png`} alt='sawai' />
                </StyledImageWrapper>
                <Carousel.Caption>
                    <p>「トークルーム追加」アイコンをクリックします。</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
                <StyledImageWrapper>
                    <StyledImage src={`${process.env.PUBLIC_URL}/pictures/add_talkroom_form.png`} alt='sawai' />
                </StyledImageWrapper>
                <Carousel.Caption>
                    <p>トークルーム作成フォームが表示されるので、必要情報を入力してトークルームを作成します。</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
                <StyledImageWrapper>
                    <StyledImage src={`${process.env.PUBLIC_URL}/pictures/add_user.png`} alt='sawai' />
                </StyledImageWrapper>
                <Carousel.Caption>
                    <p>作成されたトークルームの「ユーザー追加」アイコンをクリックします。</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
                <StyledImageWrapper>
                    <StyledImage src={`${process.env.PUBLIC_URL}/pictures/search_user.png`} alt='sawai' />
                </StyledImageWrapper>
                <Carousel.Caption>
                    <p>トークルームに追加したいユーザーの「ユーザーID」と「ユーザー名」を入力し、「さがす」ボタンをクリックします。</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
                <StyledImageWrapper>
                    <StyledImage src={`${process.env.PUBLIC_URL}/pictures/add_user_form.png`} alt='sawai' />
                </StyledImageWrapper>
                <Carousel.Caption>
                    <p>ユーザーが存在すれば確認画面が現れます。「誘う」ボタンをクリックし、ユーザーをトークルームのメンバーに追加します。</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
                <StyledImageWrapper>
                    <StyledImage src={`${process.env.PUBLIC_URL}/pictures/invited_user_talkrooms.png`} alt='sawai' />
                </StyledImageWrapper>
                <Carousel.Caption>
                    <p>誘われたユーザーの「参加ルーム」にトークルームが追加されます。</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
                <StyledImageWrapper>
                    <StyledImage src={`${process.env.PUBLIC_URL}/pictures/chatting.png`} alt='sawai' />
                </StyledImageWrapper>
                <Carousel.Caption>
                    <p>あとはトークルームに「入室」してチャットをするだけです。</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        
    )
}

export default ChatLikeAppHelpPage