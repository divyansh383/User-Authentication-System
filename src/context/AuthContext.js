import { createContext, useState, useEffect} from 'react'
import jwt_decode from "jwt-decode"
//19
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export default AuthContext; 

export const AuthProvider=({children})=>{
    //object to store user info
    //create all the states you want to use in different components here
    //setting defaults
    //converitng it to arrow function so that it will call once , it will access the session storage once in
    //every components
    let [user,setUser]=useState(()=>localStorage.getItem('user')?jwt_decode(localStorage.getItem ('user')): null);
    let [authTokens,setAuthtokens]=useState(()=>localStorage.getItem('authTokens')?(JSON.parse(localStorage.getItem('authTokens'))): null);
    let [errormsg,setError]=useState();
    //20 checking for local storage
    let [loading,setLoading]=useState(true);
    const  navigate =  useNavigate(); //19
    //------------------------
    let registerUser=async(event)=>{
        event.preventDefault(); //use to hide in url
        let info=JSON.stringify({
            'first_name':event.target.first_name.value,
            'last_name':event.target.last_name.value,
            'username':event.target.username.value,
            'email':event.target.email.value,
            'password1':event.target.password1.value,
            'password2':event.target.password2.value
        })
        let response=await fetch('http://127.0.0.1:8000/api/configUser/register',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:info
        })
        let data = await response.json();
        
        if(data.Error != null){
            setError(JSON.stringify(Object.values(data.Error)));
            console.log(errormsg);
        }else{
            setError(JSON.stringify(Object.values(data)));
        }
    }
    //------------------------
    let loginUser=async (event)=>{
        event.preventDefault();
        let response =await fetch('http://127.0.0.1:8000/api/token/',
            {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({'username':event.target.username.value,'password':event.target.password.value})
                //target is the form, username-passowrd are the form fields and value is their value
            }
        )
        let data=await response.json();

        if(response.status===200){
            setAuthtokens(data); //setting tokens
            setUser(jwt_decode(data.access)); //setting user data after decoding , we are passing the access token from the data 
            console.log(user);
            localStorage.setItem('AuthTokens',JSON.stringify(data)) //19 saving token value
            localStorage.setItem('user',JSON.stringify(data.access))
            console.log(user);
            navigate("/");
        }else{
            alert('something went wrong');
        }
    } 
    //logout-------------------------
    let logoutUser=()=>{ 
        setAuthtokens(null); 
        setUser(null);  
        localStorage.removeItem('AuthTokens'); 
        localStorage.removeItem('user');  
        console.log("logged out");
    }
    //update refresh token--------
    let updateToken =async ()=>{
        let response =await fetch('http://127.0.0.1:8000/api/token/refresh/',
            {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({'refresh':authTokens?.refresh})
                //target is the form, username-passowrd are the form fields and value is their value
            }
        )
        let data=await response.json();
        //setting new tokens
        if(response.status===200){
            setAuthtokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('AuthTokens',JSON.stringify(data));
        }else{
            logoutUser();
        }
        if(loading){
            loading=false;
        }
        console.log('token refreshed')
    }

    useEffect(()=>{
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken();
            }
        },100*600*4)//100*600*4
        return ()=> clearInterval(interval);
    },[authTokens,loading])

//----------------------
    let contextData={
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
        registerUser:registerUser,
        errormsg:errormsg
    }
    
    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
