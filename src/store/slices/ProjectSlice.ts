import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiConfigInterceptor from "../../config/config.api"



export interface AssignedEmployee {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  whatsApp: string | null;
  imageUrl: string;
}

export interface ProjectFeature {
  id: number;
  nameAr: string;
  nameEn: string;
  iconUrl: string | null;
}

export interface ProjectImage {
  imageUrl: string;
  publicId: string;
  caption: string;
  order: number;
}

export interface Project {
  id: number;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  locationAr: string;
  locationEn: string;
  regionId: number;
  regionName: string;
  regionNameEn: string;
  cityId: number;
  cityName: string;
  cityNameEn: string;
  districtId: number;
  districtName: string;
  districtNameEn: string;
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
  parkingSpots: number;
  elevatorsCount: number;
  estimatedCompletionDate: string; // or Date if you parse it
  countOfUnits: number;
  isFeatured: boolean;
  isActive: boolean;
  youtubeVideoUrl: string;
  assignedEmployees: AssignedEmployee[];
  projectsFeaturesIds: number[];
  features: ProjectFeature[];
  images: ProjectImage[];
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
      state.single.details = action.payload.data;
    }).addCase(getProjectById.rejected, (state, action) => {
      state.single.loading = false;
      state.single.error = action.payload as string;
    });



  }
})


export default ProjectSlice.reducer
