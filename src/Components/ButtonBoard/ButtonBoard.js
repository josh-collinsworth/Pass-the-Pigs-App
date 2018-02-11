import React from 'react';
import './ButtonBoard.css';
import ScoreButton from '../ScoreButton/ScoreButton';
import trotter from '../../images/trotter.jpg';
import snouter from '../../images/snouter.jpg';
import razorback from '../../images/razorback.jpg';
import leaningJowler from '../../images/leaning-jowler.jpg';
//import sider from '../../images/sider.jpg';
// import doubleDots from '../../images/double-dots.jpg';
// import doubleNoDots from '../../images/double-no-dots.jpg';
//import eitherSide from '../../images/either-side.jpg';
import dotUp from '../../images/dot-up.jpg';
import dotDown from '../../images/dot-down.jpg';


class ButtonBoard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          allowAdd: false,
          addText: '',
          points: ''
        }
        this.countEm = this.countEm.bind(this);
        this.totalRoll = this.totalRoll.bind(this);
    }
    pigs = [
      {
        name: 'Trotter',
        points: 5,
        image: trotter,
        key: 1
      },  
      {
        name: 'Snouter',
        points: 10,
        image: snouter,
        key: 2
      },  
      {
        name: 'Razorback',
        points: 5,
        image: razorback,
        key: 3
      },  
      {
        name: 'Leaning Jowler',
        points: 15,
        image: leaningJowler,
        key: 4
      },  
      {
        name: 'Sider (Up)',
        points: 1,
        image: dotUp,
        key: 5
      },
      {
        name: 'Sider (Down)',
        points: 1,
        image: dotDown,
        key: 6
      }  
    ]
    totalRoll(){
      const leftSelection = document.querySelector('#board-left input:checked');
      const rightSelection = document.querySelector('#board-right input:checked');

      if(leftSelection && rightSelection) {
        this.setState({allowAdd: true});
        const leftPig = leftSelection.attributes.title.value;
        const rightPig = rightSelection.attributes.title.value;
        const leftPigPoints = parseInt(leftSelection.attributes.value.value, 10);
        const rightPigPoints = parseInt(rightSelection.attributes.value.value, 10);

        // console.log(leftPig + ': ' + leftPigPoints);
        // console.log(rightPig + ': ' + rightPigPoints);

        if(leftPig === rightPig && leftPigPoints !== 1){
          this.setState({addText: 'Double ' + leftPig, points: (leftPigPoints + rightPigPoints) * 2});
        } else if (leftPigPoints > 1 && rightPigPoints > 1) {
          this.setState({addText: leftPig + ' + ' + rightPig, points: leftPigPoints + rightPigPoints});
        } else if (leftPig === rightPig && leftPigPoints === 1) {
          this.setState({addText: 'Sider', points: 1});
        } else if(leftPigPoints === 1 && rightPigPoints > 1){
          this.setState({addText: rightPig, points: rightPigPoints})
        } else if(rightPigPoints === 1 && leftPigPoints > 1){
          this.setState({addText: leftPig, points: leftPigPoints})
        } else if(leftPigPoints === 1 && rightPigPoints === 1 && leftPig !== rightPig) {
          this.setState({addText: 'Pig Out!', points: '💣'})
        }
      } else {
        this.setState({allowAdd: false});
      }
    }
    countEm(){
      this.props.addRoll(this.state.points);
      this.setState({allowAdd: false, addText: '', points: ''});
      const inputs = document.querySelectorAll('input[type="radio"]');
      inputs.forEach(input => input.checked = false);
    }
    render(){
        return(
        	<section id="ButtonBoard">
                <div id="board-left">
                  {this.pigs.map(pig => {
                    return <ScoreButton totalRoll={this.totalRoll} pig={pig} side="left" key={'left-' + pig.name }/>
                  })}
                </div>
                <div id="board-right">
                  {this.pigs.map(pig => {
                    return <ScoreButton totalRoll={this.totalRoll} pig={pig} side="right" key={'right-' + pig.name }/>
                  })}
                </div>
                <button id="makinBacon" onClick={this.props.makinBacon}><span role="img" aria-label="fixme">😱🥓 Makin' Bacon!</span></button>
                <button id="bank" onClick={this.props.bankPoints}><span role="img" aria-label="fixme">🏦 Bank!</span></button>
                <button id="countEm" onClick={this.state.allowAdd ? this.countEm : this.totalRoll} className={this.state.allowAdd ? '' : 'disabled'}>
                  <span className="roll-announcement">{this.state.addText ? this.state.addText : '(Enter the roll)'}</span>
                  <span className="button-highlight">{this.state.points ? this.state.points : ''}</span>
                </button>

        	</section>
        );
    }
}

export default ButtonBoard;