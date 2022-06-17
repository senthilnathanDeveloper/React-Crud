import React from 'react'
import './style.css'
import { useForm } from "react-hook-form";

const Forms = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    // console.log(watch("example"));
  return (
  <React.Fragment>
     <div className='wrapper'>
       <h1>Login</h1>
       <div className='main'>
        <div className='form-container'>
           <form className='form-group' autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
             <label className='d-flex justify-content-start'>Email</label>
             <input 
             type='email'
             className='form-control'
             {...register("email",{required:true,})}
            
             />
              {errors.email && <span>This field is required</span>}
          

             <br></br>

             <label className='d-flex justify-content-start'>Password</label>
             <input 
             type='password' 
             className='form-control'
             {...register("password",{required:true,minLength:6,maxLength:12})}
             />

                {errors.password && <span>This field is required</span>}   
            

            
            
             <br></br>

             <button type='submit' className='btn btn-primary'>Login</button>
           </form>
         </div>
         </div>
         </div>
  </React.Fragment>
  )
}

export default Forms
