import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomerState,CustomerType } from '../../Types/Customer.ts';



const initialState: CustomerState = {
  Customer: null,
}

const SaveCustomer = (state:CustomerState, action:PayloadAction<CustomerType>) => {
    state.Customer = action.payload;
  }

  const LogoutCustomer = (state:CustomerState) => {
    state.Customer = null;
  }

  const LoadCustomer = (state:CustomerState, action:PayloadAction<CustomerType>) => {
    state.Customer = action.payload;
  }
  


const CustomerSlice = createSlice({
  name: 'Customer',
  initialState,
  reducers: {
    saveCustomer: SaveCustomer,
    logoutCustomer:LogoutCustomer,
    loadCustomer:LoadCustomer,
  },
});

export const  {saveCustomer,logoutCustomer,loadCustomer}  = CustomerSlice.actions;


export default CustomerSlice.reducer;
