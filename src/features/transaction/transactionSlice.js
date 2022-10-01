import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  getTransactions,
} from "./transactionAPI";

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
  editing: {},
  type: "",
  search: "",
  page: "1"
};

// Async thunks
export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async ({type, search, page}) => {
    const transactions = await getTransactions(type, search, page);
    return transactions;
  }
);

export const createTransaction = createAsyncThunk(
  "transaction/createTransaction",
  async (data) => {
    const transaction = await addTransaction(data);
    return transaction;
  }
);

export const updateTransaction = createAsyncThunk(
  "transaction/updateTransaction",
  async ({ id, data }) => {
    const transaction = await editTransaction(id, data);
    return transaction;
  }
);

export const removeTransaction = createAsyncThunk(
  "transaction/removeTransaction",
  async (id) => {
    const transaction = await deleteTransaction(id);
    return transaction;
  }
);

// Create slice
const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload;
    },
    editInActive: (state) => {
      state.editing = {};
    },
    typeFilter: (state, action) => {
      state.type = action.payload;
    },
    searchFilter: (state, action) => {
      state.search = action.payload;
    },
    pageFilter: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error?.message;
        state.isLoading = false;
        state.transactions = [];
      })
      .addCase(createTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transactions.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error?.message;
        state.isLoading = false;
      })
      .addCase(updateTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        const indexToUpdate = state.transactions.findIndex(
          (t) => t.id === action.payload.id
        );
        state.transactions[indexToUpdate] = action.payload;
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error?.message;
        state.isLoading = false;
      })
      .addCase(removeTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload
        );
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error?.message;
        state.isLoading = false;
      });
  },
});

export default transactionSlice.reducer;
export const { editActive, editInActive, typeFilter, searchFilter, pageFilter } =
  transactionSlice.actions;
