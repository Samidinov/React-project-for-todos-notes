import React from 'react'
import styled from 'styled-components'

const Header = styled.div`
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        h1 {
            font-size: 26px;
            color: ${props => props.colored ? 'red' : 'black'};
            :hover {
                cursor:pointer;
            }
        }
        h2 {
            font-size: 1.2rem;
            color: grey;
        }
`

const AppHeader = ({allPosts, liked}) => {
    return (
        <Header as='a'>
            <h1>Diiaz Samidinov</h1>
            <h2>{allPosts} записей, из них понровилось {liked}</h2>
        </Header>
    )
}
export default AppHeader;