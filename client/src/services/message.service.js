import axios from "axios";
const baseUrl = 'http://localhost:3001'

const createRoom = (id, auth) => {
  let url = baseUrl + `/createConversation/${id}`;
  return axios.post(
    url,
    {},
    {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    }
  );
};

const getRoom = (id, auth) => {
  let url = baseUrl + `/getConversation/${id}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  });
};

const getCurrentUserRoom = (auth) => {
  let url = baseUrl + `/getUserRoom`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  });
};

const savedMessages = (id, auth, messageData) => {
  let url = baseUrl + `/savedMessages/${id}`;
  return axios.post(url, messageData, {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  });
};

const getMessages=(id)=>{
  let url = baseUrl + `/getMessages/${id}`;
  return axios.get(url)
}

const Messages = {
  createRoom,
  getRoom,
  getCurrentUserRoom,
  savedMessages,
  getMessages
};
export default Messages;
