import React from "react";
import { Link } from "react-router-dom";
import "./Order.css";

export default function Order({ id, createdAt, total, name }) {
  return (
    <>
      <tr>
        <td>{id}</td>
        {name ? <td>{name}</td> : ""}
        <td>{new Date(createdAt).toDateString()}</td>
        <td>{new Date(createdAt).toLocaleTimeString()}</td>
        <td>${total}</td>
        <td>
          <Link to={`/order/${id}`}>
            <button className="details-button">Details</button>
          </Link>
        </td>
      </tr>
    </>
  );
}
