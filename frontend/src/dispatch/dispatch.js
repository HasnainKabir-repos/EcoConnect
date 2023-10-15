import actions from './actions';
import axios from 'axios';
export const baseUrl = "http://localhost:8080"
const dispatch = async (action, headerParams = {}, body = {}, token = '') => {
  try {
    let axiosOptions = {};
    let response = {};
    switch (action) {
        case actions.login:
            axiosOptions = getAxiosOptions("POST", `${baseUrl}/api/auth`, body, token)
            response = await axios(axiosOptions)
            return response.data
        case actions.getUser:
            break
        default:
          response = {error: {message: "Invalid Command"}}
          return response
    }
  } catch (err) {
    console.log(err);
    return err.response.data
  }
};

const getAxiosOptions = (method, url, body, token) => {
  const headers = {
    'x-auth-token': token,
  };
  switch (method) {
    case 'GET':
      return {
        method: 'GET',
        url,
        headers,
      };

    case 'POST':
      return {
        method: 'POST',
        url,
        headers,
        data: body,
      };

    case 'PUT':
      return {
        method: 'PUT',
        url,
        headers,
        data: body,
      };

    case 'DELETE':
      return {
        method: 'DELETE',
        url,
        headers,
      };
    default:
      return null
  }
};

export default dispatch;