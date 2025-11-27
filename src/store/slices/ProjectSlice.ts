import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiConfigInterceptor from "../../config/config.api"



export interface AssignedEmployee {
  id: string;
  fullName: string;
}

export interface Project {
  id: number;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  locationAr: string;
  locationEn: string;
  regionId: number | null;
  regionName: string | null;
  regionNameEn: string | null;
  cityId: number | null;
  cityName: string | null;
  cityNameEn: string | null;
  districtId: number | null;
  districtName: string | null;
  districtNameEn: string | null;
  latitude: number;
  longitude: number;
  statusId: number;
  statusName: string;
  statusNameEn: string;
  typeId: number;
  typeName: string;
  typeNameEn: string;
  cost: number;
  area: number;
  directLink: string | null;
  areaUnitAr: string;
  areaUnitEn: string;
  mainImageUrl: string;
  publicIp: string;
  parkingSpots: number | null;
  elevatorsCount: number | null;
  estimatedCompletionDate: string | null;
  countOfUnits: number;
  isFeatured: boolean;
  isActive: boolean;
  youtubeVideoUrl: string | null;
  assignedEmployees: AssignedEmployee[];
  projectsFeaturesIds: number[];
  features: any[];
  images: any[];
}

export interface ProjectsDataResponse {
  items: Project[],
  totalCountAssignedProjectToEmployee: Number,
  totalCountOfActivedProjects: Number,
  totalCountOfFeateredProjects: Number,
  totalCountOfProjects: Number,
  totalCountOfUnits: Number,
}



interface ProjectsState {
  data: ProjectsDataResponse | null;
  loading: boolean;
  error: string | null;
}

interface ProjectDetailsState {
  details: Project | null,
  loading: boolean;
  error: string | null;
}

interface SliceProjectState {
  projects: ProjectsState
  single: ProjectDetailsState
}


const initialState: SliceProjectState = {
  projects: {
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





export const getProjectsAPi = createAsyncThunk("project/getAll", async (filters: {} = {}, thunkApi) => {
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

    const response = await ApiConfigInterceptor.get(`/project?${QueryParams}`);
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getProjectById = createAsyncThunk("project/getById", async (id: number, thunkApi) => {
  try {
    const response = await ApiConfigInterceptor.get(`/project/${id}`);
    console.log("Response Data Single Project ", response);

    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
})



const ProjectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // Get All Projects 
    builder.addCase(getProjectsAPi.pending, (state) => {
      state.projects.loading = true;
      state.projects.error = null;
    }).addCase(getProjectsAPi.fulfilled, (state, action) => {
      state.projects.loading = false;
      state.projects.data = action.payload.data;
    }).addCase(getProjectsAPi.rejected, (state, action) => {
      state.projects.loading = false;
      state.projects.error = action.payload as string;
    });
    builder.addCase(getProjectById.pending, (state) => {
      state.single.loading = true;
      state.single.error = null;
    }).addCase(getProjectById.fulfilled, (state, action) => {
      state.single.loading = false;
      console.log("single Data", action.payload);
      state.single.details = action.payload.data;
    }).addCase(getProjectById.rejected, (state, action) => {
      state.single.loading = false;
      state.single.error = action.payload as string;
    });



  }
})


export default ProjectSlice.reducer
