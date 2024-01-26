import { createSlice } from "@reduxjs/toolkit";

const investPackageSlice = createSlice({
  name: 'investmentPackage',
  initialState: [],
  reducers: {
    setInvestmentPackage: (state, action) => {
      return action.payload;
    }
  }
});

export const { setInvestmentPackage } = investPackageSlice.actions;
export default investPackageSlice.reducer;
