import { Component } from 'react'
import { ArrowDownward, ArrowUpward, Settings } from '@material-ui/icons';
import SettingsTab from './Settings';
import '../style/Style.css';
import '../style/Clicker.css';
import '../scripts/Communication.ts'
import { GETCount, POSTCount } from '../scripts/Communication';

class Clicker extends Component {
    state = {
        count: 0,
        settingsShown: false,
    }

    componentDidMount() {
        setInterval(
            () => this.setState({ count: GETCount() }), 1000
        );
    }

    toggleSettings = () => {
        this.setState({ settingsShown: !this.state.settingsShown });
    }

    handleButtonPress = (n: number) => {
        POSTCount(n);
        this.setState({ count: GETCount() })
    }

    render() {
        return (
            <div id="clicker">
                <div className="vertical">
                    <div id="top-container" className="horizontal">
                        <div id="count">{this.state.count}</div>
                        <button id="settings-icon" onClick={this.toggleSettings}><Settings fontSize="inherit" /></button>
                    </div>

                    {this.state.settingsShown && <SettingsTab />}
                </div>

                <div id="button-container" className="vertical">
                    <button id="inc" onClick={() => this.handleButtonPress(1)}><ArrowUpward fontSize="large" /></button>
                    <button id="dec" onClick={() => this.handleButtonPress(-1)}><ArrowDownward fontSize="large" /></button>
                </div>
            </div>
        );
    }
}


export default Clicker