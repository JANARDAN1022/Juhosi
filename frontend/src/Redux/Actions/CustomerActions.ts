import axios from "axios";
import {createAsyncThunk,Dispatch } from "@reduxjs/toolkit"; 
import {
   saveCustomer,
   logoutCustomer,
   loadCustomer
} from '../Reducers/CustomerReducer';
import { CustomerType } from "../../Types/Customer";

const instance = axios.create({
    baseURL:"http://localhost:5000/api/Users" //Backend Base Url
});


export const SaveCustomer = createAsyncThunk('user/save',async(Customer:{ID:string,Password:string},{ dispatch }: { dispatch: Dispatch })=>{
    try{
    const route = `/Login`;
    const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};
    const {data} = await instance.post(route,{ID:Customer.ID,Password:Customer.Password},config)   
     dispatch(saveCustomer(data.user as CustomerType));
    return {Success:true}
    }catch(error:any){
    console.log(error);
    }
});




export const LogoutCustomer = createAsyncThunk('user/logout',async(_,{ dispatch }: { dispatch: Dispatch })=>{
    try{
        const route = `/Logout`;
        const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};
        const {data} = await instance.get(route,config);
       if(data?.success){
     dispatch(logoutCustomer());
     return {Success:true}
       }
    }catch(error:any){
    console.log(error);
    }
});


export const LoadCustomer = createAsyncThunk('user/save',async(_,{ dispatch }: { dispatch: Dispatch })=>{
    try{
    const route = `/LoadUser`;
    const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};
    const {data} = await instance.get(route,config)   
     dispatch(loadCustomer(data.user as CustomerType));
    return {Success:true}
    }catch(error:any){
    console.log(error);
    }
});

export const SaveCustomerDetails = createAsyncThunk('user/save',async(CustomerDetails:{Customer:any,userID:string},{ dispatch }: { dispatch: Dispatch })=>{
    try{
    const route = `/SaveUser/${CustomerDetails.userID}`;
    const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};
    const {data} = await instance.put(route,CustomerDetails.Customer,config)   
     dispatch(saveCustomer(data.user as CustomerType));
    return {Success:true}
    }catch(error:any){
    console.log(error);
    }
});







