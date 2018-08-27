import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import authStore from './stores/authStore';
import commonStore from './stores/commonStore';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:5000/api';

const encode = encodeURIComponent;

const handleErrors = err => {
  if (err && err.response && err.response.status === 401) {
    authStore.logout();
  }
  return err;
};

const responseBody = res => res.body;

const tokenPlugin = req => {
  if (commonStore.token) {
      req.set('authorization', `Bearer ${commonStore.token}`)
  }
};

const requests = {
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody)
};

const Auth = {
    current: () => 
        requests.get('/auth/user'),
    login: (email, password) =>
        requests.post('/auth/login', {user: {email, password}}),
    register: (username, email, password) =>
        requests.post('/auth/register', {user: {username, email, password}})
}

const Genre = {
    get: () =>
        requests.get('/genres')
}

const limit = (count, p) => `limit=${count}&offset${p ? p * count : 0}`;

const Albums = {
    all: (page, lim = 10) =>
        requests.get(`/store/albums?${limit(lim, page)}`),
    byGenre: (genre, page, lim = 10) =>
        requests.get(`/store/albums?genre=${encode(genre)}&${limit(5, page)}`),
}

export default {
    Auth,
    Genre,
    Albums
}