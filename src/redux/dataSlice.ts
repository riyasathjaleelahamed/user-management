// src/redux/dataSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Item {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

interface DataState {
  items: Item[];
  loading: boolean;
}

const initialState: DataState = {
  items: [],
  loading: false,
};

// Fetch employees from JSONPlaceholder API with professional-looking avatars
export const fetchItems = createAsyncThunk("data/fetchItems", async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users?_limit=10");

  return res.data.map((u: any, idx: number) => ({
    id: u.id,
    firstName: u.name.split(" ")[0],
    lastName: u.name.split(" ")[1] || "",
    email: u.email,
    avatar: `https://randomuser.me/api/portraits/${idx % 2 === 0 ? "men" : "women"}/${idx + 10}.jpg`,
  })) as Item[];
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<Item>) => {
      const index = state.items.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => { state.loading = true; })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchItems.rejected, (state) => { state.loading = false; });
  },
});

export const { addItem, updateItem, deleteItem } = dataSlice.actions;
export default dataSlice.reducer;
