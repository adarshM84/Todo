import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NotesContext from '../context/notes/NotesContext';

export default function Signup() {
  let context=useContext(NotesContext);
  const navigate = useNavigate();
  let [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" });

  const handleOnChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    console.log("Submit")
    e.preventDefault();
    //console.log(credential,"credential")
    if (credential.password === credential.cpassword) {
      let response = await fetch('http://localhost:4000/api/auth/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: credential.name, email: credential.email, pass: credential.password })
      });
      console.log(response,"response")
      if (response.status === 200) {
        let jsonData = await response.json();
        //console.log(jsonData.authToken);
        context.changeAlert({showAlert:true,alertType:"success",message:"Successfully signup."})
        localStorage.setItem("auth-token", jsonData.authToken);
        navigate("/");
      }else{
        context.changeAlert({showAlert:true,alertType:"danger",message:"Invalid details."})
      }
    }else{
      context.changeAlert({showAlert:true,alertType:"danger",message:"Password not matched."})
    }
  }
  return (
    <div className='container my-3'>
      <h2 className='my-3'>Signup to use todo..</h2>
      <form onSubmit={handleSubmit} spellCheck="false">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={handleOnChange} minLength={3} value={credential.name} placeholder='Enter 3 digit name atleast' aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="emailIn" className="form-label">Email address</label>
          <input type="email" className="form-control" id="emailIn" name="email" onChange={handleOnChange} minLength={5} value={credential.email} placeholder='Enter 5 digit email atleast' aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={handleOnChange} minLength={3} value={credential.password} name='password' placeholder='Enter 3 digit password atleast' required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" onChange={handleOnChange} value={credential.cpassword} name='cpassword' placeholder='Confim password' />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
