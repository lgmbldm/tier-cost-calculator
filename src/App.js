import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
  const tierTypes = {
    "maxBetTiers": {
      name: "Snake Oil",
      action: ""
    },
    "teamWinCoinTiers": {
      name: "Popcorn",
      action: "wins"
    },
    "teamLossCoinTiers": {
      name: "Stale Popcorn",
      action: "losses"
    },
    "idolHitsTiers": {
      name: "Sunflower Seeds",
      action: "hits"
    },
    "idolHomersTiers": {
      name: "Hot Dog",
      action: "homers"
    },
    "idolStrikeoutsTiers": {
      name: "Chips",
      action: "strikeouts"
    },
    "idolShutoutsTiers": {
      name: "Burger",
      action: "shutouts"
    },
    "floodClearTiers": {
      name: "Slushie",
      action: "cleared baserunners"
    },
    "blackHoleTiers": {
      name: "Wet Pretzel",
      action: "swallowed wins"
    },
    "idolStealTiers": {
      name: "Pickles",
      action: "steals"
    }
  };
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

  const breakeven = (marginal) => {
    return Math.ceil(calculateTotalPrice() / (marginal ? (goal - current) : goal));
  };


  return (
    <div className="container">
      <div>
        <label>Snack</label>
        <select value={tierType} onChange={event => setTierType(event.target.value)}>
          {tiers && Object.keys(tiers).map(tierType =>
            <option value={tierType} key={tierType}>{tierTypes[tierType]?.name || tierType}</option>
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
      {tierType !== 'maxBetTiers' && <h4>Breakeven: {`${breakeven(false)} ${tierTypes[tierType]?.action || tierType}`}</h4>}
      {tierType !== 'maxBetTiers' && <h4>Marginal Breakeven: {`${breakeven(true)} ${tierTypes[tierType]?.action || tierType}`}</h4>}
    </div>
  )
}

export default App;
