import React from 'react';
import Modal from '../Modal';

class AddAnotherPlayer extends Modal {
	constructor(props){
		super(props);
        this.state = {
            id: 'addAnotherPlayerModal'
        }
    }
    handleAdd = (e) => {
		this.props.toggleModal(e, 'addAnotherPlayerModal');
        this.props.toggleModal(e, 'newPlayerModal');
    }   
    handleSubmit = (e) => {
        this.props.toggleModal(e, this.state.id);
        const appSidebar = document.querySelector('.App-sidebar');
        if (appSidebar.classList.contains('slide-in')) appSidebar.classList.remove('slide-in');
    }
    render(){
        return(
    		<form className="modal-box" onSubmit={this.handleSubmit}>
    			<p>Add another player?</p>
                <div className="button-group">
        			<input type="submit" value="Nope" onKeyDown={this.handleKeyDown}/>
                    <button onClick={this.handleAdd}>Add Player</button>
                </div>
    		</form>
        );
    }
}

export default AddAnotherPlayer;