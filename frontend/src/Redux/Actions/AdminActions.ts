import axios from "axios";
import {createAsyncThunk,Dispatch } from "@reduxjs/toolkit"; 
import {
  loadAdmin,
  logoutAdmin,
  saveAdmin
} from '../Reducers/AdminReducer';
import { Admin } from "../../Types/Admin";

const instance = axios.create({
    baseURL:"https://juhosi-frontend-lovat.vercel.app/api/Admin" //Backend Base Url
});


export const SaveAdmin = createAsyncThunk('Admin/save',async(Admin:{ID:string,Password:string},{ dispatch }: { dispatch: Dispatch })=>{
    try{
    const route = `/AdminLogin`;
    const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};
    const {data} = await instance.post(route,{ID:Admin.ID,Password:Admin.Password},config)   
     dispatch(saveAdmin(data.user as Admin));
    return {Success:true}
    }catch(error:any){
    console.log(error);
    }
});




export const LogoutAdmin = createAsyncThunk('Admin/logout',async(_,{ dispatch }: { dispatch: Dispatch })=>{
    try{
        const route = `/LogoutAdmin`;
        const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};
        const {data} = await instance.get(route,config);
       if(data?.success){
     dispatch(logoutAdmin());
     return {Success:true}
       }
    }catch(error:any){
    console.log(error);
    }
});


export const LoadAdmin = createAsyncThunk('Admin/Load',async(_,{ dispatch }: { dispatch: Dispatch })=>{
    try{
    const route = `/LoadAdmin`;
    const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};
    const {data} = await instance.get(route,config)   
     dispatch(loadAdmin(data.Admin as Admin));
    return {Success:true}
    }catch(error:any){
    console.log(error);
    }
});








