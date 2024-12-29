import axios from "axios";
import { createContext, useEffect } from "react";

export let WishListContext = createContext()

export default function WishListContextProvider(props){
    let baseUrl = `https://ecommerce.routemisr.com`
    let header = {
        token: localStorage.getItem("userToken") 
    }
    function addProductToWishList(id){
        let body = {
            productId :id
        }
        return axios.post(`${baseUrl}/api/v1/wishlist`,body,{
            headers:header
        })
    }
    function getWishList(){
        return axios.get(`${baseUrl}/api/v1/wishlist`,{
            headers:header
        })
    }
    function deleteItemFromWishList(id){
        return axios.delete(`${baseUrl}/api/v1/wishlist/${id}`,{
            headers:header
        })
    }

    return <WishListContext.Provider value={{addProductToWishList,getWishList,deleteItemFromWishList}}>
        {props.children}
    </WishListContext.Provider>
}