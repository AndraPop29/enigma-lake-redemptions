import React, { useState } from 'react';
import Button from '@mui/material/Button';
import '../App.css'
import { styled } from '@mui/material/styles';
import logo from '../sweeps-icon.svg';
import Divider from '@mui/material/Divider';
import NumberInput from './NumberInput';
import { RedeemCountProps } from '../Model/RedeemCountProps';

// Styled components
const RoundButton = styled(Button)({
  borderRadius: 50,
  fontWeight: 'bold'
});

// Redeem here component
// This component allows the user to redeem their Sweeps balance
// It sends a request to the server to redeem the user's Sweeps balance
// The user can enter the amount they want to redeem (minimum 10 SC and a maximum of 400 SC)
// After the redemption, the redeem count is updated
const RedeemHere: React.FC<RedeemCountProps> = ({ redeemCount, setRedeemCount }) => {
    const [inputValue, setInputValue] = useState(10.00); 

    const redeemRequest = async () => {
      try {
         await fetch('https://redeem.enigmalakecasino.com/create-redemption-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: 6,
              amount: inputValue,
              bankAccountId: 310
            }),
          });
          setRedeemCount(redeemCount + 1);
      } catch (error) {
        setRedeemCount(redeemCount + 1);
        console.error('Error fetching data:', error);
      }
    };
  
    return (
        <div className="round-container" >
        <div >Redeem here</div>
        <Divider />
        <div className="row-stack-container">
            <div className="column-stack-container">
                <div>Coin</div>
                <div className="sweeps-coin-container">
                <img src={logo} alt="Icon" className="logo" />
                <div>Sweeps</div>
                </div>
            </div>
            <div className="column-stack-container">
                <div className="row-stack-container">    
                <div>Enter your amount</div>
                <div style={{color: '#A9C1DC'}}>(Minim 10 SC)</div>
                </div>
                <div className='input-container'>
                <NumberInput inputValue={inputValue} setInputValue={setInputValue} />
                </div>
            </div>
        </div>
        <RoundButton onClick={redeemRequest} variant="contained">Redeem Now</RoundButton>
        </div>
    );
}

export default RedeemHere;