import { useState } from "react";
import { useNavigate } from "react-router-dom"
import {SaveCustomer} from '../../Redux/Actions/CustomerActions'
import { useAppDispatch } from "../../Hooks";
import { unwrapResult } from "@reduxjs/toolkit";


const Auth = () => {
    const Navigate = useNavigate();
    const Dispatch = useAppDispatch();
    const [formData,setformData]=useState({
      ID:'',
      Password:'',
    });

    const [Loading,setLoading]=useState(false);

    const HandleChange = (e:any) => {
      const { name, value } = e.target;
      setformData({...formData,[name]: value});
  };

  const handleSubmit = async(e:any) => {
    e.preventDefault(); 
    if(formData.ID!=='' && formData.Password!==''){
      setLoading(true);
   const response = await Dispatch(SaveCustomer({ID:formData.ID,Password:formData.Password}));
   const result = unwrapResult(response);

   if(result?.Success){
    setLoading(false);
    Navigate('/UserInfo');
   }else{
    setLoading(false);
    console.log('Failed Result');
   }
    }else{
      setLoading(false);
      console.log('Please Fill All Fields')
    }
    
};
    
  return ( 
    <div className="flex flex-col gap-2 justify-center items-center w-full h-screen bg-gradient-to-r from-slate-900 to-slate-700">
    <h1 className="text-white text-center font-bold text-lg">Customer Login</h1>
    <form onSubmit={handleSubmit} className="w-full max-w-md  bg-white shadow-md rounded-md p-10">
    <div className="mb-5">
      <label
        htmlFor="ID"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your Customer ID
      </label>
      <input
       onChange={HandleChange}
        type="text"
        id="ID"
        name="ID"
        value={formData.ID}
        className="bg-gray-50 border placeholder:text-xs border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter Your Customer ID"
        required
      />
    </div>
    <div className="mb-5">
      <label
        htmlFor="password"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your password
      </label>
      <input
      onChange={HandleChange}
        type="Password"
        id="Password"
        name="Password"
        value={formData.Password}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
    </div>
   
   <div className="relative">
    <button
      type="submit"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Submit
    </button>


    <div role="status" className={`${Loading?'':'hidden'} absolute right-5 top-1`}>
  <svg
    aria-hidden="true"
    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-500"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
</div>



    </div>
  </form>
  <button onClick={()=>Navigate('/AdminLogin')} className="text-white ">Not a Customer? <span className="text-blue-500 hover:underline opacity-80  hover:opacity-100 transition-all ease-in-out">Login As Admin Here</span></button>
  </div>
  
  )
}

export default Auth