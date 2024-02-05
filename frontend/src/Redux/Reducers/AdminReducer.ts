import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Admin,AdminState } from '../../Types/Admin.ts';



const initialState: AdminState = {
    Admin: null,
}

const SaveAdmin = (state:AdminState, action:PayloadAction<Admin>) => {
    state.Admin = action.payload;
  }

  const LogoutAdmin = (state:AdminState) => {
    state.Admin = null;
  }

  const LoadAdmin = (state:AdminState, action:PayloadAction<Admin>) => {
    state.Admin = action.payload;
  }

  
  


const AdminSlice = createSlice({
  name: 'Admin',
  initialState,
  reducers: {
    saveAdmin: SaveAdmin,
    logoutAdmin:LogoutAdmin,
    loadAdmin:LoadAdmin,
  },
});

export const  {saveAdmin,logoutAdmin,loadAdmin}  = AdminSlice.actions;


export default AdminSlice.reducer;
