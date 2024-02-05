import { useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../Hooks";
import { LoadCustomer,LogoutCustomer,SaveCustomerDetails } from "../../Redux/Actions/CustomerActions";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const dispatch = useAppDispatch();
  const Navigate = useNavigate();
  const Customer = useAppSelector((state)=>state.UserState.Customer);
  
  const [Loading,setLoading]=useState(false);

  //For Clean Code Setting Up Form Data Values
const Date = Customer && Customer.orderDate && Customer.orderDate!==''?Customer.orderDate: '';
const Company = Customer && Customer.company && Customer.company!==''?Customer.company: '';
const Owner = Customer && Customer.owner && Customer.owner!==''?Customer.owner: '';
const Item = Customer && Customer.Item && Customer.Item!==''?Customer.Item: '';
const Quantity = Customer && Customer.quantity && Customer.quantity!==0?Customer.quantity: '';
const Weight = Customer && Customer.weight && Customer.weight!==0?Customer.weight: '';
const ShipmentRequest = Customer && Customer.requestForShipment && Customer.requestForShipment!==''?Customer.requestForShipment: '';
const TrackingID = Customer && Customer.trackingID && Customer.trackingID!==''?Customer.trackingID: '';
const BoxCount = Customer && Customer.boxCount && Customer.boxCount!==0?Customer.boxCount: '';
const ChecklistQuantity = Customer && Customer.checklistQuantity && Customer.checklistQuantity!==''?Customer.checklistQuantity: '';
const Specifications = Customer && Customer.specification && Customer.specification!==''?Customer.specification: '';
const Length = Customer && Customer.shipmentSize?.length && Customer.shipmentSize.length!==0?Customer.shipmentSize.length: '';
const Breadth = Customer && Customer.shipmentSize?.breadth && Customer.shipmentSize.breadth!==0?Customer.shipmentSize.breadth: '';
const Height = Customer && Customer.shipmentSize?.height && Customer.shipmentSize.height!==0?Customer.shipmentSize.height: '';


  const [formData, setFormData] = useState({
    orderDate: Date,
    company: Company,
    owner: Owner,
    Item: Item,
    quantity: Quantity,
    weight: Weight,
    requestForShipment:ShipmentRequest,
    trackingID:TrackingID,
    boxCount: BoxCount,
    checklistQuantity:ChecklistQuantity,
    specification:Specifications,
    shipmentSize: { length: Length, breadth:Breadth, height: Height }
  });


const FetchCustomer = useCallback(async()=>{
try {
  setLoading(true);
 const response = await dispatch(LoadCustomer());
 const result = unwrapResult(response);
 if(!result?.Success){
  Navigate('/Login');
 }
  setLoading(false);
} catch (error) {
  console.log(error);
  Navigate('/Login');
  setLoading(false);
}
},[dispatch]);

const HandleLogout = async()=>{
try {
  setLoading(true);
const response = await dispatch(LogoutCustomer());
const result = unwrapResult(response);
if(result?.Success){
  Navigate('/Login');
}
  setLoading(false);
} catch (error) {
  console.log(error);
  setLoading(false);
}
}

useEffect(()=>{
FetchCustomer();
},[FetchCustomer]);


const handleChange = (e: any) => {
  const { name, value } = e.target;
  const parsedValue = typeof(value) === 'string' ? value : parseFloat(value);
  setFormData(prevState => ({
    ...prevState,
    [name]: parsedValue
  }));
};

  const handleShipmentSizeChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      shipmentSize: {
        ...prevState.shipmentSize,
        [name]: value
      }
    }));
  };

  const isFormDataValid = () => {
    for (const key in formData) {
      if ((formData as { [key: string]: any })[key] !== "" && (formData as { [key: string]: any })[key] !== 0) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    if(Customer){
    if(isFormDataValid()){
      try {
        setLoading(true);
      const response = await dispatch(SaveCustomerDetails({Customer:formData,userID:Customer._id}));
      const result = unwrapResult(response);
      if(result?.Success){
        Navigate('/');
      }else{
        console.log('Error Details Not Saved');
      } 
      setLoading(false);
    } catch (error:any) {
        console.log(error);
        setLoading(false);
      }
    }else{
      console.log('Fill All The Fields');
    }
  }else{
    console.log('No User Found Login');
    Navigate('/Login');
  }
   
  
  };

  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center relative items-center bg-gradient-to-r from-slate-900 to-slate-700">
    <button onClick={HandleLogout} className="border p-2 rounded-md text-white shadow absolute top-5 left-5">Logout</button>
    <h1 className="text-white text-center font-bold not-italic">{Customer && Customer.company!=='' && Customer.owner!==''?'Edit Your Details':'Fill The Following Details'}</h1>
    {!Loading?
    <form onSubmit={handleSubmit} className="max-w-2xl  h-[650px] lg:overflow-hidden overflow-y-auto md:h-max mx-auto w-full border bg-white p-5 rounded-md">
    <div className="relative z-0 w-full mb-5 group">
      <input
        type="date"
        name="orderDate"
        id="orderDate"
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
        autoComplete="off"
        value={formData.orderDate}
        onChange={handleChange}
      />
      <label
        htmlFor="orderDate"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        order Date 
      </label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
      <input
        type="text"
        name="company"
        id="company"
    pattern="[a-zA-Z0-9 ]*"
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
        autoComplete="off"
        value={formData.company}
        onChange={handleChange}
      />
      <label
        htmlFor="company"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        company <span className="text-xs">{`(only alpha numeric)`}</span>
      </label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
      <input
        type="text"
        name="owner"
        id="owner"
    pattern="[a-zA-Z0-9 ]*"
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
        autoComplete="off"
        value={formData.owner}
        onChange={handleChange}
      />
      <label
        htmlFor="owner"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        owner <span className="text-xs">{`(only alpha numeric)`}</span>
      </label>
    </div>

    <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="Item"
          id="Item"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          autoComplete="off"
          value={formData.Item}
          onChange={handleChange}
        />
        <label
          htmlFor="Item"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Item
        </label>
      </div>

    <div className="grid md:grid-cols-2 md:gap-6">
      
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="number"
          name="quantity"
          id="quantity"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          min={1}
          autoComplete="off"
          value={formData.quantity}
          onChange={handleChange}
        />
        <label
          htmlFor="quantity"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
         quantity
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="number"
          name="weight"
          id="weight"
          step="any"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          min={1}
          autoComplete="off"
          value={formData.weight}
          onChange={handleChange}
        />
        <label
          htmlFor="weight"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
         weight {`(KG)`}
        </label>
      </div>
    </div>

    <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="requestForShipment"
          id="requestForShipment"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          autoComplete="off"
          value={formData.requestForShipment}
          onChange={handleChange}
        />
        <label
          htmlFor="requestForShipment"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
         Request For Shipment
        </label>
      </div>


    <div className="grid md:grid-cols-3 md:gap-6">
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="trackingID"
          id="trackingID"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          autoComplete="off"
          value={formData.trackingID}
          onChange={handleChange}
        />
        <label
          htmlFor="trackingID"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          tracking ID
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="number"
          name="boxCount"
          id="boxCount"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          autoComplete="off"
          min={0}
          value={formData.boxCount}
          onChange={handleChange}
        />
        <label
          htmlFor="boxCount"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          boxCount
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="checklistQuantity"
          id="checklistQuantity"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          autoComplete="off"
          value={formData.checklistQuantity}
          onChange={handleChange}
        />
        <label
          htmlFor="checklistQuantity"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
         checklist Quantity
        </label>
      </div>
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="specification"
          id="specification"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          autoComplete="off"
          value={formData.specification}
          onChange={handleChange}
        />
        <label
          htmlFor="specification"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
        specification
        </label>
      </div>
    
    <h1>shipment Size :</h1>
    <div className="grid mt-2 md:grid-cols-3 md:gap-6">
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="number"
          name="length"
          id="length"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          min={1}
          autoComplete="off"
          value={formData.shipmentSize.length}
          onChange={handleShipmentSizeChange}
        />
        <label
          htmlFor="length"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          length 
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="number"
          name="breadth"
          id="breadth"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          min={1}
          autoComplete="off"
          value={formData.shipmentSize.breadth}
          onChange={handleShipmentSizeChange}
        />
        <label
          htmlFor="breadth"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          breadth
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="number"
          name="height"
          id="height"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          min={1}
          autoComplete="off"
          value={formData.shipmentSize.height}
          onChange={handleShipmentSizeChange}
        />
        <label
          htmlFor="height"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          height
        </label>
      </div>
    </div>


    
    

    
    <button
      type="submit"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Save & Continue
    </button>
  </form>
  :
  <div className="w-full max-w-2xl h-[650px] animate-pulse bg-white rounded-md">

  </div>
    }
  </div>
  
  )
}

export default UserDetails