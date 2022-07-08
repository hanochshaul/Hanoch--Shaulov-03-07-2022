
import { Input } from '@mui/material';
import styled  from 'styled-components';

const StyledSerachContainer = styled.div`
width: 70%;
  display: flex;
  justify-content: center;

.search-bar{
    background-color: ${props => props.theme.bgButton};
}
    
    .search-input{
        display: flex;
        justify-content: center;
        align-items: center;
       
        input {
            padding-left:10px;
            border:0;
            font-size:18px;
            background:transparent;
            color:${props => props.theme.textColor};
            font-family: "AvertaStd-Thin";
            margin-right:10px;
            :focus,:active{
                outline:none;
            }
            ::placeholder{
                color:${props => props.theme.textColor};
                opacity:1;
                font-size: 18px;
            }
        }
        .gray-border{
            color:${props => props.theme.textColor};
            border-radius:50px;
            height:30px;
            width:30px;
            padding:5px;
            background:${props => props.theme.bgContent};
            cursor:pointer;
            @media(max-width:480px){
                height: 45px;
                width: 45px;
                padding: 9px;
                font-size: 25px;
                flex:1;
            }
        }
        .search-color{
            color:${props => props.theme.textColor};
            // searchIcon {
                height: 40px;
                width: 20px;
                // background-color: white;
                display: grid;
                place-items: center;
            //   }
            // @media(max-width:480px){
            //     font-size:28px;
            //     flex:1;
            // }
        }
    }
//  .search__box{
//     @media(max-width:480px){
//         flex:14;
//     }
//  }   

    

.error{
    font-size:16px;
    color:red;
}

    
`;







export  {StyledSerachContainer };