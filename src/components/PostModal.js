import React from 'react'
import styled from 'styled-components'

function PostModal(props) {
    return (
        <Container>
            <Content>
                Content
            </Content>
        </Container>
    )
}

export default PostModal

const Container = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
    color: black;
    background: rgba(0, 0, 0, 0.8);
`
const Content = styled.div`

`