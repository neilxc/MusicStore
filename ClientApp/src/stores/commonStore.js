import {observable, action, reaction} from 'mobx';
import agent from '../agent';

class CommonStore {
    @observable appName = 'ReeJay';
    @observable appSlogan = 'A music store';
    @observable token = window.localStorage.getItem('jwt');
    @observable appLoaded = false;

    @observable genres = [];
    @observable isLoadingGenres = false;

    constructor() {
        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                } 
            }
        )
    }

    @action loadGenres() {
        this.isLoadingGenres = true;
        return agent.Genre.get()
            .then(action(({genres}) => {this.genres = genres}))
            .finally(action(() => {this.isLoadingGenres = false;}))
    }

    @action setToken(token) {
        console.log('setting token')
        this.token = token;
    }

    @action setAppLoaded() {
        this.appLoaded = true;
    }
}

export default new CommonStore();