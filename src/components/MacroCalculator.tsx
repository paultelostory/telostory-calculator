import React, { useState } from 'react';

const MacroCalculator = () => {
  const [calculatorData, setCalculatorData] = useState({
    gender: '',
    age: '',
    weight: '',
    heightFt: '',
    heightIn: '',
    activity: 'sedentary',
    goal: 'cutting'
  });

  const [results, setResults] = useState<{
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  } | null>(null);

  const calculateMacros = () => {
    const heightInches = (parseInt(calculatorData.heightFt) * 12) + parseInt(calculatorData.heightIn);
    const heightCm = heightInches * 2.54;
    const weightKg = parseFloat(calculatorData.weight) * 0.453592;
    const ageNum = parseFloat(calculatorData.age);

    let bmr;
    if (calculatorData.gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
    }

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      heavy: 1.725
    };

    let tdee = bmr * activityMultipliers[calculatorData.activity as keyof typeof activityMultipliers];

    let calories = tdee;
    if (calculatorData.goal === 'cutting') {
      calories = tdee - 500;
    } else if (calculatorData.goal === 'bulking') {
      calories = tdee + 500;
    }

    const protein = parseFloat(calculatorData.weight);
    const fat = (calories * 0.25) / 9;
    const carbs = (calories - (protein * 4 + fat * 9)) / 4;

    setResults({
      calories: Math.round(calories),
      protein: Math.round(protein),
      fat: Math.round(fat),
      carbs: Math.round(carbs)
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-['Montserrat'] text-3xl font-bold text-white mb-4">
          Telostory Macro Calculator
        </h1>
      </div>

      {/* Calculator Content */}
      <div className="space-y-6">
        {/* Personal Information Section */}
        <div className="bg-[#1A202C] rounded-lg p-6 shadow-lg">
          <h2 className="text-[#4FD1C5] text-lg font-bold mb-6">Personal Information & Stats</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-white mb-3 font-bold">Gender</label>
              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={calculatorData.gender === 'male'}
                    onChange={(e) => setCalculatorData({...calculatorData, gender: e.target.value})}
                    className="mr-2 accent-[#4FD1C5]"
                  />
                  <span className="text-white">Male</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={calculatorData.gender === 'female'}
                    onChange={(e) => setCalculatorData({...calculatorData, gender: e.target.value})}
                    className="mr-2 accent-[#4FD1C5]"
                  />
                  <span className="text-white">Female</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-white mb-2 font-bold">Age</label>
                <input
                  type="number"
                  className="w-full p-3 rounded bg-[#2D3748] border border-[#4A5568] text-white focus:border-[#4FD1C5] focus:ring-1 focus:ring-[#4FD1C5] transition-colors"
                  value={calculatorData.age}
                  onChange={(e) => setCalculatorData({...calculatorData, age: e.target.value})}
                  placeholder="Years"
                />
              </div>
              <div>
                <label className="block text-white mb-2 font-bold">Weight</label>
                <input
                  type="number"
                  className="w-full p-3 rounded bg-[#2D3748] border border-[#4A5568] text-white focus:border-[#4FD1C5] focus:ring-1 focus:ring-[#4FD1C5] transition-colors"
                  value={calculatorData.weight}
                  onChange={(e) => setCalculatorData({...calculatorData, weight: e.target.value})}
                  placeholder="lbs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-white mb-2 font-bold">Height</label>
                  <input
                    type="number"
                    className="w-full p-3 rounded bg-[#2D3748] border border-[#4A5568] text-white focus:border-[#4FD1C5] focus:ring-1 focus:ring-[#4FD1C5] transition-colors"
                    value={calculatorData.heightFt}
                    onChange={(e) => setCalculatorData({...calculatorData, heightFt: e.target.value})}
                    placeholder="ft"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">&nbsp;</label>
                  <input
                    type="number"
                    className="w-full p-3 rounded bg-[#2D3748] border border-[#4A5568] text-white focus:border-[#4FD1C5] focus:ring-1 focus:ring-[#4FD1C5] transition-colors"
                    value={calculatorData.heightIn}
                    onChange={(e) => setCalculatorData({...calculatorData, heightIn: e.target.value})}
                    placeholder="in"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Level Section */}
        <div className="bg-[#1A202C] rounded-lg p-6 shadow-lg">
          <h2 className="text-[#4FD1C5] text-lg font-bold mb-6">Daily Activity Level</h2>
          <div className="space-y-4">
            {[
              { value: 'sedentary', label: 'Sedentary (Office job, little to no exercise)' },
              { value: 'light', label: 'Light Activity (1-2 days/week of exercise)' },
              { value: 'moderate', label: 'Moderate Exercise (3-5 days/week)' },
              { value: 'heavy', label: 'Heavy Exercise (6-7 days/week)' }
            ].map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="activity"
                  value={option.value}
                  checked={calculatorData.activity === option.value}
                  onChange={(e) => setCalculatorData({...calculatorData, activity: e.target.value})}
                  className="mr-3 accent-[#4FD1C5]"
                />
                <span className="text-white">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Goals Section */}
        <div className="bg-[#1A202C] rounded-lg p-6 shadow-lg">
          <h2 className="text-[#4FD1C5] text-lg font-bold mb-6">Describe Your Goal</h2>
          <div className="grid grid-cols-2 gap-6">
            {[
              { 
                value: 'cutting', 
                label: 'Cutting (weight loss)',
                description: 'I want to burn fat and retain muscle'
              },
              { 
                value: 'bulking', 
                label: 'Bulking (muscle gain)',
                description: 'I want to build muscle and increase mass'
              }
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-start p-4 rounded border border-[#2D3748] cursor-pointer hover:border-[#4FD1C5] transition-colors"
              >
                <input
                  type="radio"
                  name="goal"
                  value={option.value}
                  checked={calculatorData.goal === option.value}
                  onChange={(e) => setCalculatorData({...calculatorData, goal: e.target.value})}
                  className="mr-3 mt-1 accent-[#4FD1C5]"
                />
                <div>
                  <div className="text-white font-bold">{option.label}</div>
                  <div className="text-sm text-gray-400 mt-1">{option.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={calculateMacros}
          className="w-full p-4 bg-[#4FD1C5] text-white rounded-lg hover:bg-[#45B8AC] transition-colors font-bold tracking-wide shadow-lg"
        >
          Calculate My Macros
        </button>

        {results && (
          <div className="bg-[#1A202C] rounded-lg p-6 shadow-lg">
            <h2 className="text-[#4FD1C5] text-xl font-bold text-center mb-8">Your Custom Macro Plan</h2>
            <div className="grid grid-cols-4 gap-6">
              {[
                { label: 'Calories', value: results.calories },
                { label: 'Protein', value: `${results.protein}g` },
                { label: 'Carbs', value: `${results.carbs}g` },
                { label: 'Fat', value: `${results.fat}g` }
              ].map((result) => (
                <div key={result.label} className="text-center">
                  <div className="text-gray-400 mb-2 font-bold">{result.label}</div>
                  <div className="text-2xl text-white font-bold">{result.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MacroCalculator;