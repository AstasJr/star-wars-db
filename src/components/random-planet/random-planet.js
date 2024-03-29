import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';

import './random-planet.css';

//url starwars-visualguide.com
export default class RandomPlanet extends Component {

    static defaultProps = {
        updateInterval: 10000
    };

    static propTypes = {
        updateInterval: PropTypes.number
    };

    swapiService = new SwapiService();

    state = {
        planet  : {},
        loading : true,
    };

    componentDidMount() {
        const {updateInterval} = this.props;
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, updateInterval);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onPlanetLoaded = (planet) => {
        this.setState({planet, loading: false});
    };

    onError = (err) => {
        this.setState({
            error   : true,
            loading : false
        });
    };
    //обновление планеты в блоке случайной планеты
    updatePlanet = () => {
        //генерация случайного номера планеты до 20 согласно кол-ву фото планет в апи
        const id = Math.floor(Math.random() * 19) + 1;
        //const id = 45645464;
        //вызов сервиса для получения данных
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    };

    render () {
        //устанавливаем состояние
        const { planet, loading, error } = this.state;
        //константы для отображения спиннера, ошибки или планеты
        const spinner = loading ? <Spinner /> : null;
        const errorMassege = error ? <ErrorIndicator /> : null;
        const hasData = !(loading || error);
        const content = hasData ? <PlanetView planet = {planet} /> : null;

        return (
            <div className="random-planet jumbotron rounded">
                {errorMassege}
                {spinner}
                {content}
            </div>

        );
    }
}

//компонент отображения планеты
const PlanetView = ( {planet} ) => {
    const { id, name, population, rotationPeriod, diameter } = planet;
    return (
        <React.Fragment>
          <img className="planet-image"
               src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="planet"/>
          <div>
              <h4>{name}</h4>
              <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                      <span className="term">Population</span>
                      <span>{population}</span>
                  </li>
                  <li className="list-group-item">
                      <span className="term">Rotation Period</span>
                      <span>{rotationPeriod}</span>
                  </li>
                  <li className="list-group-item">
                      <span className="term">Diameter</span>
                      <span>{diameter}</span>
                  </li>
              </ul>
          </div>
        </React.Fragment>
    );
};