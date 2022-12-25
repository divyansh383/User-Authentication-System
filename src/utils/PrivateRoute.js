import { useContext } from "react";
import { Route ,Routes,Navigate} from "react-router-dom";
import AuthContext from "../context/AuthContext";
import HomePage from "../pages/HomePage";

const PrivateRoute =({children,...rest})=>{
    let {user} = useContext(AuthContext);

    if(!user){
      return <Navigate to ="/login"/>
    }
    return children;
}
export default PrivateRoute;
