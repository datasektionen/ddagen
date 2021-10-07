import { Refresh } from '@material-ui/icons';

import '../style/Style.css';
import '../style/Settings.css';
import '../scripts/Communication.ts'
import { Component } from 'react';

class SettingsTab extends Component {

    state = {
        text: "",
    };

    handleChange(event: any) {
        this.setState({ value: event.target.value });
    }

    handleSetCount = () => {
        console.log(this.state.text);
    }

    handleSetIP = () => {

    }

    render() {
        return (
            <div>
                {/* <div id="repo-link">psoder/dclicker-frontend</div> */}
                <div id="settings" className="horizontal">
                    <button id="upd"><Refresh fontSize="medium" /></button>
                    <input value={this.state.text} onChange={this.handleChange} />
                    <button onClick={() => this.handleSetCount()} id="set-count">
                        <b>SET COUNT</b>
                    </button>
                    <button onClick={() => this.handleSetIP} id="set-ip">
                        <b>SET IP</b>
                    </button>
                </div>
            </div>
        );
    }
}

export default SettingsTab;