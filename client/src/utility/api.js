import axios from "axios";
import * as Const from '../config/Constants';

const API_URL = Const.API_URL + '/api';

export const authPost = (url, body, token = undefined) => {
  let _token
  if (token === undefined) {
    console.log('test');
    _token = token;
  } else {
    _token = `Bearer ${token}`;
  }
  return fetch(API_URL + url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: _token,
    },
    body: JSON.stringify(body),
  }).then(
    (res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw Error("Unauthorized");
        } else {
          console.log(res);
          try {
            res.json().then((res1) => console.log(res1));
          } catch (err) {}
          throw Error();
        }
      }
      return res.json();
    },
    (error) => {
      console.log(error);
    }
  );
};
export const authPostMultiPart = (url, body, token) => {
  /*
  return fetch(API_URL + url, {
    method: "POST",
    headers: {
      "X-Auth-Token": token,
    },
    body: body,
  });
  */

  const _token = `Bearer ${token}`;
  return fetch(API_URL + url, {
    method: "POST",
    headers: {
      Authorization: _token,
    },
    body: body,
  }).then(
    (res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw Error("Unauthorized");
        } else {
          console.log(res);
          try {
            res.json().then((res1) => console.log(res1));
          } catch (err) {}
          throw Error();
        }
      }
      return res.json();
    },
    (error) => {
      console.log(error);
    }
  );
};
export const authPut = (url, body, token) => {
  const _token = `Bearer ${token}`;
  return fetch(API_URL + url, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: _token,
    },
    body: JSON.stringify(body),
  });
};

export const get = (url, token = undefined) => {
  let _token
  if (token === undefined) {
    _token = token;
  } else {
    _token = `Bearer ${token}`;
  }
  return fetch(API_URL + url, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: _token,
    },
  }).then(
    (res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw Error("Unauthorized");
        } else {
          console.log(res);
          try {
            res.json().then((res1) => console.log(res1));
          } catch (err) {}
          throw Error();
        }
      }
      return res.json();
    },
    (error) => {
      console.log(error);
    }
  );
};
export const authDelete = (url, body, token) => {
  const _token = `Bearer ${token}`;
  return fetch(API_URL + url, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: _token,
    },
    body: JSON.stringify(body),
  }).then(
    (res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw Error("Unauthorized");
        } else {
          console.log(res);
          try {
            res.json().then((res1) => console.log(res1));
          } catch (err) {}
          throw Error();
        }
      }
      return res.json();
    },
    (error) => {
      console.log(error);
    }
  );
};

export const axiosPost = (url, data, token) => {
  const _token = `Bearer ${token}`;
  return axios.post(API_URL + url, data, {
    headers: {
      "content-type": "application/json",
      Authorization: _token,
    },
  });
};

export const axiosGet = (url, token) => {
  const _token = `Bearer ${token}`;
  return axios.get(API_URL + url, {
    headers: {
      "content-type": "application/json",
      Authorization: _token,
    },
  });
};

export const axiosPut = (url, data, token) => {
  const _token = `Bearer ${token}`;
  return axios.put(API_URL + url, data, {
    headers: {
      "content-type": "application/json",
      Authorization: _token,
    },
  });
};

/**
 * url, method, and data properties don't need to be specified in config.
 * @param {*} token
 * @param {*} history
 * @param {*} method
 * @param {*} url
 * @param {*} onSuccess
 * @param {*} onErrors
 * @param {*} data
 * @param {*} config
 */
