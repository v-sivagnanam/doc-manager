import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addApplication,
  removeApplication,
  addDocument,
  removeDocument,
  setPdfForDocument,
  selectApplication,
  nextDocument,
  prevDocument,
  setDocIndex,
} from "@/store/slices/applicationsSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete icon
import { Application, Document, RootState } from "@/types/index";

export const DocumentManager: React.FC = () => {
  const dispatch = useDispatch();

  const applications = useSelector(
    (state: RootState) => state.applications.applications
  );
  const selectedAppId = useSelector(
    (state: RootState) => state.applications.selectedAppId
  );
  const selectedDocIndex = useSelector(
    (state: RootState) => state.applications.selectedDocIndex
  );

  const [newAppName, setNewAppName] = useState("");
  const [newDocName, setNewDocName] = useState("");

  const handleAddApplication = () => {
    if (newAppName.trim()) {
      dispatch(addApplication(newAppName));
      setNewAppName("");
    }
  };

  const handleAddDocument = () => {
    if (selectedAppId && newDocName.trim()) {
      dispatch(addDocument({ appId: selectedAppId, docName: newDocName }));
      setNewDocName("");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && selectedAppId) {
      const file = event.target.files[0];
      dispatch(
        setPdfForDocument({
          appId: selectedAppId,
          docIndex: selectedDocIndex,
          pdfName: file.name,
        })
      );
    }
  };

  const handleDeleteDocument = (docIndex: number) => {
    if (selectedAppId) {
      dispatch(removeDocument({ appId: selectedAppId, docIndex }));
    }
  };

  const handleDeleteApplication = (appId: string) => {
    dispatch(removeApplication(appId));
    if (selectedAppId === appId) {
      dispatch(selectApplication(""));
    }
  };

  const handleNext = () => dispatch(nextDocument());
  const handleBack = () => dispatch(prevDocument());

  return (
    <Box p={2}>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Document Manager
          </Typography>
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={1}
          >
            <TextField
              size="small"
              label="New Application Name"
              value={newAppName}
              onChange={(e) => setNewAppName(e.target.value)}
              fullWidth
            />
            <Button
              size="small"
              variant="contained"
              onClick={handleAddApplication}
            >
              Add
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Applications
          </Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            {applications.map((app: Application) => (
              <Box key={app.id} display="flex" justifyContent="space-between">
                <Button
                  variant="outlined"
                  onClick={() => dispatch(selectApplication(app.id))}
                  sx={{
                    backgroundColor:
                      selectedAppId === app.id ? "#223354" : "transparent",
                    color: selectedAppId === app.id ? "#fff" : "inherit",
                    justifyContent: "flex-start",
                    flexGrow: 1,
                    mr: 1,
                  }}
                >
                  {app.name}
                </Button>
                <IconButton
                  onClick={() => handleDeleteApplication(app.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {selectedAppId && (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Documents
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              {applications
                .find((app: Application) => app.id === selectedAppId)
                ?.documents.map((doc: Document, index: number) => (
                  <>
                    <Box
                      key={doc.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor:
                          index === selectedDocIndex
                            ? "#223354"
                            : "transparent",
                        color: index === selectedDocIndex ? "#fff" : "inherit",
                        padding: 1,
                        borderRadius: 1,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        dispatch(selectApplication(selectedAppId));
                        dispatch(setDocIndex(index));
                      }}
                    >
                      <Typography>{doc.name}</Typography>
                      <Box display="flex" alignItems="center">
                        <IconButton color="info" component="label">
                          <UploadFileIcon />
                          <input
                            type="file"
                            hidden
                            onChange={handleFileChange}
                          />
                        </IconButton>
                        <Typography variant="body2">
                          {doc.pdf ? doc.pdf : "No PDF uploaded"}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton
                          onClick={() => handleDeleteDocument(index)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </>
                ))}
              <Box mb={2} display="flex" gap={1}>
                <TextField
                  label="New Document Name"
                  size="small"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  fullWidth
                />
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleAddDocument}
                >
                  Add
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      <Box mt={2} display="flex" justifyContent="space-between">
        <Button variant="contained" onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext}>
          Next
        </Button>
      </Box>
    </Box>
  );
};
