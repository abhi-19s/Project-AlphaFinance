import React, { useState } from 'react';
import './Income.css';

const taxData = {
  "AY 2024-2025": {
    standardDeduction: 50000,
    taxSlabs: [
      [0, 300000, 0],
      [300001, 600000, 5],
      [600001, 900000, 10],
      [900001, 1200000, 15],
      [1200001, 1500000, 20],
      [1500001, Infinity, 30],
    ],
    rebateLimit: 700000,
  },
  "AY 2025-2026": {
    standardDeduction: 75000,
    taxSlabs: [
      [0, 300000, 0],
      [300001, 700000, 5],
      [700001, 1000000, 10],
      [1000001, 1200000, 15],
      [1200001, 1500000, 20],
      [1500001, Infinity, 30],
    ],
    rebateLimit: 700000,
  },
  "AY 2026-2027": {
    standardDeduction: 75000,
    taxSlabs: [
      [0, 400000, 0],
      [400001, 800000, 5],
      [800001, 1200000, 10],
      [1200001, 1600000, 15],
      [1600001, 2000000, 20],
      [2000001, 2400000, 25],
      [2400001, Infinity, 30],
    ],
    rebateLimit: 1200000,
  }
};

export const Income = () => {
  // State for form inputs
  const [assessmentYear, setAssessmentYear] = useState('2025-2026');
  const [income, setIncome] = useState('');
  const [npsContribution, setNpsContribution] = useState('');
  const [applyStandardDeduction, setApplyStandardDeduction] = useState(true);
  const [otherDeductions, setOtherDeductions] = useState('');

  // State for results (example structure)
  const [results, setResults] = useState(null);

  // --- Event Handlers ---
  const handleAssessmentYearChange = (event) => {
    setAssessmentYear(event.target.value);
  };

  const handleInputChange = (setter) => (event) => {
    // Basic validation to allow only numbers (optional)
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setter(value);
    }
  };

  const handleCheckboxChange = (event) => {
    setApplyStandardDeduction(event.target.checked);
  };

  const handleCalculate = (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log("Calculating tax with:", {
      assessmentYear,
      income,
      npsContribution,
      applyStandardDeduction,
      otherDeductions,
    });
    // Get tax data for selected year
    const yearData = taxData[`AY ${assessmentYear}`];

    // Convert string inputs to numbers
    const totalIncome = Number(income) || 0;
    const npsAmount = Number(npsContribution) || 0;
    const otherDeductionsAmount = Number(otherDeductions) || 0;

    // Calculate taxable income
    let taxableIncome = totalIncome;

    // Apply standard deduction if checked
    if (applyStandardDeduction) {
      taxableIncome -= yearData.standardDeduction;
    }

    // Apply NPS and other deductions
    taxableIncome -= (npsAmount + otherDeductionsAmount);

    // Ensure taxable income doesn't go below 0
    taxableIncome = Math.max(0, taxableIncome);

    // Calculate tax based on slabs
    let totalTax = 0;

    // Apply rebate if income is below rebate limit
    if (taxableIncome <= yearData.rebateLimit) {
      totalTax = 0;
    } else {
      for (const [min, max, rate] of yearData.taxSlabs) {
        if (taxableIncome > min) {
          const slabAmount = Math.min(max - min, taxableIncome - min);
          totalTax += (slabAmount * rate) / 100;
        }
      }
    }

    // Calculate tax percentage of total income
    const taxPercentage = totalIncome > 0 ? ((totalTax / totalIncome) * 100) : 0;

    setResults({
      newRegime: {
        tax: Math.round(totalTax),
        percentage: Number(taxPercentage.toFixed(1)),
      },
    });
  };

  const formatCurrency = (amount) => {
    // Simple INR formatting, consider using Intl.NumberFormat for robustness
    return `₹${Number(amount).toLocaleString('en-IN')}`;
  }

  // --- Render ---
  return (
    <div className="taxCalculatorContainer">
      <form className="taxForm" onSubmit={handleCalculate}>
        {/* Assessment Year */}
        <fieldset className="formGroup">
          <div className="radioOption">
            <input
              type="radio"
              id="ay2425"
              name="assessmentYear"
              value="2024-2025"
              checked={assessmentYear === '2024-2025'}
              onChange={handleAssessmentYearChange}
            />
            <label htmlFor="ay2425">AY 2024-2025 (This year)</label>
          </div>
          <div className="radioOption">
            <input
              type="radio"
              id="ay2526"
              name="assessmentYear"
              value="2025-2026"
              checked={assessmentYear === '2025-2026'}
              onChange={handleAssessmentYearChange}
            />
            <label htmlFor="ay2526">AY 2025-2026 (Next year)</label>
          </div>
          <div className="radioOption">
            <input
              type="radio"
              id="ay2627"
              name="assessmentYear"
              value="2026-2027"
              checked={assessmentYear === '2026-2027'}
              onChange={handleAssessmentYearChange}
            />
            <label htmlFor="ay2627">AY 2026-2027 (According to latest budget 2025)</label>
          </div>
        </fieldset>

        {/* Income */}
        <div className="formGroup">
          <label htmlFor="income">Income</label>
          <input
            type="text"
            id="income"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="eg, 700000"
            value={income}
            onChange={handleInputChange(setIncome)}
            required
          />
        </div>

        {/* Employer's Contribution to NPS */}
        <div className="formGroup">
          <label htmlFor="npsContribution">Employer's contribution to NPS</label>
          <input
            type="text"
            id="npsContribution"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="eg, 100000"
            value={npsContribution}
            onChange={handleInputChange(setNpsContribution)}
          />
        </div>

        {/* Standard Deduction */}
        <div className="formGroup checkboxGroup">
          <div className="checkboxWrapper">
            <input
              type="checkbox"
              id="standardDeduction"
              checked={applyStandardDeduction}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="standardDeduction">
              Apply standard deduction (only salaried income)
            </label>
          </div>
        </div>

        {/* Other Deductions */}
        <div className="formGroup">
          <label htmlFor="otherDeductions">Other Deductions</label>
          <input
            type="text"
            id="otherDeductions"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="eg, 150000"
            value={otherDeductions}
            onChange={handleInputChange(setOtherDeductions)}
          />
        </div>

        {/* Calculate Button */}
        <button type="submit" className="calculateButton">
          Calculate
        </button>

        {/* Disclaimer */}
        <div className="disclaimer">
          <p>Results may vary. These are just approximated values.</p>
        </div>
      </form>

      {/* --- Results Section --- */}
      {results && (
        <div className="resultsSection">
          {/* New Tax Regime Card */}
          <div className="resultCard newRegime">
            <div className="cardHeader">
              <h3>New tax regime</h3>
            </div>
            <div className="cardBody">
              <p className="taxAmount">{formatCurrency(results.newRegime.tax)}</p>
              <p className="taxPercentage">{results.newRegime.percentage}% of income</p>
              {/* Basic progress bar representation */}
              <div className="progressBarContainer">
                <div className="progressBar" style={{ width: `${results.newRegime.percentage * 5}%` }}></div> {/* Adjust multiplier as needed */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
