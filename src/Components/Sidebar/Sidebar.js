import React from 'react';
import './Sidebar.css';
import Scoreboard from '../Scoreboard/Scoreboard';

class Sidebar extends React.Component {
    render(){
        return(
        	<aside className="App-sidebar slide-in">
        		<Scoreboard players={this.props.players} toggleModal={this.props.toggleModal}/>
        	</aside>
        );
    }
}

export default Sidebar;