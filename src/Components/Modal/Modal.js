import React from 'react';
import './Modal.css';

class Modal extends React.Component {
    render(){
        return(
        	<aside id={this.props.id} className="hidden modal">
        		{this.props.children}
        	</aside>
        );
    }
}

export default Modal;