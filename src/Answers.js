import React from 'react';

const Answer = (props) => {
    return ( 
        <>
          <h2 className="question">Which city is the capital of {props.correctCountry}?</h2>
          <ul>
            {props.answerList}
          </ul>
          {props.answered && <button className="next_button" onClick={props.click}>Next</button>}
        </>
     );
}
 
export default Answer;