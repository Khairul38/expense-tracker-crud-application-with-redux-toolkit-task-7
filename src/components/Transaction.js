import React from "react";
import EditImage from "../assets/images/edit.svg";
import DeleteImage from "../assets/images/delete.svg";
import { useMatch, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  editActive,
  removeTransaction,
} from "../features/transaction/transactionSlice";
import numberWithCommas from "../utils/numberWithCommas";

const Transaction = ({ transaction }) => {
  const dispatch = useDispatch();
  const match = useMatch("/");
  const navigate = useNavigate();

  const handleEdit = () => {
    if (!match) {
      navigate("/");
    }
    dispatch(editActive(transaction));
  };
  const handleDelete = () => {
    dispatch(removeTransaction(transaction.id));
  };

  return (
    <li className={`transaction ${transaction.type}`}>
      <p>{transaction.name}</p>
      <div className="right">
        <p>৳ {numberWithCommas(transaction.amount)}</p>
        <button onClick={handleEdit} className="link">
          <img className="icon" src={EditImage} alt="Edit" />
        </button>
        <button onClick={handleDelete} className="link">
          <img className="icon" src={DeleteImage} alt="Delete" />
        </button>
      </div>
    </li>
  );
};

export default Transaction;
