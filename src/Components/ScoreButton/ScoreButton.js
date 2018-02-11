import React from 'react';
import './ScoreButton.css';

class ScoreButton extends React.Component {
    render(){
        return(
            <div>
                <input onChange={this.props.totalRoll} type="radio" name={"pigs_" + this.props.side} id={this.props.pig.name + '_' + this.props.side} title={this.props.pig.name} value={this.props.pig.points}/>
                <label htmlFor={this.props.pig.name + '_' + this.props.side}><img src={this.props.pig.image} title={this.props.pig.name} alt={this.props.pig.name}/></label>
            </div>
    	);
    }
}

export default ScoreButton;