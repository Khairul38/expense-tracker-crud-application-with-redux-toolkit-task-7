import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageFilter } from "../features/transaction/transactionSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.transaction);

  const handlePageChanged = (page) => {
    dispatch(pageFilter(page));
  };

  return (
    <section>
      <div className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 justify-end">
        <div
          onClick={() => handlePageChanged("1")}
          className={`px-4 py-1 rounded-full cursor-pointer ${
            page === "1"
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          1
        </div>
        <div
          onClick={() => handlePageChanged("2")}
          className={`px-4 py-1 rounded-full cursor-pointer ${
            page === "2"
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          2
        </div>
        <div
          onClick={() => handlePageChanged("3")}
          className={`px-4 py-1 rounded-full cursor-pointer ${
            page === "3"
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          3
        </div>
        <div
          onClick={() => handlePageChanged("4")}
          className={`px-4 py-1 rounded-full cursor-pointer ${
            page === "4"
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          4
        </div>
      </div>
    </section>
  );
};

export default Pagination;
