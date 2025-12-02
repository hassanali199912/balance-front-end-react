import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { buildCreateApi } from "@reduxjs/toolkit/query";
import ApiConfigInterceptor from "../../config/config.api"

export const getCMSData = createAsyncThunk("getCMS", async (_, thunkApi) => {
    try {
        const response = await ApiConfigInterceptor.get("/admin/Settings");
        return response

    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})



export interface SocialLink {
    key: string;
    value: string;
    isVisible: boolean;
}

export interface CompanyInfo {
    aboutTitleAr: string;
    aboutTitleEn: string;
    aboutDescriptionAr: string;
    aboutDescriptionEn: string;
    addressAr: string;
    addressEn: string;
    workingHoursAr: string;
    workingHoursEn: string;
    copyrightTextAr: string;
    copyrightTextEn: string;
    phone: string;
    email: string;
    mapUrl: string | null;
    latitude: number;
    longitude: number;
    socialLinks: SocialLink[];
}


interface CMSSliceDate {
    loading: boolean,
    data: CompanyInfo | null,
    error: any | null
}

const CMSSliceInitialState: CMSSliceDate = {
    loading: false,
    data: null,
    error: null
}



const CMSSlice = createSlice({
    name: "Content Slice",
    initialState: CMSSliceInitialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.data = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCMSData.pending, (state) => {
            state.loading = true;
            state.data = null;
            state.error = null;
        }).addCase(getCMSData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
        }).addCase(getCMSData.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        })
    }
})


export const { reset } = CMSSlice.actions
export default CMSSlice.reducer