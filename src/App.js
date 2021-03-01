import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
  const tierTypes = { "maxBetTiers": "Snake Oil", "teamWinCoinTiers": "Popcorn", "teamLossCoinTiers": "Stale Popcorn", "idolHitsTiers": "Sunflower Seeds", "idolHomersTiers": "Hot Dog", "idolStrikeoutsTiers": "Chips", "idolShutoutsTiers": "Burger" };
  const [tiers, setTiers] = useState(null);
  const [tierType, setTierType] = useState("maxBetTiers");
  const [current, setCurrent] = useState(0);
  const [goal, setGoal] = useState(1000);

  const loadData = async () => {
    const config = await fetch(`${process.env.PUBLIC_URL}/config.json`);
    const configJson = await config.json();
    setTiers(configJson);
  };

  useEffect(() => {
    loadData();
  }, [])

  useEffect(() => {
    const tier = tiers?.[tierType];
    setCurrent(tier?.[0].amount);
    setGoal(tier?.[tier?.length - 1].amount);
  }, [tierType, tiers]);

  const calculateTotalPrice = () => {
    let price = 0;
    tiers?.[tierType].forEach(tier => {
      if (tier.amount > current && tier.amount <= goal) {
        price += tier.price;
      }
    });
    return price;
  };

  const breakeven = () => {
    return Math.ceil(calculateTotalPrice() / goal);
  };


  return (
    <div className="container">
      <div>
        <label>Snack</label>
        <select value={tierType} onChange={event => setTierType(event.target.value)}>
          {tiers && Object.keys(tiers).map(tierType =>
            <option value={tierType} key={tierType}>{tierTypes[tierType] || tierType}</option>
          )}
        </select>
      </div>
      <div>
        <label>Current Earning</label>
        <select value={current} onChange={event => setCurrent(event.target.value)}>
          {tiers && tiers[tierType].map(tier =>
            <option value={tier.amount} key={tier.amount}>{tier.amount}</option>
          )}
        </select>
      </div>
      <div>
        <label>Goal Earning</label>
        <select value={goal} onChange={event => setGoal(event.target.value)}>
          {tiers && tiers[tierType].map(tier =>
            <option value={tier.amount} key={tier.amount}>{tier.amount}</option>
          )}
        </select>
      </div>
      <h4>Total Price: {calculateTotalPrice()}</h4>
      {tierType !== 'maxBetTiers' && <h4>Breakeven: {`${breakeven()} ${tierTypes[tierType] || tierType}`}</h4>}
    </div>
  )
}

export default App;
