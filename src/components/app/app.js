import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../item-details';

import './app.css';
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page/people-page";
import SwapiService from "../../services/swapi-service";

export default class App extends Component {

    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true,
        hasError: false
    };

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        });
    };

    componentDidCatch(error, errorInfo) {
        console.log('Component did Catch');
        this.setState({hasError: true});
    }

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />;
        }

        const planet = this.state.showRandomPlanet ?
            <RandomPlanet/> :
            null;

        return (
            <div className="stardb-app">
                <Header />
                { planet }

                <button
                    className="toggle-planet btn btn-warning btn-lg"
                    onClick={this.toggleRandomPlanet}>
                    Toggle Random Planet
                </button>

                <PeoplePage />

            </div>
        );
    }
}