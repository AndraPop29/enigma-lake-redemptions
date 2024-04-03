import React, { ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './NumberInput.css'

// Styled components
const RoundButton = styled(Button)({
  borderRadius: 20,
  fontSize: 10,
  fontWeight: 'bold'
});

interface NumberProps {
  inputValue: number,
  setInputValue: React.Dispatch<React.SetStateAction<number>>
}

// Number input component 
// User can input value (between 10 SC and 400 SC)
const NumberInput: React.FC<NumberProps> = ({ inputValue, setInputValue }) => {

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Validation for the input field
    // If the input is not a number or less than 10, set the input value to 10
    if ((Number.isNaN(parseFloat(event.target.value))) || (parseFloat(event.target.value) < 10) ) {
      setInputValue(10)
    // If the input is greater than 400, set the input value to 400
    } else if(parseFloat(event.target.value) > 400) {
      setInputValue(400);
    } else {
      setInputValue(parseFloat(event.target.value));
    }
  };

  const setMaxValue = () => {
    setInputValue(400.0);
  }

  return (
    <div>
      <div className='inputContainer'>
        <input
          type='number'
          step="0.1"
          value={inputValue}
          onChange={handleNumberChange}
          min={10}
          max={400}
        />
         <RoundButton onClick={setMaxValue} variant="contained">Max</RoundButton>
      </div>
    </div>
  );
};

export default NumberInput;
