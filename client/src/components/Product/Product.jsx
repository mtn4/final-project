import React from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";
import "./Product.css";

export default function Product({
  id,
  name,
  price,
  cntInStock,
  category,
  brand,
  createdAt,
  deleteHandler,
}) {
  return (
    <>
      <IconContext.Provider value={{ size: 32 }}>
        <tr>
          <td>{id}</td>
          <td>{name}</td>
          <td>${price}</td>
          <td>{cntInStock}</td>
          <td>{category}</td>
          <td>{brand}</td>
          <td>{new Date(createdAt).toLocaleString()}</td>
          <td>
            <Link to={`/admin/product/${id}`}>
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
