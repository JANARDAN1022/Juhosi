import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks";
import { LoadCustomer, LogoutCustomer } from "../../Redux/Actions/CustomerActions";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useAppDispatch();
  const [Loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const Customer = useAppSelector((state)=>state.UserState.Customer);

  const FetchCustomer = useCallback(async () => {
    try {
      setLoading(true);
      const response = await dispatch(LoadCustomer());
      const result = unwrapResult(response);
      if (!result?.Success) {
        Navigate('/Login');
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      Navigate('/Login');
      setLoading(false);
    }
  }, [dispatch]);

  const HandleLogout = async () => {
    try {
      setLoading(true);
      const response = await dispatch(LogoutCustomer());
      const result = unwrapResult(response);
      if (result?.Success) {
        Navigate('/Login');
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchCustomer();
  }, [FetchCustomer]);

  return (
    <div className={`flex flex-col justify-center items-center  gap-4 bg-gradient-to-r from-slate-900 to-slate-700 text-white h-screen`}>
        
        {Customer && !Loading?
      <div className={`bg-white relative  shadow rounded-lg border w-full max-w-xl h-[650px]`}>
        <div className="absolute flex flex-col sm:flex-row gap-2 top-4 sm:items-center right-5">
        <button disabled={Loading} className="border text-xs border-black rounded-md opacity-70 hover:opacity-100 text-black p-1 sm:p-2  " onClick={HandleLogout}>Logout</button>
        <button onClick={()=>Navigate('/UserInfo')} disabled={Loading} className="border text-xs sm:text-sm border-blue-500 rounded-md opacity-70 hover:opacity-100 text-blue-500 p-1 sm:p-2  ">Edit Information</button>
      </div>
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
            {Customer.ID} Details
          </h3>
          <p className="mt-1 invisible  sm:visible max-w-2xl text-xs sm:text-sm text-gray-500">
            This is some information {Customer.ID}.
          </p>
        </div>
        <div className="overflow-y-auto h-[550px]">
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Order Date</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
               {Customer.orderDate}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Company</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
               {Customer.company}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Owner</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {Customer.owner}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Item</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {Customer.Item}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Quantity</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {Customer.quantity}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Weight</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {Customer.weight} {'KG'}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Request For Shipment</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
               {Customer.requestForShipment}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Tracking ID</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {Customer.trackingID}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Box Count</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {Customer.boxCount}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Checklist Quantity</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
               {Customer.checklistQuantity}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Specification</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {Customer.specification}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Shipment Size</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Length: {Customer.shipmentSize.length} cm,  Breadth: {Customer.shipmentSize.breadth} cm,  Height: {Customer.shipmentSize.height} cm
              </dd>
            </div>
          </dl>
        </div>
        </div>
      </div>
      :
      <div className={`animate-pulse bg-white overflow-hidden shadow rounded-lg border w-full max-w-xl h-[650px]`} />
      }

    </div>
  )
}

export default Home;
