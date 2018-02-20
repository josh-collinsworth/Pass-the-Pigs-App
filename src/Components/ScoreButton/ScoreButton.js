import React from 'react';
import './ScoreButton.css';

class ScoreButton extends React.Component {
	constructor(props){
		super(props);
		this.changeArrow = this.changeArrow.bind(this);
	}
	changeArrow(e){
		const pig = e.target;
		const pigCoords = pig.getBoundingClientRect();
		const headerHeight = document.querySelector('header').offsetHeight;
		const boardPadding = window.getComputedStyle(document.querySelector('#ButtonBoard')).getPropertyValue('padding-left');
		const totalTop = pigCoords.top - (pigCoords.height / 2) - headerHeight - parseInt(boardPadding, 10);

		if(pig.name === 'pigs_left'){
			const leftArrow = document.getElementById('board-left-arrow');
			leftArrow.style.transform = `translateY(${totalTop}px)`;
		} else if (pig.name === 'pigs_right'){
			const rightArrow = document.getElementById('board-right-arrow');
			rightArrow.style.transform = `translateY(${totalTop}px)`;
		}
		this.props.totalRoll();
	}
    render(){
        return(
            <div>
                <input onChange={this.changeArrow} type="radio" name={"pigs_" + this.props.side} id={this.props.pig.name + '_' + this.props.side} title={this.props.pig.name} value={this.props.pig.points}/>
                <label htmlFor={this.props.pig.name + '_' + this.props.side}><img src={this.props.pig.image} title={this.props.pig.name} alt={this.props.pig.name}/></label>
            </div>
    	);
    }
}

export default ScoreButton;