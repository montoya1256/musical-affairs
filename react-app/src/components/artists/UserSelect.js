import React, { useEffect, useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { showUsersWhoLikeThisArtist } from "../../store/artists";
import Button from "react-bootstrap/Button";
import "./UserSelect.css";
import { getUser } from "../../store/users";

function UserSelect({ artist }) {
  const dispatch = useDispatch();
  const [select, setSelect] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const users = useSelector((state) => state.artists.users);

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
    let recipientId = e.target.id;
    console.log(selectedUserId, "selected", recipientId, "recipient");
  };

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
