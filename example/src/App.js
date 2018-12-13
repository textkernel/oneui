import React, { Component } from 'react';
import { Dummy, Button } from 'nice2';

import ButtonContainer from './components/ButtonContainer';

import './App.css';

class App extends Component {
    constructor() {
        super()
        this.state = {
            useAltTheme: false
        }
        this.altTheme = document.createElement('link');
        this.altTheme.type = 'text/css';
        this.altTheme.rel = 'stylesheet';
        this.altTheme.href = "./customer-nice-theme.css";

        this.toggleTheme = this.toggleTheme.bind(this)
    }

    toggleTheme() {
        this.setState({ useAltTheme: !this.state.useAltTheme }, () => {
            if (this.state.useAltTheme) {
                const head = document.getElementsByTagName('head')[0];
                head.appendChild(this.altTheme)
            } else {
                this.altTheme.parentNode.removeChild(this.altTheme);
            }
        })
    }

    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <ButtonContainer>
                        <Button context="brand" onClick={this.toggleTheme}> Click to toggle theme </Button>
                        <Button context="warning"> Warning </Button>
                        <Button context="bad"> Bad </Button>
                        <Dummy> I'm Dummy Component! </Dummy>
                    </ButtonContainer>
                </header>
            </div>
        );
    }
}

export default App;
