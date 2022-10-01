import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Transaction from "../components/Transaction";
import {
  fetchTransactions,
  searchFilter,
  typeFilter,
} from "../features/transaction/transactionSlice";
import SearchImage from "../assets/images/search.svg";
import Pagination from "../components/Pagination";

const ViewAllTransactions = () => {
  const { transactions, isLoading, isError, search, type, page } = useSelector(
    (state) => state.transaction
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions({ type, search, page }));
  }, [dispatch, type, search, page]);

  // Handle Debounce
  const debounce = (fn, delay) => {
    let timeoutId;
    return (...e) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        fn(...e);
      }, delay);
    };
  };

  // decide what to render
  let content = null;
  if (isLoading) content = <p>Loading...</p>;
  if (!isLoading && isError) content = <p>There was an error occurred</p>;
  if (!isLoading && !isError && transactions?.length === 0)
    content = <p>No transaction found</p>;
  if (!isLoading && !isError && transactions?.length > 0) {
    content = transactions.map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));
  }

  return (
    <>
      <p className="second_heading">All Transactions:</p>
      <div className="flex gap-5 mb-2">
        <div className="radio_group">
          <input
            className="cursor-pointer"
            required
            type="radio"
            value="all"
            name="type"
            // checked={type === "income"}
            onChange={() => dispatch(typeFilter("all"))}
          />
          <label htmlFor="transaction_type">All</label>
        </div>
        <div className="radio_group">
          <input
            className="cursor-pointer"
            required
            type="radio"
            value="income"
            name="type"
            // checked={type === "income"}
            onChange={() => dispatch(typeFilter("income"))}
          />
          <label htmlFor="transaction_type">Income</label>
        </div>
        <div className="radio_group">
          <input
            className="cursor-pointer"
            type="radio"
            value="expense"
            name="type"
            // checked={type === "expense"}
            onChange={() => dispatch(typeFilter("expense"))}
          />
          <label htmlFor="transaction_type">Expense</label>
        </div>
        <div className="border border-slate-200 flex items-center bg-white h-10 px-5 rounded-lg text-sm ring-emerald-200">
          {/* <!-- search --> */}
          <form
          // onSubmit={handleSubmit}
          >
            <input
              className="outline-none border-none mr-2"
              type="search"
              name="search"
              placeholder="Search"
              // value={input}
              onChange={debounce((e) => dispatch(searchFilter(e.target.value)), 400)}
            />
          </form>
          <img
            className="inline h-4 cursor-pointer"
            src={SearchImage}
            alt="Search"
          />
        </div>
      </div>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
        <Pagination />
      </div>
    </>
  );
};

export default ViewAllTransactions;
