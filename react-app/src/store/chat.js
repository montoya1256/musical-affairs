const GET_CHAT = "chat/GET_CHAT";

const getAllMessages = (privateMessage) => ({
  type: GET_CHAT,
  privateMessage,
});

export const getMessages = (sender_id, reciever_id) => async (dispatch) => {
  const res = await fetch(`/api/chat/${sender_id}/${reciever_id}/`);
  if (res.ok) {
    const chat = await res.json();
    dispatch(getAllMessages(chat));
    return chat;
  }
};

export default function chatReducer(state = {}, action) {
  switch (action.type) {
    case GET_CHAT:
      return action.privateMessage;
    default:
      return state;
  }
}
