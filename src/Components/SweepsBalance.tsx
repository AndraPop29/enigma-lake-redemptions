import React, { useState, useEffect } from 'react';
import '../App.css'
import logo from '../sweeps-icon.svg';
import Divider from '@mui/material/Divider';
import { Balance } from '../Model/Balance'; 
import { RedeemCountProps } from '../Model/RedeemCountProps';

// Sweeps balance component
// This component displays the user's Sweeps balance breakdown
// It fetches the user's balance data from the server, when the page is loaded and after a redemption
const SweepsBalance: React.FC<RedeemCountProps> = ({ redeemCount, setRedeemCount }) =>  {
    const [responseData, setResponseData] = useState<Balance>({depositBalance: 0, totalBalance: 0, winBalance: 0});

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://wallet.enigmalakecasino.com/get-balance', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userId: 6,
              coinType:0
            }),
          });
          const data = await response.json();
          setResponseData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    }, [ redeemCount ]);
  
    return (
        <div className="round-container" >
        <div >Sweeps balance breakdown</div>
        <Divider />
        <div className="column-stack-container">
            <div className="row-stack-container">
                <div style={{color: '#A9C1DC'}}>Win balance (REDEEMABLE):</div>
                <div className="icon-value">
                    <div>{responseData.winBalance}</div>
                    <img src={logo} alt="Icon" className="logo" />
                </div>
            </div>
        <Divider />
            <div className="row-stack-container">
                <div style={{color: '#A9C1DC'}}>DEPOSIT BALANCE:</div>
                <div className="icon-value">
                    <div>{responseData.depositBalance}</div>
                    <img src={logo} alt="Icon" className="logo" />
                </div>
            </div>
        <Divider />
            <div className="row-stack-container">
            <div>Total balance</div>
            <div className="icon-value">
                <div>{responseData.totalBalance}</div>
                <img src={logo} alt="Icon" className="logo" />
            </div>
        </div>
        </div>
        </div>
    );
}

export default SweepsBalance;