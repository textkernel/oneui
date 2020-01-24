import React, { Component } from 'react';
import { Heading, Button } from '@textkernel/oneui'; // eslint-disable-line import/no-unresolved, import/no-extraneous-dependencies
import { ButtonContainer } from './components/ButtonContainer';
import './App.css';

export class App extends Component {
    constructor() {
        super();
        this.state = {
            useAltTheme: false
        };
        this.altTheme = document.createElement('link');
        this.altTheme.type = 'text/css';
        this.altTheme.rel = 'stylesheet';
        this.altTheme.href = './theme-custom.css';
        this.altTheme.dataset.oneuiLevel = 'oneui';

        this.toggleTheme = this.toggleTheme.bind(this);
    }

    toggleTheme() {
        this.setState(
            prevState => ({
                useAltTheme: !prevState.useAltTheme
            }),
            () => {
                const { useAltTheme } = this.state;

                if (useAltTheme) {
                    const head = document.getElementsByTagName('head')[0];
                    head.appendChild(this.altTheme);
                } else {
                    this.altTheme.parentNode.removeChild(this.altTheme);
                }
            }
        );
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <ButtonContainer>
                        <Heading style={{ textAlign: 'center' }}>Showing off!</Heading>
                        <Button context="brand" onClick={this.toggleTheme}>
                            Click to toggle theme
                        </Button>
                        <Button context="warning">Warning</Button>
                        <Button context="bad">Bad</Button>
                    </ButtonContainer>
                </header>
            </div>
        );
    }
}
