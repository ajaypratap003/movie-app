import React from "react";
import "./test.css";

const TestPage: React.FC = () => {
    return (
        <div className="container">
            <div className="left-section">
                <p>Left Section</p>
            </div>
            <div className="divider"></div>
            <div className="right-section">
                <p>Right Section</p>
            </div>
        </div>
    );
};

export default TestPage;