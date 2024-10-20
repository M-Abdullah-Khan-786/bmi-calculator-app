import { useState } from 'react';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [bmi, setBMI] = useState(null);
  const [message, setMessage] = useState('');
  const [weightRange, setWeightRange] = useState('');

  const calculateBMI = () => {
    if (weight > 0 && height > 0 && age > 0) {
      const heightInMeters = height / 100;
      const calculatedBMI = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBMI(calculatedBMI);
      determineBMICategory(calculatedBMI, age);
      calculateWeightRange(heightInMeters);
    } else {
      setMessage('Please enter valid values for weight, height, and age.');
      setWeightRange('');
    }
  };

  const determineBMICategory = (bmi, age) => {
    if (age < 18) {
      if (bmi < 18.5) {
        setMessage('Underweight (Youth)');
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        setMessage('Normal weight (Youth)');
      } else if (bmi >= 25 && bmi <= 29.9) {
        setMessage('Overweight (Youth)');
      } else {
        setMessage('Obesity (Youth)');
      }
    } else {
      if (bmi < 18.5) {
        setMessage('Underweight (Adult)');
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        setMessage('Normal weight (Adult)');
      } else if (bmi >= 25 && bmi <= 29.9) {
        setMessage('Overweight (Adult)');
      } else {
        setMessage('Obesity (Adult)');
      }
    }
  };

  const calculateWeightRange = (height) => {
    const normalWeightMin = (18.5 * height * height).toFixed(1);
    const normalWeightMax = (24.9 * height * height).toFixed(1);
    setWeightRange(`Your weight should be in this range: ${normalWeightMin} kg - ${normalWeightMax} kg.`);
  };

  const reset = () => {
    setWeight('');
    setHeight('');
    setAge('');
    setBMI(null);
    setMessage('');
    setWeightRange('');
  };

  return (
    <div className="bmi-calculator">
      <div className="heading-container">
        <h2>BMI Calculator</h2>
      </div>
      <div className="input-container">
        <label>Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Height (cm):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Age (years):</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <button onClick={calculateBMI}>Calculate</button>
      <button onClick={reset}>Reset</button>

      {bmi && (
        <div className="result">
          <h3>Your BMI: {bmi}</h3>
          <h4>{message}</h4>
          <p>{weightRange}</p>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;