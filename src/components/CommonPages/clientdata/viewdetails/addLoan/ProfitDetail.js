import React from 'react'
import styled from 'styled-components'

export default function ProfitDetail() {
  return (
    <Root>Profit Detail
        <div>
           <p>profit:</p>
        </div>
    </Root>
  )
}
const Root = styled.section`
display: flex;
flex-direction: column;
align-items: center;
margin: 10px;
padding: 10px;
gap: 20px;
>div{
  input{
    padding: 5px;
    width: 400px;
    height: 80px;
    border: 1px dashed black;
    border-radius: 10px;
    box-shadow: 1px 1px 5px 1px lightgray;
    outline-offset:2px white;
    /* :focus-visible {
    outline: 1px white;
    outline-offset:2px white;
} */
  }
}
`
