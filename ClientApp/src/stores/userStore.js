import {observable, action} from 'mobx';
import agent from '../agent';

class UserStore {
    @observable currentUser;
    @observable loadingUser;
    @observable updatingUser;
    @observable updatingUserErrors;

    @action pullUser() {
        console.log('pulling user');
        this.loadingUser = true;
        return agent.Auth.current()
            .then(action(({user}) => {this.currentUser = user;}))
            .finally(action(() => {this.loadingUser = false;}))
    }

    @action forgetUser() {
        this.currentUser = undefined;
    }
}

export default new UserStore();