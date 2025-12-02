import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiConfigInterceptor from "../../config/config.api"

export interface ContactFromData {
  fullName: string,
  email: string,
  phoneNumber: string,
  inquiryType: number,
  subject: string,
  message: string
}

export const contactFormApi = createAsyncThunk("contact/submit", async (formData: ContactFromData, thunkApi) => {
  try {
    const response = await ApiConfigInterceptor.post("/Contact/submit", formData)
    return response.data
  } catch (error) {
    return thunkApi.rejectWithValue(error)
  }
})



const ContactFormSlice = createSlice({
  name: "contact",
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(contactFormApi.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).addCase(contactFormApi.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload
    }).addCase(contactFormApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload
    })



  }
})


export default ContactFormSlice.reducer;