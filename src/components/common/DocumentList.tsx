import React from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckIcon from "@mui/icons-material/Check";

interface DocumentListProps {
  documents: any[];
  selectedDocId: string | null;
  selectedAppId: string;
  onRemoveDocument: (docId: string) => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemovePdf: (docId: string) => void;
  onSelectDoc: (docId: string) => void;
}

const DocumentList: React.FC<DocumentListProps> = React.memo(
  ({
    documents,
    selectedDocId,
    selectedAppId,
    onRemoveDocument,
    onFileChange,
    onRemovePdf,
    onSelectDoc,
  }) => {
    return (
      <>
        {documents.map((doc) => (
          <TableRow
            key={doc.id}
            sx={{
              bgcolor: selectedDocId === doc.id ? "#d1c4e9" : "#f5f5f5",
              cursor: "pointer",
            }}
            onClick={() => onSelectDoc(doc.id)}
          >
            <TableCell
              sx={{
                width: "200px",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography>{doc.name}</Typography>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={(e) => {
                  e.stopPropagation(); // Avoid selecting the doc on delete
                  onRemoveDocument(doc.id);
                }}
                sx={{ color: "red" }}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
            <TableCell>
              {selectedDocId === doc.id && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography>PDF: {doc.pdf || "No PDF uploaded."}</Typography>
                  <IconButton
                    onClick={() => onRemovePdf(doc.id)}
                    sx={{ color: "red" }}
                  >
                    <DeleteIcon />
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
                      onChange={onFileChange}
                    />
                  </Button>
                </Box>
              )}
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  }
);

export default DocumentList;
