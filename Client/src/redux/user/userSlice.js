import { createSlice} from "@reduxjs/toolkit";
const initialState={
    currentUser:null,
    error:null,
    loading:false,
};
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        logout: (state) => {
          state.currentUser = null;
          state.error = null;
          state.loading = false;
        }
    }
});
export const {signInStart,signInSuccess,signInFailure,logout}=userSlice.actions
export default userSlice.reducer;