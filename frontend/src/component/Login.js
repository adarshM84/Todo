import {useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import NotesContext from '../context/notes/NotesContext';

export default function Login() {
    let context=useContext(NotesContext);
    const navigate = useNavigate();
    let [credential,setCredential]=useState({email:"",password:""});

    const handleOnChange=(e)=>{
        setCredential({...credential,[e.target.name]:e.target.value});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        let response=await fetch('http://localhost:4000/api/auth/login',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email:credential.email,pass:credential.password })
        });
        if(response.status===200){
            let jsonData=await response.json();
            //console.log(jsonData.authToken);
            context.changeAlert({showAlert:true,alertType:"success",message:"Successfully loged in."});
            localStorage.setItem("token",jsonData.authToken);
            setTimeout(() => {
                context.changeAlert({...context.alertInfo,showAlert:false})
            }, 1500);
            navigate("/");
        }else{
            context.changeAlert({showAlert:true,alertType:"danger",message:"Invalid credentail."})
        }
        //console.log(response);
    }
    return (
        <div className='container my-3'>
            <h2 className='my-3'>Login to continue</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="emailIn" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emailIn" name="email" onChange={handleOnChange} value={credential.email} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={handleOnChange} value={credential.password} name='password'/>
                </div>
               
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
