const GET_MESSAGES = "chat/GET_MESSAGES";

const getTheMessages = (messages) => ({
  type: GET_MESSAGES,
  messages,
});

export const getMessages = (sender_id, reciever_id) => async (dispatch) => {
  const res = await fetch(`/api/chat/${sender_id}/${reciever_id}/`);
  if (res.ok) {
    const message = await res.json();
    dispatch(getTheMessages(message.messages));
    return message;
  } else {
    console.log("something went wrong with the response");
  }
};

const initalState = { messages: [] };

const messageReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return { ...state, messages: action.messages };
    default:
      return state;
  }
};

export default messageReducer;
