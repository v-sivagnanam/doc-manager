import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApplicationsState } from "@/types/index";

const initialState: ApplicationsState = {
  applications: [],
  selectedAppId: null,
  selectedDocIndex: 0,
  currentPage: 1,
  docsPerPage: 5,
};

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    addApplication(state, action: PayloadAction<string>) {
      state.applications.push({
        id: (Math.random() * 1000).toString(),
        name: action.payload,
        documents: [],
      });
    },
    removeApplication: (state, action) => {
      const appId = action.payload;
      state.applications = state.applications.filter((app) => app.id !== appId);
    },
    addDocument(
      state,
      action: PayloadAction<{ appId: string; docName: string }>
    ) {
      const { appId, docName } = action.payload;
      const application = state.applications.find((app) => app.id === appId);
      if (application) {
        application.documents.push({
          id: (Math.random() * 1000).toString(),
          name: docName,
        });
      }
    },
    removeDocument: (state, action) => {
      const { appId, docIndex } = action.payload;
      const app = state.applications.find((app) => app.id === appId);
      if (app) {
        app.documents.splice(docIndex, 1);
      }
    },
    setPdfForDocument(
      state,
      action: PayloadAction<{
        appId: string;
        docIndex: number;
        pdfName: string;
      }>
    ) {
      const { appId, docIndex, pdfName } = action.payload;
      const application = state.applications.find((app) => app.id === appId);
      if (application && application.documents[docIndex]) {
        application.documents[docIndex].pdf = pdfName;
      }
    },
    selectApplication(state, action: PayloadAction<string>) {
      state.selectedAppId = action.payload;
      state.selectedDocIndex = 0;
    },
    nextDocument(state) {
      const app = state.applications.find(
        (app) => app.id === state.selectedAppId
      );
      if (app) {
        if (state.selectedDocIndex < app.documents.length - 1) {
          state.selectedDocIndex += 1;
        } else {
          const currentIndex = state.applications.findIndex(
            (app) => app.id === state.selectedAppId
          );
          if (currentIndex === state.applications.length - 1) {
            state.selectedAppId = state.applications[0].id;
            state.selectedDocIndex = 0;
          } else {
            state.selectedAppId = state.applications[currentIndex + 1].id;
            state.selectedDocIndex = 0;
          }
        }
      }
    },

    prevDocument(state) {
      const app = state.applications.find(
        (app) => app.id === state.selectedAppId
      );
      if (app) {
        if (state.selectedDocIndex > 0) {
          state.selectedDocIndex -= 1;
        } else {
          const currentIndex = state.applications.findIndex(
            (app) => app.id === state.selectedAppId
          );
          if (currentIndex > 0) {
            state.selectedAppId = state.applications[currentIndex - 1].id;
            state.selectedDocIndex =
              state.applications[currentIndex - 1].documents.length - 1;
          }
        }
      }
    },
    setDocIndex(state, action: PayloadAction<number>) {
      state.selectedDocIndex = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const {
  addApplication,
  addDocument,
  setPdfForDocument,
  selectApplication,
  nextDocument,
  prevDocument,
  setPage,
  setDocIndex,
  removeDocument,
  removeApplication,
} = applicationsSlice.actions;

export default applicationsSlice.reducer;
