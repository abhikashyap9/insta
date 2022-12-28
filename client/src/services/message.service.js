import axios from "axios";
const baseUrl = "http://localhost:3001";

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

const savedMessages = (id, auth, messages) => {
  let url = baseUrl + `/savedMessages/${id}`;
  return axios.post(url, messages, {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  });
};

const Messages = {
  createRoom,
  getRoom,
  getCurrentUserRoom,
  savedMessages,
};
export default Messages;
