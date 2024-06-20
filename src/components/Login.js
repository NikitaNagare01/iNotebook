import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const[credential, setcredentials]=useState({email:"", password:""});
    const navigate= useNavigate();
    

    const handleSubmit=async(e)=>{
        e.preventDefault();

        const response= await fetch("http://localhost:5000/api/auth/login",{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({email:credential.email, password:credential.password})
        });
        const json = await response.json();
        console.log(json);

        if(json.success){
          localStorage.setItem('token', json.authtoken);
          navigate("/Home");
          props.showAlert("Logged in successfully", "success");

        }else{
          props.showAlert("Invalid Credentials", "danger");
        }

        setcredentials({email:"", password:""})
    }

    const onChange=(e)=>{
      setcredentials({...credential, [e.target.name]:e.target.value})
    }

  return (
    <div className='container'>

      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
            <label htmlFor='email' className='col-sm-2 col-form-label'>Email address</label>
            <div className="col-sm-10">
              <input type='email' className='form-control' id='email' name='email' aria-describedby='emailHelp' value={credential.email} onChange={onChange}/>
            <div className='form-text' id="emailHelp" >We will never share your email with anyone else</div>
            </div>
        </div>
        <div className="mb-3 row">
            <label htmlFor="password" className='col-sm-2 col-form-label'>Password</label>
            <div className="col-sm-10">
              <input type='password' className='form-control' name='password' id='password' value={credential.password} onChange={onChange}/> 
            </div>
        </div>
        <button type='submit' className='btn btn-primary' >Submit</button>
      </form>
    </div>
  )
}

export default Login
