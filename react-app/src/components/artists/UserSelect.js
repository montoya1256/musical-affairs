import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { showUsersWhoLikeThisArtist } from "../../store/artists";
import Button from "react-bootstrap/Button";
import "./UserSelect.css";

function UserSelect({ artist }) {
  const dispatch = useDispatch();
  const [select, setSelect] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const users = useSelector((state) => state.artists.users);

  console.log(users);

  const handleShowFavoriters = async (e) => {
    e.preventDefault();
    // setSelect(false);
    await dispatch(showUsersWhoLikeThisArtist(e.target.id));
    // dispatch(showFavorites());
    setSelect(true);
    return;
  };

  const handleChat = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {select ? (
        <div className="select-div">
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            autoWidth
          >
            <MenuItem value="" disabled>
              Users who like this artist
            </MenuItem>
            {users?.map((user) => (
              <MenuItem key={user.id} value={user.first_name}>
                {user.first_name}
              </MenuItem>
            ))}
          </Select>
          {selectedUser ? (
            <div className="select-chat">
              <Button variant="info" onClick={handleChat}>
                Chat With {selectedUser}
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
