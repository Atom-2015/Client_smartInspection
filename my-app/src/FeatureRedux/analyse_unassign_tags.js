
import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie'

export const DeleteUser = createAsyncThunk(
    "unassigntags" , 
    async (removetags , {rejectWithValue})=>{
        try {
            const response = await axios.post('/api/tagimage/unassign', {imageid : removetags.images , tags:removetags.tags} , {
                headers:{
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem("token"),
                    'x-report-id': Cookies.get('reportId')
                }
            } );
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message || "An unexpected error occurred");
              }
              return rejectWithValue("An unexpected error occurred");
        }
    }
)


 const analyseUpdateUnassignTags = createSlice({
    name: "Analyse_unassign_tags",
    initialState: {
      isLoading: false,
      data: null,
      isError: false,
      errorMessage: "",
      UserDelete: [],
    },
    reducers: {
      // Optional: If you need a manual update function
      UpdateUnassignTags: (state, action) => {
        state.UserDelete = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(DeleteUser.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
          state.errorMessage = "";
        })
        .addCase(DeleteUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.data = action.payload;
        })
        .addCase(DeleteUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.errorMessage = action.payload || "Failed to create Fast Inspaction";
        });
    },
  });
  
  export const { UpdateUnassignTags } = analyseUpdateUnassignTags.actions;
  
  export default analyseUpdateUnassignTags.reducer;