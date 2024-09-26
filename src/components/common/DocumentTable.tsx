import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { v4 as uuidv4 } from "uuid";
import {
  addApplication,
  removeApplication,
  addDocumentName,
  removeDocumentName,
  uploadPdfToDocument,
  removePdfFromDocument,
} from "@/store/slices/appSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  IconButton,
  TextField,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckIcon from "@mui/icons-material/Check";

export const DocumentManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const applications = useSelector(
    (state: RootState) => state.app.applications
  );

  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [newAppName, setNewAppName] = useState<string>("");
  const [newDocName, setNewDocName] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const docsPerPage = 5;

  const handleAddApplication = () => {
    if (newAppName.trim()) {
      const newApp = { id: uuidv4(), name: newAppName, documents: [] };
      setSelectedAppId(newApp.id);
      dispatch(addApplication(newApp));
      setNewAppName("");
    }
  };

  const handleRemoveApplication = (appId: string) => {
    dispatch(removeApplication(appId));
    setSelectedAppId(null);
  };

  const handleAddDocumentName = () => {
    if (selectedAppId && newDocName.trim()) {
      const newDoc = { id: uuidv4(), name: newDocName, pdf: null };
      setSelectedDocId(newDoc.id);
      dispatch(addDocumentName({ appId: selectedAppId, doc: newDoc }));
      setNewDocName("");
    }
  };

  // FIXED: Specify the correct type (string) for appId
  const handleRemoveDocumentName = (appId: string, docId: string) => {
    dispatch(removeDocumentName({ appId, docId }));
    setSelectedDocId(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && selectedAppId && selectedDocId) {
      const file = event.target.files[0];
      if (file && file.type === "application/pdf") {
        const fileName = file.name;
        dispatch(
          uploadPdfToDocument({
            appId: selectedAppId,
            docId: selectedDocId,
            pdfName: fileName,
          })
        );
        event.target.value = "";
      } else {
        alert("Please upload a valid PDF file.");
      }
    }
  };

  const handleRemovePdf = (appId: string, docId: string) => {
    dispatch(removePdfFromDocument({ appId, docId }));
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Application Document Manager
      </Typography>

      <Box mb={2} display="flex" alignItems="center" gap={2}>
        <TextField
          label="New Application Name"
          size="small"
          value={newAppName}
          onChange={(e) => setNewAppName(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddApplication}>
          Add Application
        </Button>
      </Box>

      {applications.length === 0 && (
        <Typography variant="body1" color="textSecondary" align="center">
          No applications found.
        </Typography>
      )}

      <TableContainer component={Paper}>
        <Table aria-label="application table">
          <TableHead>
            <TableRow>
              {applications.map((app) => (
                <TableCell
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  style={{
                    backgroundColor:
                      selectedAppId === app.id ? "#e0f7fa" : "inherit",
                    cursor: "pointer",
                    fontWeight: selectedAppId === app.id ? "bold" : "normal",
                  }}
                >
                  {app.name}
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveApplication(app.id)}
                    sx={{ color: "red" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.find((app) => app.id === selectedAppId)?.documents
              .length === 0 && (
              <TableRow>
                <TableCell colSpan={applications.length}>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                  >
                    No documents found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {applications
              .find((app) => app.id === selectedAppId)
              ?.documents.slice(
                (currentPage - 1) * docsPerPage,
                currentPage * docsPerPage
              )
              .map((doc) => (
                <TableRow
                  key={doc.id}
                  sx={{
                    bgcolor: selectedDocId === doc.id ? "#d1c4e9" : "#f5f5f5",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedDocId(doc.id)}
                >
                  <TableCell
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Typography>{doc.name}</Typography>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() =>
                        handleRemoveDocumentName(selectedAppId!, doc.id)
                      }
                      sx={{ color: "red" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    {selectedAppId && selectedDocId === doc.id && (
                      <Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Typography>
                            PDF: {doc.pdf || "No PDF uploaded."}
                          </Typography>
                          <IconButton
                            onClick={() =>
                              handleRemovePdf(selectedAppId!, doc.id)
                            }
                          >
                            <DeleteIcon sx={{ color: "red" }} />
                          </IconButton>
                          <Button
                            variant="contained"
                            component="label"
                            size="small"
                            startIcon={<UploadFileIcon />}
                          >
                            Upload PDF
                            <input
                              type="file"
                              accept="application/pdf"
                              hidden
                              onChange={handleFileChange}
                            />
                          </Button>
                        </Box>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            <TableRow>
              {applications.length > 0 && (
                <TableCell colSpan={applications.length}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <TextField
                      label="New Document Name"
                      size="small"
                      value={newDocName}
                      onChange={(e) => setNewDocName(e.target.value)}
                    />
                    <IconButton
                      onClick={handleAddDocumentName}
                      sx={{ color: "green" }}
                    >
                      <CheckIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              )}
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} align="center">
                <Pagination
                  count={Math.ceil(
                    (applications.find((app) => app.id === selectedAppId)
                      ?.documents?.length || 0) / docsPerPage
                  )}
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
