import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFireflyPreset } from "tsparticles-preset-firefly";

const Framee = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFireflyPreset(engine);
  }, []);

  const particlesConfig = {
    preset: "firefly"
  };

  return (
    <div className="App">
      <Particles options={particlesConfig} init={particlesInit} />
      <div className="centered-page">
        <div className="centered-containerrr">
          <div className="headinggg">Communify</div>
          <div className="subheadinggg">
            Welcome to Communify, the place where communities connect and thrive. Join us and start building your online community today!
          </div>
          <Link to="/login">
            <button className="action-buttonn">Get Started</button>
          </Link>
          <Link to="https://github.com/pachauriyash/CommunifyHub">
            <button className="action-buttonn">Github Repo</button>
          </Link>
            {/* <a href="https://github.com/pachauriyash/CommunifyHub" className="action-button">Github: https://github.com/pachauriyash/CommunifyHub</a> */}
        </div>
      </div>
    </div>
  );
};

export default Framee;
