import React from 'react';
import './ButtonBoard.css';
import ScoreButton from '../ScoreButton/ScoreButton';
import trotter from '../../images/trotter.png';
import snouter from '../../images/snouter.png';
import razorback from '../../images/razorback.png';
import leaningJowler from '../../images/leaning-jowler.png';
import dotUp from '../../images/dot-up.png';
import dotDown from '../../images/dot-down.png';


class ButtonBoard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          allowAdd: false,
          allowBank: false,
          addText: '',
          points: ''
        }
        this.countEm = this.countEm.bind(this);
        this.totalRoll = this.totalRoll.bind(this);
        this.handleBank = this.handleBank.bind(this);
        this.handleAlert = this.handleAlert.bind(this);
        this.handleNewGameSlap = this.handleNewGameSlap.bind(this);
        this.clearRoll = this.clearRoll.bind(this);
    }
    pigs = [
      {
        name: 'Leaning Jowler',
        points: 15,
        image: leaningJowler,
        key: 4
      },
      {
        name: 'Snouter',
        points: 10,
        image: snouter,
        key: 2
      },  
      {
        name: 'Trotter',
        points: 5,
        image: trotter,
        key: 1
      },  
      {
        name: 'Razorback',
        points: 5,
        image: razorback,
        key: 3
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
    clearRoll(e){
      if(e){
        if(e.target !== e.currentTarget){
          return;
        }
        e.preventDefault();
        e.stopPropagation();
      }
      this.setState({allowAdd: false, addText: '', points: '', allowBank: true});
      const inputs = document.querySelectorAll('input[type="radio"]');
      inputs.forEach(input => input.checked = false);
    }
    totalRoll(){
      const leftSelection = document.querySelector('#board-left input:checked');
      const rightSelection = document.querySelector('#board-right input:checked');
      if(leftSelection || rightSelection){
        this.setState({allowBank: false});
      }
      if(leftSelection && rightSelection){
        if(this.props.state.players.length < 2){
          this.handleAlert();
        }
        if(this.props.state.winner[1] > 0){
          this.handleNewGameSlap();
        }
        this.setState({allowAdd: true});
        const leftPig = leftSelection.attributes.title.value;
        const rightPig = rightSelection.attributes.title.value;
        const leftPigPoints = parseInt(leftSelection.attributes.value.value, 10);
        const rightPigPoints = parseInt(rightSelection.attributes.value.value, 10);

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
    countEm(e){
      this.props.addRoll(this.state.points);
      const bombCheck = this.state.points;
      if(bombCheck === '💣'){ 
        this.setState({allowBank: false});
      }
      this.clearRoll();
    }
    handleBank(){
      this.props.bankPoints();
      this.setState({allowBank: false});
    }
    handleAlert(e){
      this.props.toggleModal(e, 'addPlayersModal');
    }
    handleNewGameSlap(e){
      this.props.toggleModal(e, 'newGameSlapModal');
    }
    render(){
        return(
        	<section id="ButtonBoard" onClick={this.clearRoll}>
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
                <button id="bank" onClick={this.state.allowBank ? this.handleBank : this.totalRoll} className={this.state.allowBank ? '' : 'disabled'}><span role="img" aria-label="fixme">🏦 Bank!</span></button>
                <button id="countEm" onClick={this.state.allowAdd ? this.countEm : this.totalRoll} className={
                  this.state.allowBank ? 'roll-again' : ''
                }>
                  <span className="roll-announcement">{this.state.addText ? this.state.addText : 'Pick both pigs to enter a new roll'}</span>
                  <span className="button-highlight">{this.state.points ? this.state.points : ''}</span>
                </button>

        	</section>
        );
    }
}

export default ButtonBoard;