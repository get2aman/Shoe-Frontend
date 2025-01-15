import {createSlice} from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from 'axios';

const initialState={
    cart:[],
    loading:false,
    error:''
};
export var fetchCartData=createAsyncThunk('cart/fetchCartData',async(userId)=>{
    return await axios.post(`https://shoe-backend-lku1.onrender.com/cart/${userId}`).then((success)=>{
        console.log("success data",success.data)
       
        return success.data.cart
        
    })
})

const cartSlice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        Addtocart:(state,action)=>{
            const cartproduct=action.payload
            console.log(cartproduct)
            const obj=state.cart.cart.find(e=>e.id==cartproduct.id)
            if(!obj){
               console.log(state.cart)
            }
            else{
                state.cart.push(cartproduct)
            }
        },
        clearCart:(state,action)=>{
            state.cart=[];
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCartData.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(fetchCartData.fulfilled,(state,action)=>{
            state.cart=action.payload
        })
        builder.addCase(fetchCartData.rejected,(state,action)=>{
            state.cart=action.payload
        })
    }
})
export default cartSlice;