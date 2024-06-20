import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const[credential, setcredential] = useState({name:"", email:"", password:"", cpassword:""})
  const navigate=useNavigate();

  const onSubmit=async(e)=>{
    e.preventDefault();

    const response =await fetch("http://localhost:5000/api/auth/createuser",{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({name:credential.name, email:credential.email, password:credential.password})
    })
    const json= await response.json();
    console.log(json);
    if(json.success){
      localStorage.setItem('token', json.authtoken);
      navigate("/Home");
      props.showAlert("Successfully Signed in", "success");
    }else{
      props.showAlert("Invalid Details", "danger");
    }
    setcredential({name:"", email:"", password:"", cpassword:""});
  }

  const onChange=(e)=>{
    setcredential({...credential, [e.target.name]:e.target.value});
  }

  return (
    <div className='container'>

        <form onSubmit={onSubmit}>
          <div className="mb-3 row">
            <label htmlFor='name' className='col-sm-2 col-form-label'>Name</label>
            <div className="col-sm-10">
              <input type='text' className='form-control' id='name' name='name' onChange={onChange} value={credential.name}/>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="email" className="col-sm-2 col-form-label">Email address</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} value={credential.email}/>
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credential.password}/>
            </div>
          </div>
          
          <div className="mb-3 row">
            <label htmlFor="cpassword" className="col-sm-2 col-form-label">Confirm Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} value={credential.cpassword}/>
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

    </div>
  )
}

export default Signup
