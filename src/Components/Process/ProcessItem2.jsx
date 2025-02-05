import React from 'react';
import { Link } from 'react-router-dom';

const ProcessItem2 = ({ process }) => {
    return (
        <div className="process-item process-gap">
            <div className="number-image">
                <img src={process.image} alt={process.title} />
            </div>
            <div className="number-text">
                <div className="number-area">
                    <span className="number-prefix">{process.id < 10 ? `0${process.id}` : process.id}</span>
                </div>
                <h3 className="number-title">{process.title}</h3>
                <p className="number-txt">{process.description}</p>
            </div>
        </div>
    );
};

export default ProcessItem2;

