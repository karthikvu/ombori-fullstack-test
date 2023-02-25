import React from "react";
import type { TUser } from "../../types";
import "./styles.scss";

interface IProps {
  user: TUser;
}

const UserListItem = ({ user }: IProps) => {
  return (
    <div className="user-list-item">
      <div className="left">
        <img
          className="avatar"
          src={user.avatar}
          alt={`Profile picture of ${user.first_name}`}
        />
      </div>
      <div className="right">
        <div className="name">
          {user.first_name} {user.last_name}
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
