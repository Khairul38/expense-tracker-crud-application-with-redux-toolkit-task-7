import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTransaction,
  editInActive,
  updateTransaction,
} from "../features/transaction/transactionSlice";

const Form = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState(12);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, isError, editing } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    const { id, name, amount, type } = editing;
    if (id) {
      setEditMode(true);
      setName(name);
      setType(type);
      setAmount(amount);
    } else {
      setEditMode(false);
      reset();
    }
  }, [editing]);

  const reset = () => {
    setName("");
    setType("");
    setAmount("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      dispatch(
        updateTransaction({
          id: editing.id,
          data: {
            name,
            type,
            amount: Number(amount),
          },
        })
      );
      reset();
      setEditMode(false);
    } else {
      dispatch(
        createTransaction({
          name,
          type,
          amount: Number(amount),
        })
      );
      reset();
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    dispatch(editInActive());
    reset();
  };

  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="transaction_name">Name</label>
          <input
            className="py-1 px-2"
            required
            type="text"
            name="name"
            placeholder="Transaction Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group radio">
          <label htmlFor="transaction_type">Type</label>
          <div className="radio_group">
            <input
              className="cursor-pointer"
              required
              type="radio"
              value="income"
              name="type"
              checked={type === "income"}
              onChange={() => setType("income")}
            />
            <label htmlFor="transaction_type">Income</label>
          </div>
          <div className="radio_group">
            <input
              className="cursor-pointer"
              type="radio"
              value="expense"
              name="type"
              checked={type === "expense"}
              onChange={() => setType("expense")}
            />
            <label htmlFor="transaction_type">Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="transaction_amount">Amount</label>
          <input
            className="py-1 px-2"
            required
            type="number"
            placeholder="Enter Amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button disabled={isLoading} className="btn bg-[#4338ca]" type="submit">
          {editMode ? "Update Transaction" : "Add Transaction"}
        </button>

        {!isLoading && isError && (
          <p className="error">There was an error occurred</p>
        )}
      </form>

      {editMode && (
        <button onClick={handleCancelEdit} className="btn cancel_edit">
          Cancel Edit
        </button>
      )}
    </div>
  );
};

export default Form;
