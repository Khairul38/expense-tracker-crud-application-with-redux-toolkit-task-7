import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../features/transaction/transactionSlice";
import Transaction from "./Transaction";
import { Link } from "react-router-dom";

const Transactions = () => {
  const { transactions, isLoading, isError, type, search, page } = useSelector(
    (state) => state.transaction
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions({ type, search, page }));
  }, [dispatch, type, search, page]);

  // decide what to render
  let content = null;
  if (isLoading) content = <p>Loading...</p>;
  if (!isLoading && isError) content = <p>There was an error occurred</p>;
  if (!isLoading && !isError && transactions?.length === 0)
    content = <p>No transaction found</p>;
  if (!isLoading && !isError && transactions?.length > 0) {
    content = [...transactions]
      .sort((a, b) => b.id - a.id)
      .slice(0, 5)
      .map((transaction) => (
        <Transaction key={transaction.id} transaction={transaction} />
      ));
  }
  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
        {transactions?.length > 4 && !isLoading && (
          <Link to={"/viewAllTransactions"}>
            <button className="btn">View All</button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Transactions;
