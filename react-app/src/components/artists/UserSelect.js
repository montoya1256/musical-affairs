import React, { useEffect, useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { showUsersWhoLikeThisArtist } from "../../store/artists";
import Button from "react-bootstrap/Button";
import "./UserSelect.css";
import { getUser } from "../../store/users";
import { privateSocket } from "../Chat/Chat";

function UserSelect({ artist }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [select, setSelect] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const users = useSelector((state) => state.artists.users);
  const [roomId, setRoomId] = useState(null);
  const [doChat, setDoChat] = useState(false);

  const user = useSelector((state) => state.session.user);
  const selectedUser = useSelector((state) => state.user.user);

  console.log(users);

  useEffect(async () => {
    await dispatch(getUser(selectedUserId));
  }, [selectedUserId]);

  const handleShowFavoriters = async (e) => {
    e.preventDefault();
    await dispatch(showUsersWhoLikeThisArtist(e.target.id));
    setSelect(true);
    return;
  };

  const handleChat = async (e) => {
    e.preventDefault();
    let recipientName = selectedUser?.first_name;
    if (roomId !== null) {
      privateSocket.emit("leave_room", roomId);
    }
    let roomNameArr = [recipientName, user.first_name];
    let sorted = roomNameArr.sort();
    await setRoomId(sorted.join());
    user.roomId = sorted.join();
    user.message = `${selectedUser.first_name} wants to conect with you`;
    user.reciever_id = Number(selectedUser.id);
    user.sender_id = user.id;
    setDoChat(true);
  };

  useEffect(async () => {
    if (doChat) {
      await privateSocket.emit("join_room", { roomId });
      await privateSocket.emit("private_message", user);
      history.push(`/chat/`);
      setDoChat(false);
    }
  }, [doChat]);

  return (
    <>
      {select ? (
        <div className="select-div">
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={selectedUserId}
            onChange={async (e) => await setSelectedUserId(e.target.value)}
            autoWidth
          >
            <MenuItem value="" disabled>
              Users who like this artist
            </MenuItem>
            {users?.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.first_name}
              </MenuItem>
            ))}
          </Select>
          {selectedUserId ? (
            <div className="select-chat">
              <Button variant="info" onClick={handleChat}>
                Chat With {selectedUser?.first_name}
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="select-div">
          <Button
            variant="secondary"
            className="select-button"
            onClick={handleShowFavoriters}
            type="button"
            id={artist.id}
          >
            Show others who like this artist
          </Button>
        </div>
      )}
    </>
  );
}

export default UserSelect;
