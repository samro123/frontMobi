import axios from "axios";
import React, { createContext, useState} from "react";
import { BASE_URL } from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage';


const baseURL = "https://99dc-14-245-71-140.ngrok-free.app/api/home/out-come";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [post, setPost] = useState(true);
    const register = (username , password) =>{
        setIsLoading(true);

        axios.post(`${BASE_URL}/auth/register`, {
            username,
            password,
        })
        .then(res =>{
            let userInfo = res.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo',JSON.stringify(userInfo));
            setIsLoading(false);
            console.log(userInfo);
        })
        .catch(e => {
            console.log(` register error ${e}`);
            setIsLoading(false);
        });
    } 
    
    const login = (username, password)=>{
        setIsLoading(true);
        axios.post(`${BASE_URL}/auth/login`,{
            username,
            password,
        }).then(res => {
            let userInfo = res.data;
            console.log(userInfo);
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false)

        }).catch(e =>{
            console.log(`login error${e}`);
            setIsLoading(false)
        });

    }

   const AuthStr = 'Bearer '.concat(userInfo.token);

    /*  React.useEffect(() => {
          axios.get(baseURL,{
              headers: {Authorization: `Bearer ${userInfo.token}`},
          },)
          .then((response) => {
          setPost(response.data);
          console.log(response.data);
           AsyncStorage.getItem('userInfo');
          }).catch(e =>{
               console.log(`error get ${e}`)   
           });
      }, []);*/

      const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Attach JWT token to each request
      axiosInstance.interceptors.request.use(async (config) => {
        consttoken = await AsyncStorage.getItem('jwtToken');
        if (userInfo.token) {
          config.headers.Authorization = `Bearer ${userInfo.token}`;
        }
        return config;
      });
      
      // Make API request
     /* axiosInstance.get('/home/out-come')
        .then((response) => {
          setPost(response.data);
          AsyncStorage.removeItem('userInfo');
        })
        .catch((error) => {
          console.error(error);
        });*/


    return(
        <AuthContext.Provider value={{ 
            isLoading,
            userInfo,
            post,
            register,
            login,
             }}>
            {children}
        </AuthContext.Provider>
    );
}