import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import logo from '../sweeps-icon.svg';
import { styled } from '@mui/material/styles';
import { Redemption } from '../Model/Redemption'; 
import { RedemptionDTO } from '../Model/RedemptionDTO';
import { RedeemCountProps } from '../Model/RedeemCountProps';

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.palette.common.white,
  })
);

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#2B4C79',
  fontSize: 16,
  fontWeight: 'bold',
  color: theme.palette.common.white,
}));

const StyledTableSubHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#1D3E6B',
  fontSize: 14,
  fontWeight: 'bold',
  color: '#A9C1DC',
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#2B4C79',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#1D3E6B',
  },
  '&:last-child td, &:last-child th': {
    borderWidth: 0,
  },
  '& td,th': {
    borderWidth: 0.1,
    borderColor: '#11315D'
  },
}));

const StyledHeaderRow = styled(TableRow)(() => ({
  '& td,th': {
    borderWidth: 0.1,
    borderColor: '#11315D'
  },
}));

const StyledTable = styled(TableContainer)(() => ({
  borderRadius: 20,
}));

// Mock data for the table, used when request fails
const mockTableData: RedemptionDTO[] = [
{"redemptionIntentId":7,"createdAt":"2024-01-05 01:36:47","amount":26.31,"redemptionStatus":0,"redeemableFundsStatus":1,"paymentStatus":0},
{"redemptionIntentId":9,"createdAt":"2024-01-05 01:36:47","amount":26.31,"redemptionStatus":0,"redeemableFundsStatus":1,"paymentStatus":0},
{"redemptionIntentId":8,"createdAt":"2024-01-05 01:36:47","amount":26.31,"redemptionStatus":0,"redeemableFundsStatus":1,"paymentStatus":0},
{"redemptionIntentId":1,"createdAt":"2024-01-05 01:36:47","amount":26.31,"redemptionStatus":0,"redeemableFundsStatus":1,"paymentStatus":0},
{"redemptionIntentId":3,"createdAt":"2024-01-05 01:36:47","amount":26.31,"redemptionStatus":0,"redeemableFundsStatus":1,"paymentStatus":0},
{"redemptionIntentId":10,"createdAt":"2024-01-05 01:36:47","amount":26.31,"redemptionStatus":0,"redeemableFundsStatus":1,"paymentStatus":0},
{"redemptionIntentId":4,"createdAt":"2024-01-05 01:36:47","amount":26.31,"redemptionStatus":0,"redeemableFundsStatus":1,"paymentStatus":0},
{"redemptionIntentId":11,"createdAt":"2024-01-05 01:36:47","amount":26.31,"redemptionStatus":0,"redeemableFundsStatus":1,"paymentStatus":0},
{"redemptionIntentId":5,"createdAt":"2024-01-05 01:36:47","amount":26.31,"redemptionStatus":0,"redeemableFundsStatus":1,"paymentStatus":0}];

// RedemptionsTable component
// Fetches data from the API and displays it in a table, when the page is loaded and after a redemption
// If the request fails, it displays mock data (just for testing purposes and to avoid breaking the app) - this should be removed in a real app
const RedemptionsTable: React.FC<RedeemCountProps> = ({ redeemCount, setRedeemCount }) => {

  const [responseData, setResponseData] = useState<Redemption[]>([]);

  useEffect(() => {
  const fetchData = async () => {
      try {
        const response = await fetch('https://redeem.enigmalakecasino.com/retrieve-redemption-intent/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify({
              userId: 6
            }),
          });
          const data: RedemptionDTO[] = await response.json();
          let redemptions: Redemption[] = data.map (redemption => new Redemption(redemption)) as Redemption[];
          setResponseData(redemptions);
      } catch (error) {
        let mockRedemptions: Redemption[] = mockTableData.map (redemption => new Redemption(redemption)) as Redemption[];
        setResponseData(mockRedemptions)
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [redeemCount]);

  return (
    <StyledTable sx={{ maxHeight: 400 }}>
      <Table sx={{ minWidth: 1000 }} stickyHeader aria-label="redemptions table">
        <TableHead>
          <StyledHeaderRow>
            <StyledTableHeaderCell align="center" colSpan={6}>Redemptions</StyledTableHeaderCell>
          </StyledHeaderRow>
          <StyledHeaderRow>
            <StyledTableSubHeaderCell>Date</StyledTableSubHeaderCell>
            <StyledTableSubHeaderCell>Sweeps</StyledTableSubHeaderCell>
            <StyledTableSubHeaderCell>Amount</StyledTableSubHeaderCell>
            <StyledTableSubHeaderCell>Redemption Status</StyledTableSubHeaderCell>
            <StyledTableSubHeaderCell>Redeemable Sweeps</StyledTableSubHeaderCell>
            <StyledTableSubHeaderCell>Payment</StyledTableSubHeaderCell>
          </StyledHeaderRow>
        </TableHead>
        <TableBody>
          {responseData.map((row) => (                 
            <StyledTableRow key={row.redemptionIntentId}>
              <StyledTableCell component="th" scope="row">{row.dateString()}</StyledTableCell>
              <StyledTableCell >
                <div style={{fontWeight: 'bold', color: '#0DE83D'}} className="icon-value">
                    <div>{row.sweeps}</div>
                    <img src={logo} alt="Icon" className="logo" />
                </div>
              </StyledTableCell>
              <StyledTableCell >{row.amount}</StyledTableCell>
              <StyledTableCell >
                <div style={{fontWeight: 'bold'}} className="icon-value">
                  <div className={row.redemptionStatusString() === "Submitted" ? "green-circle" : ""} ></div>
                  {row.redemptionStatusString()}
                </div>
              </StyledTableCell>
              <StyledTableCell >{row.redeemableFundsStatusString()}</StyledTableCell>
              <StyledTableCell>
                <div style={{fontWeight: 'bold'}} className="icon-value">
                  <div className={row.paymentStatusString() === "Pending" ? "orange-circle" : ""} ></div>
                  {row.paymentStatusString()}
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTable>
  );
}

export default RedemptionsTable;