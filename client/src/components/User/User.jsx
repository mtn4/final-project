import React from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillEdit,
} from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";
import "./User.css";

export default function User({
  id,
  name,
  email,
  admin,
  createdAt,
  deleteHandler,
}) {
  return (
    <>
      <IconContext.Provider value={{ size: 32 }}>
        <tr>
          <td>{id}</td>
          <td>{name}</td>
          <td>{email}</td>
          <td>
            {admin ? (
              <AiFillCheckCircle color="green" />
            ) : (
              <AiFillCloseCircle color="red" />
            )}
          </td>
          <td>{new Date(createdAt).toLocaleString()}</td>
          <td>
            <Link to={`/admin/user/${id}`}>
              <AiFillEdit style={{ cursor: "pointer" }} color="blue" />
            </Link>
            <BsFillTrash2Fill
              style={{ cursor: "pointer" }}
              color="gray"
              onClick={(e) => deleteHandler(id)}
            />
          </td>
        </tr>
      </IconContext.Provider>
    </>
  );
}
