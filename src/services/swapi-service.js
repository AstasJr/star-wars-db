export default class SwapiService {
    //url
    _apiBase   = 'https://swapi.co/api';
    _imageBase = 'https://starwars-visualguide.com/assets/img';
    //функция получения данных
    getResource = async (url) => {
        //асинхронное получение данных с юрл
        const  res  = await fetch(`${this._apiBase}${url}`);
        //обработка ошибок 404
        if (!res.ok) {
            throw new Error(`Could not fetch ${url} received ${res.status}`);
        }
        //преобразование данных из json
        return await res.json();
    };
    //функция получение всех персонажей
    getAllPeople = async () => {
        const res = await this.getResource('/people');
        return res.results.map(this._transformPerson);
    };
    //функция получения конкретного персонажа
    getPerson = async (id) => {
        const person = await this.getResource(`/people/${id}/`);
        return this._transformPerson(person);
    };
    //функция получение всех планет
    getAllPlanets = async () => {
        const res = await this.getResource('/planets');
        return res.results.map(this._transformPlanet);
    };
    //функция получения конкретной планеты
    getPlanet = async (id) => {
        const planet = await this.getResource(`/planets/${id}/`);
        return this._transformPlanet(planet);
    };
    //функция получение всех кораблей
    getAllStarships = async () => {
        const res = await this.getResource('/starships');
        return res.results.map(this._transformStarship);
    };
    //функция получения конкретного корабля
    getStarship = async (id) => {
        const starship = await this.getResource(`/starships/${id}/`);
        return this._transformStarship(starship);
    };
    getPersonImage = ({id}) => {
        return `${this._imageBase}/characters/${id}.jpg`;
    };
    getStarshipImage = ({id}) => {
        return `${this._imageBase}/starships/${id}.jpg`;
    };
    getPlanetImage = ({id}) => {
        return `${this._imageBase}/planets/${id}.jpg`;
    };
    //функция получения id из url
    _extractId = (item) => {
        const idRegExp = /([0-9]*)\/$/;
        const id = item.url.match(idRegExp)[1];
        return id;
    };
    //функция форматирования данных для планеты
    _transformPlanet = (planet) => {
        return {
            id: this._extractId(planet),
            name           : planet.name,
            population     : planet.population,
            rotationPeriod : planet.rotation_period,
            diameter       : planet.diameter
        }
    };
    //функция форматирования данных для кораблей
    _transformStarship = (starship) => {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.cost_in_credits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        }
    };
    //функция форматирования данных для персонажей
    _transformPerson = (person) => {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            eyeColor: person.eye_color
        }
    }
}