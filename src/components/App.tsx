import React, { useState } from 'react';
import './App.css';
import Chart, { IData } from './Chart';

function App() {
  const [mass, setMass] = useState(0);
  const [friction, setFriction] = useState(0);
  const [time, setTime] = useState(0);
  const [graph, showGraph] = useState(false);

  let data: IData[];
  let [heights, times] = bounceHeight(mass, friction, time);

  data = heights.map((height, index) => {
    return {
      time: times[index],
      height: height,
    };
  });

  const getMass = e => {
    setMass(e.currentTarget.value);
    //  console.log(`Mass: ${mass}`);
  };

  const getFrictionCoeffient = e => {
    setFriction(e.currentTarget.value);
    // console.log(`Viscocity: ${friction}`);
    return friction;
  };
  const getAnimationTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(parseInt(e.currentTarget.value));
    // console.log(`Time: ${time}`);
    return time;
  };

  const clearInputs = () => {
    setMass(0);
    setFriction(0);
    setTime(0);
    window.location.reload();
  };
  return (
    <div id="container">
      <header id="header">
        <div id="input-field">
          <label htmlFor="massInput">Mass (g): {mass && mass + 'g'}</label>
          <input
            type="range"
            onBlur={getMass}
            onChange={getMass}
            placeholder="Mass of the ball (g)"
            min="0"
            max="10000"
            id="massInput"
            value={mass}
          />
        </div>
        <div id="input-field">
          <label htmlFor="frictionInput">Fluid Friction: {friction}</label>
          <input
            type="range"
            onBlur={getFrictionCoeffient}
            onChange={getFrictionCoeffient}
            placeholder="Viscocity Coefficient (0-20)"
            min="0"
            max="20"
            id="frictionInput"
            value={friction}
          />
        </div>
        <div id="input-field">
          <label htmlFor="timeInput">
            Animation Time: {time && time + 's'}
          </label>
          <input
            type="range"
            onBlur={getAnimationTime}
            onChange={getAnimationTime}
            placeholder="Animation seconds(0-300)"
            min="0"
            max="300"
            id="timeInput"
            value={time}
          />
        </div>
      </header>
      <div className="field">
        <div id="ball" className="ball">
          <div className="line1"></div>
          <div className="line2"></div>
        </div>
        <div className="chart">{graph && <Chart data={data} />}</div>
      </div>
      <div id="footer">
        <div id="timer">Time: 0.0s</div>
        <button
          onClick={() => FloorBall(mass, friction, time)}
          className="button"
        >
          Bounce
        </button>
        <button className="button" onClick={() => showGraph(!graph)}>
          {graph ? 'Hide' : 'Show'} Graph
        </button>
        <button className="button" onClick={() => clearInputs()}>
          Clear
        </button>
      </div>
    </div>
  );
}

function FloorBall(k, c, tfin) {
  //  Set properties
  let t = 0,
    x = 40,
    xdot = 0,
    xddot = 0,
    dt = 0.01,
    g = 9.81,
    m = 1,
    G = 0;

  function frame() {
    //  Only use ground model if ball is at ground
    if (x > 420) {
      G = -k * (x - 420) - c * xdot;
    } else {
      G = 0;
    }

    //  Acceleration is based on gravity (10m/px) and ground force
    xddot = 10 * g + G / m;

    //  Integrate for velocity
    xdot = xdot + dt * xddot;

    //  Integrate again for height
    x = x + dt * xdot;

    //  Integrate time
    t = t + dt;

    //  Set ball position to x coordinate
    const ball = document.getElementById('ball') as HTMLElement;
    ball.style.top = -95 + x + 'px';

    //  Show time
    const time = document.getElementById('timer') as HTMLElement;
    time.innerHTML = 'Time: ' + t.toFixed(1) + 's';

    //  End condition
    if (t > tfin) {
      clearInterval(id);
    }
  }

  //  Draw every ms
  let id = setInterval(frame, 5);
  return id;
}

function bounceHeight(mass: number, friction: number, animeTime: number) {
  let heights: number[] = [];
  let times: number[] = [];
  //  Set properties
  let t = 0,
    x = 40,
    xdot = 0,
    xddot = 0,
    dt = 0.01,
    g = 9.81,
    m = 1,
    G = 0;

  while (t <= animeTime) {
    //  Only use ground model if ball is at ground
    if (x > 420) {
      G = -mass * (x - 420) - friction * xdot;
    } else {
      G = 0;
    }

    //  Acceleration is based on gravity (10m/px) and ground force
    xddot = 10 * g + G / m;

    //  Integrate for velocity
    xdot = xdot + dt * xddot;

    //  Integrate again for height
    x = x + dt * xdot;

    //  Integrate time
    t = t + dt;
    heights.push(424 - parseInt(x.toFixed(2)));
    times.push(parseInt(t.toFixed(2)));
  }
  return [heights, times];
}
export default App;
