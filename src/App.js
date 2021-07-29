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
    },
    "idolHomerAllowedTiers": {
      name: "Meatball",
      action: "homers allowed"
    },
    "timeOffTiers": {
      name: "Breakfast",
      action: ""
    },
    "sunTwoTiers": {
      name: "Doughnut",
      action: "wins set"
    },
    "idolPitcherWinTiers": {
      name: "Hot Fries",
      action: "pitcher wins"
    },
    "idolPitcherLoseTiers": {
      name: "Cold Fries",
      action: "pitcher losses"
    },
    "teamShamedTiers": {
      name: "Lemonade",
      action: "shames against"
    },
    "teamShamingTiers": {
      name: "Taffy",
      action: "shamings"
    },
    "incinerationTiers": {
      name: "Sundae",
      action: "incinerations"
    },
    "consumerTiers": {
      name: "Chum",
      action: "consumer attacks"
    }
  };
  const [tiers, setTiers] = useState(null);
  const [tierType, setTierType] = useState("maxBetTiers");
  const [current, setCurrent] = useState(0);
  const [goal, setGoal] = useState(1000);

  const loadData = async () => {
    const config = await fetch("https://api.sibr.dev/corsmechanics/www.blaseball.com/database/shopSetup");
    const configJson = await config.json();
    setTiers(configJson.snackData);
  };

  useEffect(() => {
    loadData();
  }, [])

  useEffect(() => {
    const tier = tiers?.[tierType];
    setCurrent(0);
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
    const denom = marginal ? (goal - current) : parseInt(goal);
    return denom !== 0 ? Math.ceil(calculateTotalPrice() / denom) : 0;
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
          <option value={0} key={0}>{0}</option>
          {tiers && tiers[tierType].map(tier =>
            <option value={tier.amount} key={tier.amount}>{tier.amount}</option>
          )}
        </select>
      </div>
      <div>
        <label>Goal Earning</label>
        <select value={goal} onChange={event => setGoal(event.target.value)}>
          <option value={0} key={0}>{0}</option>
          {tiers && tiers[tierType].map(tier =>
            <option value={tier.amount} key={tier.amount}>{tier.amount}</option>
          )}
        </select>
      </div>
      <h4>Total Price: {calculateTotalPrice()}</h4>
      {!!tierTypes[tierType]?.action && <h4>Breakeven: {`${breakeven(false)} ${tierTypes[tierType]?.action || tierType}`}</h4>}
      {!!tierTypes[tierType]?.action && <h4>Marginal Breakeven: {`${breakeven(true)} ${tierTypes[tierType]?.action || tierType}`}</h4>}
    </div>
  )
}

export default App;
