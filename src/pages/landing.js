import {Link} from 'react-router-dom';
import React from "react";
import "./landing.css";

const Framee = () => {
    return (
        <div className="framee">
            <div className="overlap-group-wrapperr">
                <div className="overlap-groupp">
                    <div className="overlapp">
                        <Link to="/login"><div className="text-wrapperrr">Get Started</div></Link>
                    </div>
                    <div className="divv">Communify</div>
                    <p className="ppp">
                        Welcome to Communify, the place where communities connect and thrive. Join us and start building your
                        online community today!
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Framee;
