import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    componentDidMount() {
        this.timerID = window.setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        window.clearInterval(this.timerID);
    }

    tick() {
        this.setState({date: new Date()});
    }

    render() {
        return (
            <div>
                {this.state.date.toLocaleTimeString()}
            </div>
        );
    }
}

const name = 'World';
const element = (
    <div>
        <h1>Hello {name}</h1>
        <Clock/>
        <App/>
    </div>
);

ReactDOM.render(element, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
