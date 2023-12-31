import { createSlice } from "@reduxjs/toolkit";
import { getDealById, addDealComment } from "./dealsOperations";
import { IDealsState } from "../../types/IDeals";

const initialState: IDealsState = {
  deal: {
    _id: "",
    product: {
      _id: "",
      title: "",
      description: "",
      img: "",
      price: 0,
      verify: "",
      favorite: [],
      createdAt: "",
      owner: {
        id: "",
        firstName: "",
        lastName: "",
        phone: "",
        avatarURL: "",
        location: "",
      },
      toExchange: [],
      location: "",
    },
    offer: {
      _id: "",
      title: "",
      description: "",
      img: "",
      price: 0,
      verify: "",
      favorite: [],
      createdAt: "",
      owner: {
        id: "",
        firstName: "",
        lastName: "",
        phone: "",
        avatarURL: "",
        location: "",
      },
      toExchange: [],
      location: "",
    },
    status: null,
    productStatus: null,
    offerStatus: null,
    chat: [],
    createdAt: "",
    updatedAt: "",
  },
  isLoading: false,
  error: "",
};

export const dealsSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getDealById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDealById.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getDealById.fulfilled, (state, action) => {
        state.deal = action.payload;
        state.isLoading = false;
      })
      .addCase(addDealComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDealComment.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(addDealComment.fulfilled, (state, action) => {
        state.deal = action.payload;
        state.isLoading = false;
      });
  },
});

export type DealsState = ReturnType<typeof dealsSlice.reducer>;

export default dealsSlice.reducer;
