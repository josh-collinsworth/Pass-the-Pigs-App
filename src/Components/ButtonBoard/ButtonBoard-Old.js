import React from 'react';
import './ButtonBoard.css';
import ScoreButton from '../ScoreButton/ScoreButton';
import trotter from '../../images/trotter.jpg';
import snouter from '../../images/snouter.jpg';
import razorback from '../../images/razorback.jpg';
import leaningJowler from '../../images/leaning-jowler.jpg';
//import sider from '../../images/sider.jpg';
import doubleDots from '../../images/double-dots.jpg';
import doubleNoDots from '../../images/double-no-dots.jpg';
//import eitherSide from '../../images/either-side.jpg';

class ButtonBoard extends React.Component {
    constructor(props){
        super(props);
    }
    diceCombos = [
        { 
          points: 1,
          names: [[doubleDots], [doubleNoDots]] 
        },
        { 
          points: 5,
          names: [[razorback], [trotter]],
        },
        { 
          points: 10,
          names: [[razorback, trotter], [snouter]],
        },
        { 
          points: 15,
          names: [leaningJowler],
        },
        { 
          points: 20,
          names: [[trotter, trotter], [razorback, razorback]],
        },
        { 
          points: 40,
          names: [[snouter, snouter]],
        },          { 
          points: 60,
          names: [[leaningJowler, leaningJowler]],
        },                  
    ];
    render(){
        return(
        	<section id="ButtonBoard">
                {this.diceCombos.map(roll => {
                    return <ScoreButton roll={roll} addRoll={this.props.addRoll}/> 
                })}
                <button id="bank" onClick={this.props.bankPoints}><span role="img" aria-label="fixme">🏦 Bank!</span></button>
                <button id="pigOut" onClick={this.props.pigOut}><span role="img" aria-label="fixme">🚫 Pig out!</span></button>
                <button id="makinBacon" onClick={this.props.makinBacon}><span role="img" aria-label="fixme">😱🥓</span></button>
        	</section>
        );
    }
}

export default ButtonBoard;