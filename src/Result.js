import React from 'react';
import win from './win.svg'

const Result = (props) => {
    return ( 
        <>
            <img src={win} alt="win" className="result-image"/>
            <h2 className="result-title">Result</h2>
            <span className="result-content">You got <strong>{props.result - 1}</strong> correct answers</span>
            <button className="result-button" onClick={props.click}>Try again</button>
            </>
     );
}
 
export default Result;