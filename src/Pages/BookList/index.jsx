import React,{useState,useEffect,useRef} from 'react'
import './style.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'


const storeInitialValue ={
    title:'',
    author:'',
    bookName:'',
}

const storeFormValidationSchema = {
    title:yup.string().required("Title is Required").matches(/^[A-Za-z ]*$/, 'Only Alphabets are Allowed'),
    author:yup.string().required("Author Name is Required"),
    bookName:yup.string().required("BookName is Required"),
}

const getData = () => {
    const data = localStorage.getItem("bookdetails")
    if(data) {
      return JSON.parse(data)
    }else{
      return[]
    }
  }

const   BookList = (props) => {
    const [stores,setStore] = useState(getData())
    const [currentRecord, setCurrentRecord] = useState(0)
    const [isEditing,setIsEditing] = useState(false)
    const tableRef = useRef(null);
   
  
    const navigate = useNavigate()

    const onStore = (values,{resetForm}) => { 
    console.log(values)
        resetForm()
        const data = JSON.parse(localStorage.getItem("bookdetails")) 
        console.log(data)
        values.id=Math.random()
    
    if(data){
        data.push(values)
        localStorage.setItem('bookdetails',JSON.stringify(data))
        window.location.href="/booklist"
    }else {
        localStorage.setItem('bookdetails',JSON.stringify([values]))
    }
 
}




const handleDelete = (id) => {
  console.log(id)
  alert("Are sure to delete the Data")
  const filteredItems = stores.filter((element,index) => {
  return element.id!==id
  })
  setStore(filteredItems);
  // console.log(filteredItems)
  }

  const deleteAccount = (id) => {
    localStorage.removeItem("values")
    navigate("/")
  }

  
  const handleEditClick = async(id) => {
  // console.log(id)
  setCurrentRecord(id)
  const data = JSON.parse(localStorage.getItem("bookdetails"))
  const updatedItem = data.find((item) => item.id ===id)
  // setTodoValue({...updatedItem})
  // console.log("Formik", formik)
    formik.setFieldValue('title',`${updatedItem.title}`) 
    formik.setFieldValue('author',`${updatedItem.author}`) 
    formik.setFieldValue('bookName',`${updatedItem.bookName}`)
  // console.log(updatedItem)
    setIsEditing(true)
   }


  const handleUpdate = (e) => {
   e.preventDefault()
   const data = JSON.parse(localStorage.getItem('bookdetails'))
  //  console.log(data)
   const id = currentRecord
    const updatedRecords = data.map(record => {
      if (record.id === id){
        record.title = formik.values.title
        record.author = formik.values.author
        record.bookName = formik.values.bookName
        alert("Updated Successfully")
        window.location.href="/booklist"
      }
        return record;
     
    })
 
    // data[0].title = formik.values.title
  localStorage.setItem('bookdetails',JSON.stringify(updatedRecords))
    // console.log(set)
      // window.location.href="/booklist"
  }
    
    const formik = useFormik({
        initialValues:storeInitialValue,
        validationSchema:yup.object(storeFormValidationSchema),
        onSubmit:onStore,
      })
      // console.log(formik)


     useEffect(() => {
        localStorage.setItem("bookdetails",JSON.stringify(stores))
    },[stores])
  
  return (
  <React.Fragment>
    <header>
    
          <button onClick={deleteAccount}>LogOut</button>
          
 
       
       
    </header>
     <div className='wrapper'>
       <h1>Store Management</h1>
       <div className='main'>

       {isEditing ? (
      <div className='form-container'>
      <form className='form-group' autoComplete='off'>
      <label className='d-flex justify-content-start'>Title</label>
      <input type='text' className='form-control'
      onChange={formik.handleChange}
      value={formik.values.title || ""}
      // value={todoValue.title}
      name="title"
      onBlur={formik.handleBlur}
      />
       {formik.touched.title && formik.errors.title ? (
              <div className="alert alert-danger" role="alert">
              {formik.errors.title}
            </div>
            ) : null}
      <br></br>


      <label className='d-flex justify-content-start'>Author</label>
      <input type='text' className='form-control' 
      onChange={formik.handleChange}
      value={formik.values.author ||""}
      onBlur={formik.handleBlur}
      name="author"
      />
       {formik.touched.author && formik.errors.author ? (
              <div className="alert alert-danger" role="alert">
              {formik.errors.author}
            </div>
            ) : null}
      <br></br>

      <label className='d-flex justify-content-start'>BookName</label>
      <input type='text' className='form-control' 
      onChange={formik.handleChange}
      value={formik.values.bookName}
      onBlur={formik.handleBlur}
      name="bookName"
      />
       {formik.touched.bookName && formik.errors.bookName ? (
              <div className="alert alert-danger" role="alert">
              {formik.errors.bookName}
            </div>
            ) : null}
      <br></br>
      <button type='submit' className='btn btn-primary' onClick={handleUpdate} >Update</button>
      </form>
      </div>
        ):(
        
         <div className='form-container'>
           <form className='form-group' autoComplete='off' onSubmit={formik.handleSubmit}>
             <label className='d-flex justify-content-start'>Title</label>
             <input type='text' className='form-control' required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="title"
             />
              {formik.touched.title && formik.errors.title ? (
              <div className="alert alert-danger" role="alert">
              {formik.errors.title}
            </div>
            ) : null}

             <br></br>

             <label className='d-flex justify-content-start'>Author</label>
             <input type='text' className='form-control' required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="author"
             />
              {formik.touched.author && formik.errors.author ? (
              <div className="alert alert-danger" role="alert">
              {formik.errors.author}
            </div>
            ) : null}

             <br></br>

             <label className='d-flex justify-content-start'>BookName</label>
             <input type='text' className='form-control' required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="bookName"
             />
              {formik.touched.bookName && formik.errors.bookName ? (
              <div className="alert alert-danger" role="alert">
              {formik.errors.bookName}
            </div>
            ) : null}

             <br></br>

            <button type='submit' className='btn btn-primary'>Add</button>
           </form>
         </div>
         

         )}
    

                
                
               

         <div className='view-container '>
         {/* <button> Export excel </button> */}
         {stores.length>0 && <>
        
                <table className='table' ref={tableRef}>
                  <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>BooksName</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                  </thead>
                  <tbody>
                  {stores.map((store,id) => (
                       <tr key={id}>
                       <td>{store.title}</td>
                       <td>{store.author}</td>
                       <td>{store.bookName}</td>
                       <td><i className="fa-solid fa-pen-to-square " htmlFor="edit-icon" onClick ={() => handleEditClick(store.id)}></i></td>
                       <td><i className="fa-solid fa-trash-can" onClick={() => handleDelete(store.id)}></i></td>
                       </tr>
                 ))}
                  </tbody>
                </table>
             
                </>}
              
              {stores.length<1 && <div>Books are not available</div>}
         </div>
       </div>
     </div>
  </React.Fragment>
  )
}

export default BookList
