import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiConfigInterceptor from "../../config/config.api"

export interface InterestFormData {
  fullName: string;
  email: string;
  phone: string;
  interestedIn: string;
  preferredContact: string;
  visitDate: string;
  numberOfPeople: number;
  message: string;
  projectId: number;
  userId?: number,
}


export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  contactPreference: 0 | 1 | 2;
  unitId: number;
  userId?: number,
}






export const InterestsInProject = createAsyncThunk("project/interests", async (formData: InterestFormData, thunkApi) => {
  try {

    let payload: any = {
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      projectId: formData.projectId,
      methodId: formData.preferredContact,
      notes: formData.message,
      interestedIn: formData.interestedIn,
      preferredContact: formData.preferredContact,
      visitDate: formData.visitDate,
      numberOfPeople: formData.numberOfPeople
    }

    if (formData.userId) {
      payload.userId = formData.userId
    }

    const response = await ApiConfigInterceptor.post('/interests/project', payload);
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const InterestsInUnit = createAsyncThunk("units/interests", async (formData: ContactFormData, thunkApi) => {
  try {

    let payload: any = {
      fullName: formData.name,
      phone: formData.phone,
      email: formData.email,
      unitId: formData.unitId,
      methodId: formData.contactPreference,
      notes: formData.message


    }

    if (formData.userId) {
      payload.userId = formData.userId
    }

    const response = await ApiConfigInterceptor.post('/interests/unit', payload);
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});



const initialState = {
  data: null,
  loading: false,
  error: null
}



const InterestsInProjectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    reset: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {

    // Interested In Project 
    builder.addCase(InterestsInProject.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).addCase(InterestsInProject.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    }).addCase(InterestsInProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
      // Interested In Unit
      .addCase(InterestsInUnit.pending, (state) => {
        state.loading = true;
        state.error = null;
      }).addCase(InterestsInUnit.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      }).addCase(InterestsInUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })



  }
})

export const { reset } = InterestsInProjectSlice.actions;

export default InterestsInProjectSlice.reducer
