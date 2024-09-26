import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Document {
  id: string;
  name: string;
  pdf: string | null;
}

interface Application {
  id: string;
  name: string;
  documents: Document[];
}

interface AppState {
  applications: Application[];
}

const initialState: AppState = {
  applications: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addApplication: (state, action: PayloadAction<Application>) => {
      state.applications.push(action.payload);
    },
    removeApplication: (state, action: PayloadAction<string>) => {
      state.applications = state.applications.filter(
        (app) => app.id !== action.payload
      );
    },
    addDocumentName: (
      state,
      action: PayloadAction<{ appId: string; doc: Document }>
    ) => {
      const app = state.applications.find((a) => a.id === action.payload.appId);
      if (app) {
        app.documents.push(action.payload.doc);
      }
    },
    removeDocumentName: (
      state,
      action: PayloadAction<{ appId: string; docId: string }>
    ) => {
      const app = state.applications.find((a) => a.id === action.payload.appId);
      if (app) {
        app.documents = app.documents.filter(
          (doc) => doc.id !== action.payload.docId
        );
      }
    },
    uploadPdfToDocument: (
      state,
      action: PayloadAction<{ appId: string; docId: string; pdfName: string }>
    ) => {
      const app = state.applications.find((a) => a.id === action.payload.appId);
      if (app) {
        const doc = app.documents.find((d) => d.id === action.payload.docId);
        if (doc) {
          doc.pdf = action.payload.pdfName;
        }
      }
    },
    removePdfFromDocument: (
      state,
      action: PayloadAction<{ appId: string; docId: string }>
    ) => {
      const app = state.applications.find((a) => a.id === action.payload.appId);
      if (app) {
        const doc = app.documents.find((d) => d.id === action.payload.docId);
        if (doc) {
          doc.pdf = null;
        }
      }
    },
  },
});

export const {
  addApplication,
  removeApplication,
  addDocumentName,
  removeDocumentName,
  uploadPdfToDocument,
  removePdfFromDocument,
} = appSlice.actions;

export default appSlice.reducer;
