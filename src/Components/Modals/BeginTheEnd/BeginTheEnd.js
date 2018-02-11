import React from 'react';
import Modal from '../Modal';

class BeginTheEnd extends Modal {
	constructor(props){
		super(props);
        this.state = {
            id: 'beginTheEndModal'
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}
    handleSubmit(e){
        this.props.toggleModal(e, 'beginTheEndModal');
    }
    render(){
        return(
    		<form className="modal-box" onSubmit={this.handleSubmit}>
    			{this.props.players.map(player => {
                    if (!player.ender){ return ''; }
                    return <p><strong>{player.name} has banked {player.banked} and kicked off the final round!</strong> Every other player gets one last roll to try to beat them!</p>
                })} 
    			<input type="submit" value="OK" onKeyDown={this.handleKeyDown}/>
    		</form>
        );
    }
}

export default BeginTheEnd;