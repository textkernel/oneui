import React, { Component } from 'react';
import { Dummy, Button } from 'nice2';

import ButtonContainer from './components/ButtonContainer';

import './App.css';

class App extends Component {

    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <ButtonContainer>
                        <Button size="large" style={{ margin: 15 }} context="brand"> Brand </Button>
                        <Button size="large" style={{ margin: 15 }} context="warning"> Warning </Button>
                        <Button size="large" style={{ margin: 15 }} context="bad"> Bad </Button>
                        <Dummy> I'm Dummy Component! </Dummy>
                    </ButtonContainer>
                </header>
            </div>
        );
    }
}

export default App;
