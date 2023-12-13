import logo from './logo.svg';
import './App.css';
import { MdClose } from "react-icons/md";
import Formtable from './components/Formtable';
import { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:4000/"
function App() {

  const [addSection,setAddSection] = useState(false)
  const [editSection,setEditSection] = useState(false)
   const [formData,setFormData] = useState({
    name:"",
    email:"",
    mobile:"",
   })
   const [formDataEdit,setFormDataEdit] = useState({
    name:"",
    email:"",
    mobile:"",
    _id:"" 
   })
   const [dataList,setDataList] = useState([])

   const handleOnChange = (e)=>{
    const {value,name} = e.target
    setFormData((preve)=>{
      return{
        ...preve,
        [name]:value
      }
    })
   }

  const handleSubmit = async(e)=>{
e.preventDefault()
const data = await axios.post("/create",formData)
console.log(data)
if(data.data.success){
  setAddSection(false)
  alert(data.data.message)
  getFetchData()
  setFormData({
    name: "",
    email:"",
    mobile:""
  })
}
  }
 const getFetchData= async()=>{
  const data = await axios.get("/")

if(data.data.success){
 
  // alert(data.data.message)
  setDataList(data.data.data)
 }
}
useEffect(()=>{
  getFetchData()
},[])

const handleDelete = async(id)=>{
  const data = await axios.delete("/delete/"+id)
  if(data.data.success){
    getFetchData()
    alert(data.data.message)
  }
}

const handleUpdate = async(e)=>{
e.preventDefault()
const data = await axios.put("/update/",formDataEdit)
if(data.data.success){
  getFetchData()
  alert(data.data.message)
  setEditSection(false);
}

}
const handleEditOnChane = async(e)=>{
  const {value,name} = e.target
  setFormDataEdit((preve)=>{
    return{
      ...preve,
      [name]:value
    }
  })
}
const handleEdit = (el)=>{
  setFormDataEdit(el)
  setEditSection(true)
}

  return (
  <>
   <div className="container">
    <button className="btn btn-add" onClick={()=>setAddSection(true)}>Add</button>

    {
      addSection && (
      <Formtable
      handleSubmit= {handleSubmit}
      handleOnChange={handleOnChange}
      handleclose={()=>setAddSection(false)}
      rest = {formData}
      />
      )
    }
    {
      editSection && (
      <Formtable
      handleSubmit= {handleUpdate}
      handleOnChange={handleEditOnChane}
      handleclose={()=>setEditSection(false)}
      rest={formDataEdit}
      />
      )
    }

    <div className='tableContainer'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>
              
            </th>

          </tr>
        </thead>
         
        {
  dataList[0] ? (
    <tbody>
      {dataList.map((el) => (
        <tr key={el._id}>
          <td>{el.name}</td>
          <td>{el.email}</td>
          <td>{el.mobile}</td>
          <td>
            {/* <button className='btn btn-edit' onClick={handleEdit(el)}>Edit</button> */}
            <button className='btn btn-edit' onClick={() => handleEdit(el)}>Edit</button>

            <button className='btn btn-delete' onClick={() => handleDelete(el._id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  ) : (
    <tbody>
      <tr>
        <td colSpan="4" style={{ textAlign: "center" }}>
          No Data
        </td>
      </tr>
    </tbody>
  )
}
      </table>
    </div>
    
   </div>
  </>
  );
}

export default App;





