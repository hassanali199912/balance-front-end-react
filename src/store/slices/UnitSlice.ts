import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiConfigInterceptor from "../../config/config.api"



export interface AssignedEmployee {
  id: string;
  fullName: string;
}

export interface UnitFeature {
  id: number;
  nameAr: string;
  nameEn: string;
  iconUrl: string | null;
}

export interface Unit {
  id: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number;
  area: number;
  projectId: number;

  projectNameAr: string | null;
  projectNameEn: string | null;

  hasBalcony: boolean;
  isFurnished: boolean;
  hasParking: boolean;

  numberOfBathrooms: number;
  status: number;
  type: number;
  isActive: boolean;

  floor: number;
  building: string;
  numberOfRooms: number;

  latitude: number;
  longitude: number;

  numberOfBalconies: number;

  mainImageUrl: string;

  assignedEmployees: AssignedEmployee[];
  images: string[];

  features: UnitFeature[];

  createdAt: string; // ISO Date String
}

export interface UnitDataResponse {
  items: Unit[],
  totalCount: Number,
}



interface UnitState {
  data: UnitDataResponse | null;
  loading: boolean;
  error: string | null;
}

interface UnitDetailsState {
  details: Unit | null,
  loading: boolean;
  error: string | null;
}

interface SliceUnitDate {
  unit: UnitState
  single: UnitDetailsState
}


const initialState: SliceUnitDate = {
  unit: {
    data: null,
    loading: false,
    error: null
  },
  single: {
    details: null,
    loading: false,
    error: null


  }
};





export const getUnitsAPi = createAsyncThunk("unit/getAll", async (filters: {} = {}, thunkApi) => {
  try {
    let QueryParams = ""
    if (filters || Object.keys(filters).length !== 0) {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([Key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(Key, String(value));
        }
      })

      QueryParams = params.toString();
      console.log("Using Filter", QueryParams);


    }

    const response = await ApiConfigInterceptor.get(`/unit?${QueryParams}`);
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});


export const getUnitById = createAsyncThunk("project/getById", async (id: number, thunkApi) => {
  try {
    const response = await ApiConfigInterceptor.get(`/unit/getunit/${id}`);
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
})



const UnitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // Get All Projects 
    builder.addCase(getUnitsAPi.pending, (state) => {
      state.unit.loading = true;
      state.unit.error = null;
    }).addCase(getUnitsAPi.fulfilled, (state, action) => {
      state.unit.loading = false;
      state.unit.data = action.payload.data;
    }).addCase(getUnitsAPi.rejected, (state, action) => {
      state.unit.loading = false;
      state.unit.error = action.payload as string;
    });
    builder.addCase(getUnitById.pending, (state) => {
      state.single.loading = true;
      state.single.error = null;
    }).addCase(getUnitById.fulfilled, (state, action) => {
      state.single.loading = false;
      console.log("single Data", action.payload);
      state.single.details = action.payload.data;
    }).addCase(getUnitById.rejected, (state, action) => {
      state.single.loading = false;
      state.single.error = action.payload as string;
    });



  }
})


export default UnitSlice.reducer
