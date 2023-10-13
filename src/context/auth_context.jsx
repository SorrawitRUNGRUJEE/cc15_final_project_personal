import {createContext} from "react"
import axios from "../config/axios"
import {addAccessToken,getAccessToken} from "../utils/localStorage"
import { useState,useEffect } from "react"



export const AuthContext  = createContext()
export default function AuthContextProvider({children}){
const [user,setUser] = useState(null)
const [loading,setLoading] = useState(true)

useEffect(()=>{
    const token = getAccessToken()
    if(token){
    axios.get('/auth/user').then(
        res =>{
            
            setUser(res.data.user)
        }
    ).finally(()=>{
        setLoading(false)
    })
        

    }
    else setLoading(false)



},[])
   
    const register = async (data) =>{
        await axios.post('/auth/register',data).then(res=>{
            alert(res.data.msg)
        }).catch(error=>{
            alert(error.response.data.msg);
            throw error
        })

    }

    const login = async (data) =>{
     await   axios.post('/auth/login',data).then(res=>{
        addAccessToken(res.data.accessToken)
        setUser(res.data.user)
      alert(res.data.msg)
         
        }).catch(error=>{
            alert(error.response.data.msg)
            throw error
            
        })
    }

    return <AuthContext.Provider value={{register,login,user,loading}}>
        {children}
    </AuthContext.Provider>
}