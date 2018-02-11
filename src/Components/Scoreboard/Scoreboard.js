import React from 'react';
import './Scoreboard.css';

class Scoreboard extends React.Component {
    constructor(props){
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
    }
    handleToggle(e){
        console.log('Handling toggle!');
        this.props.toggleModal(e, 'newPlayerModal');
    }
    render(){
        return(
            <div id="Scoreboard">
                <table>
                    <thead>
                        <tr>
                            <td>
                                <p>Name:</p>
                            </td>
                            <td>
                                <p>Bank:</p>
                            </td>          
                            <td>
                                <p>Turn:</p>
                            </td>                            
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.players.map(player => {
                            return (
                                <tr data-active={player.active} key={player.id}>
                                    <td data-playerid={player.id} onInput={this.props.changePlayerName}><strong>{player.name}</strong></td>
                                    <td>{player.banked}</td>
                                    <td>{player.turn ? ` + ${player.turn}` : ''}</td>
                                </tr>
                           )
                        })
                    }      
                    </tbody>         
                </table>
                <button onClick={this.handleToggle}>Add player</button>
            </div>
        );
    }
}

export default Scoreboard;