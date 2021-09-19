import { ArrowDownward, ArrowUpward, Refresh } from '@material-ui/icons';
import { Component } from 'react'
import '../style/Clicker.css';

class Clicker extends Component {
    state = {
        count: 0
    }
    intervalID: NodeJS.Timeout | undefined;

    componentDidMount() {
        this.intervalID = setInterval(
            () => this.getCount(), 250
        );
    }

    increase = () => {
        this.addToCount(1);
        this.getCount();
    }

    decrease = () => {
        this.addToCount(-1);
        this.getCount();
    }

    updateCount = () => {
        let s = (document.getElementById("textArea") as HTMLInputElement).value;
        let n = +s;
        this.setCount(n);
    }

    resetCounter = () => {
        this.setCount(0);
        this.getCount();
    }

    getCount = () => {
        fetch("http://localhost:8080/counter", {})
            .then(response => response.json())
            .then(data => this.setState((state) => ({ count: data.count })));
    }

    addToCount = (n: number) => {
        fetch("http://localhost:8080/counter/update", {
            method: 'POST',
            headers: { conetent: "application/json" },
            body: JSON.stringify({ upd: n })
        });
    }

    setCount = (n: number) => {
        fetch("http://localhost:8080/counter/reset", {
            method: 'PUT',
            headers: { conetent: "application/json" },
            body: JSON.stringify({ val: n })
        });
    }

    render() {
        return (
            <div id="clicker">
                <div className="title">/dclicker</div>
                <div id="count">{this.state.count}</div>
                <div id="horizontal">
                    <button id="upd" onClick={this.resetCounter}><Refresh fontSize="large" /></button>
                    <textarea id="textArea"></textarea>
                    <button id="set" onClick={this.updateCount}><b>SET</b></button>
                </div>
                <button id="inc" onClick={this.increase}><ArrowUpward fontSize="large" /></button>
                <button id="dec" onClick={this.decrease}><ArrowDownward fontSize="large" /></button>
            </div>
        );
    }
}


export default Clicker