import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./slices/ProjectSlice";
import unitsReducer from "./slices/UnitSlice";
import FilterReducer from "./slices/FiltersSlice";
import ProjectInterestedReducer from "./slices/InterestedSlice";
import ContactFormReducer from "./slices/ContactFormSlice"
import CompanyInformationReducer from "./slices/CMSSlice"
export const store = configureStore({
  reducer: {
    Information: CompanyInformationReducer,
    projects: projectsReducer,
    units: unitsReducer,
    Filter: FilterReducer,
    projectInterested: ProjectInterestedReducer,
    Contact: ContactFormReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
