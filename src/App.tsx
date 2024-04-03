import RedemptionsTable from './Components/RedemptionsTable';
import Stack from '@mui/material/Stack';
import RedeemHere from './Components/RedeemHere';
import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import SweepsBalance from './Components/SweepsBalance';

const App = () => {

  const [redeemCount, setRedeemCount] = useState(0);

  return (
    <div style={{ padding: 150}}>
      <Stack direction="column" spacing={ 2 }>
        <div style={{ padding: 20, background: '#2B4C79', borderRadius: 20}}>
          <div style={{ fontWeight: 'bold', paddingBottom: 10, color: 'white', background: '#2B4C79'}}>
            <div style={{ paddingBottom: 10}}>Redeem</div>
            <div style={{ color: '#A9C1DC'}}>Redeem your Sweeps wins directly to your bank account!</div>
          </div>
          <Divider />
          <Stack sx={{ paddingTop: '10px' }} alignItems="stretch" justifyContent="space-between" spacing={ 2 } direction="row">
            <div style={{width: '50%'}}>
            <SweepsBalance redeemCount={redeemCount} setRedeemCount={setRedeemCount}/>
            </div>
            <RedeemHere redeemCount={redeemCount} setRedeemCount={setRedeemCount} />
          </Stack>
        </div>
        <div><RedemptionsTable redeemCount={redeemCount} setRedeemCount={setRedeemCount}/></div> 
      </Stack>
  </div>
  );
};

export default App;
