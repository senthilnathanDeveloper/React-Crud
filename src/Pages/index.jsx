import React from 'react'
import './style.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {useNavigate} from 'react-router-dom'
const loginValues = {
    email:'',
    password:''
}

const formValidationSchema ={
    email:yup.string().email().required("Email is Required"),
    password:yup.string().required("Password is Required").min(6,"Minimum 6 characters must").max(12,"Maximum 12 should Enough")
}

const Login = (props) => {
    const navigate = useNavigate()

const onLogin = (values,{resetForm}) => {
  // console.log(id)
    console.log(values)
    resetForm()
    navigate("/booklist")
    const data = JSON.parse(localStorage.getItem("values") || "[]") 
    values.id=Math.random()
    
    if(data){
        data.push(values)
        localStorage.setItem('values',JSON.stringify(data))
    }else {
        localStorage.setItem('values',JSON.stringify([values]))
    }
}
  
    const formik = useFormik ({
        initialValues:loginValues,
        validationSchema:yup.object(formValidationSchema),
        onSubmit:onLogin
    })
    // console.log(formik)
  return (
    <React.Fragment>
         <div className='wrapper'>
       <h1>Login</h1>
       <div className='main'>
        <div className='form-container'>
           <form className='form-group' autoComplete='off' onSubmit={formik.handleSubmit}>
             <label className='d-flex justify-content-start'>Email</label>
             <input 
             type='email'
             className='form-control'
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             name="email"
             />
            {formik.touched.email && formik.errors.email ? (
              <div className="alert alert-danger" role="alert">
              {formik.errors.email}
            </div>
            ) : null}

             <br></br>

             <label className='d-flex justify-content-start'>Password</label>
             <input 
             type='password' 
             className='form-control'
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             name="password"
            />
            {formik.touched.password && formik.errors.password ? (
             <div className="alert alert-danger" role="alert">
             {formik.errors.password}
           </div>
            ) : null}

             <br></br>

            
             <br></br>

             <button type='submit' className='btn btn-primary'>Login</button>
           </form>
         </div>
         </div>
         </div>
    </React.Fragment>
  )
}

export default Login
