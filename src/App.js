import './App.css';
import React, { useState } from 'react';

function App() {
  const [heightinputValue, setHeightInputValue] = useState('');
  const [weightinputValue, setWeightInputValue] = useState('');
  const [bmivalue, setBmiValue] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleWeightChange = (event) => {
    const value = event.target.value;
    // Allow only positive numbers and decimals
    if (/^\d*\.?\d*$/.test(value)) {
      setWeightInputValue(value);
    }
  };

  const handleHeightChange = (event) => {
    const value = event.target.value;
    // Allow only positive numbers and decimals
    if (/^\d*\.?\d*$/.test(value)) {
      setHeightInputValue(value);
    }
  };

  const calculateBMI = () => {
    const weight = parseFloat(weightinputValue);
    const height = parseFloat(heightinputValue);

    if (weight > 0 && height > 0) {
      const bmi = (weight * 703) / (height * height);
      setBmiValue(bmi.toFixed(2)); // Format BMI to 2 decimal places
      setBmiCategory(getBMICategory(bmi));
    } else {
      setBmiValue(null);
      setBmiCategory('');
    }
    setHasCalculated(true); // Indicate that the user has clicked Calculate
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 25) return 'Normal weight';
    if (bmi >= 25 && bmi < 30) return 'Overweight';
    if (bmi >= 30) return 'Obesity';
    return '';
  };

  const resetFields = () => {
    setWeightInputValue('');
    setHeightInputValue('');
    setBmiValue(null);
    setBmiCategory('');
    setHasCalculated(false); // Reset calculation state
  };

  return (
    <div className="App">
      <h1>BMI Calculator</h1>
      <div className="bmi-container">
        <div className="weightcontainer">
          <div className="wrightheading">Weight (lbs)</div>
          <div className="weightinput">
            <input
              type="number"
              value={weightinputValue}
              onChange={handleWeightChange}
              placeholder="Enter weight in lbs"
              min="0"
              step="0.1"
            />
          </div>
        </div>
        <div className="heightcontainer">
          <div className="heightheading">Height (in)</div>
          <div className="heightinput">
            <input
              type="number"
              value={heightinputValue}
              onChange={handleHeightChange}
              placeholder="Enter height in inches"
              min="0"
              step="0.1"
            />
          </div>
        </div>
       <div className="btncontainer">
        <button className="bmicalculate" type="button" onClick={calculateBMI}>
            Calculate
          </button>
          <button className="reload" type="button" onClick={resetFields}>
            Reload
          </button>
       </div>
        {bmivalue !== null ? (
          <div>
            <p className="bmiresult">
              Your BMI Value is: {bmivalue}
            </p>
            <p className="bmisection">
              Category: {bmiCategory}
            </p>
          </div>
        ) : hasCalculated && (
          <div>
            <p className="bmiresult">
              Please enter valid values to calculate BMI.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
