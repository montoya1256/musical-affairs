import React, { Component, Fragment, useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { showUsersWhoLikeThisArtist } from "../../store/artists";

function UserSelect({ selected, artist }) {
  const dispatch = useDispatch();
  const [select, setSelect] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const users = useSelector((state) => state.artists.users);

  console.log(users);

  const handleShowFavoriters = async (e) => {
    e.preventDefault();
    setSelect(false);
    await dispatch(showUsersWhoLikeThisArtist(e.target.id));
    // dispatch(showFavorites());
    setSelect(true);
    return;
  };

  return (
    <>
      {select ? (
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
            <MenuItem key={user.id} value={user.id}>
              {user.first_name}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <button onClick={handleShowFavoriters} type="button" id={artist.id}>
          show others who like this artist
        </button>
      )}
    </>
  );
}

export default UserSelect;
