import React from 'react';
import './Modal.css';

class Modal extends React.Component {
	constructor(props){
		super(props);
        this.state = {
            id: ''
        }
	}
    handleSubmit = (e) => {
        this.props.toggleModal(e, this.state.id);
    }
	handleKeyDown = (e) => {
        if (e.keyCode === 27) this.props.neverMind(e);
        if (e.which === 13) this.handleSubmit(e);
    }	
    handleToggle = (e) => {
        this.props.toggleModal(e, this.state.id);
    }
    render(){
        return(
        	<aside id={this.props.id} className="hidden modal">
        		{this.props.children}
        	</aside>
        );
    }
}

export default Modal;