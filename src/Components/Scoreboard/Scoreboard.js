import React from 'react';
import './Scoreboard.css';

class Scoreboard extends React.Component {
    handleToggle = (e) => {
        this.props.toggleModal(e, 'newPlayerModal');
    }
    handleChange = (e) => {
        const playerID = e.target.parentElement.attributes[0].value;
        const playerName = e.target.textContent;
        this.props.toggleModal(e, 'changePlayerNameModal', [playerName, playerID]);
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
                                    <td data-playerid={player.id}><strong onClick={this.handleChange}>{player.name}</strong></td>
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