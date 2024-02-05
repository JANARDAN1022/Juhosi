import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks";
import { LoadAdmin, LogoutAdmin } from "../../Redux/Actions/AdminActions";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CustomerType } from "../../Types/Customer";

const AdminHome = () => {
  const dispatch = useAppDispatch();
  const [Loading, setLoading] = useState(false);
  const [Customers,setCustomers]=useState<CustomerType[] | []>([]);
  const Navigate = useNavigate();
  const Admin = useAppSelector((state)=>state.AdminState.Admin);

  

  const HandleLogout = async () => {
    try {
      setLoading(true);
      const response = await dispatch(LogoutAdmin());
      const result = unwrapResult(response);
      if (result?.Success) {
        Navigate('/AdminLogin');
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


const FetchCustomers = useCallback(async()=>{
try {
  setLoading(true);
  const route = `https://juhosi-frontend-lovat.vercel.app/api/Users/AllCustomers`;
  const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};
  const {data} = await axios.get(route,config); 
  if(data && data.Customers){
    setCustomers(data.Customers as CustomerType[]);
  }else{
    console.log(data,'Data');
  }  
  setLoading(false);
} catch (error:any) {
  console.log(error);
  setLoading(false);
}
},[]);


const FetchAdmin = useCallback(async () => {
  try {
    setLoading(true);
    const response = await dispatch(LoadAdmin());
    const result = unwrapResult(response);
    if (!result?.Success) {
      Navigate('/AdminLogin');
    }
   await FetchCustomers();
    setLoading(false);
  } catch (error) {
    console.log(error);
    Navigate('/AdminLogin');
    setLoading(false);
  }
}, [dispatch]);

  useEffect(() => {
   FetchAdmin();
  }, [FetchAdmin]);




  return (
    <div className="relative flex flex-col  gap-4 justify-center items-center bg-gradient-to-r from-slate-900 to-slate-700 h-screen w-full text-white">
      
      <button className="absolute top-5 left-5 border p-2 rounded-md opacity-80 hover:opacity-100" onClick={HandleLogout}>Logout</button>
      <h1 className="font-bold text-lg">Customer Information</h1>
      {Admin && !Loading?
      (Customers && Customers.length>0?
       
      <div className="relative flex flex-col gap-2 overflow-x-auto w-full max-w-lg h-[250px] shadow-md rounded-md sm:rounded-lg bg-white p-2">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  p-2 rounded-md">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
      <th scope="col" className="px-6 py-3">
         Item/Customer
        </th>
      {Customers.map((Customer)=>(
        <th key={Customer._id} scope="col" className="px-6 py-3">
          {Customer.ID}
        </th>
        )) }
      </tr>
    </thead>
    <tbody>
      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          Quantity
        </th>
        {Customers.map((Customer)=>(
        <td key={Customer._id} className={`${Customer.quantity>=10?'px-11':'px-12'}`}>{Customer.quantity!==0?Customer.quantity:'N/A'}</td>
        ))}
      </tr>
      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
        Weight
        </th>
        {Customers.map((Customer)=>(
        <td key={Customer._id} className={`${Customer.weight>=10?'px-11':'px-12'}`}>{Customer.weight!==0?Customer.weight:'N/A'}</td>
        ))}
        
      </tr>
      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          Box Count
        </th>
        {Customers.map((Customer)=>(
        <td key={Customer._id} className={`${Customer.boxCount>=10?'px-11':'px-12'}`}>{Customer.boxCount!==0?Customer.boxCount:'N/A'}</td>
        ))}
        
      </tr>
   
    </tbody>
  </table>
</div>
:
<div></div>
  )
:
<div className="relative flex flex-col gap-2 overflow-x-auto w-full max-w-lg h-[250px] shadow-md sm:rounded-lg bg-white p-2 animate-pulse"/>
}


      </div>
  )
}

export default AdminHome