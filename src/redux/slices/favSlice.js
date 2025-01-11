import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice=createSlice({
    name:"favorites",
    initialState:[],
    reducers:{
        addToFavorites :(state,action)=>{
            const index = state.findIndex( favorites => favorites.id === action.payload.id)
            if (index === -1) {
                state.push({...action.payload, count: 1})
            } else {
                state[index].count = state[index].count + 1
            }
        }
    }
})

export const {addToFavorites}=favoriteSlice.actions
export default favoriteSlice.reducer