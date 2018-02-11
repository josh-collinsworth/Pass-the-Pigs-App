import React from 'react';
import './ScoreButton.css';

class ScoreButton extends React.Component {
    render(){
        return(
        	<button onClick={this.props.addRoll} id={this.props.roll.points}>
        		<div className="rolls">
	        		{this.props.roll.names.map(name => {
	        			return Array.isArray(name) ? <span className="rollGroup">{name.map(subName => <img src={subName} alt={subName} />)}</span> : <img src={name} alt={name} />
	        		})}
        		</div>
        		<div className="points">{this.props.roll.points}</div>
        	</button>
    	);
    }
}

export default ScoreButton;