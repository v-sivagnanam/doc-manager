import React from "react";
import { TableHead, TableRow, TableCell, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface ApplicationListProps {
  applications: any[];
  selectedAppId: string | null;
  onSelectApp: (appId: string) => void;
  onRemoveApp: (appId: string) => void;
}

const ApplicationList: React.FC<ApplicationListProps> = React.memo(
  ({ applications, selectedAppId, onSelectApp, onRemoveApp }) => {
    return (
      <TableHead>
        <TableRow>
          {applications.map((app) => (
            <TableCell
              key={app.id}
              onClick={() => onSelectApp(app.id)}
              style={{
                backgroundColor:
                  selectedAppId === app.id ? "#e0f7fa" : "inherit",
                cursor: "pointer",
                fontWeight: selectedAppId === app.id ? "bold" : "normal",
                width: "200px",
              }}
            >
              {app.name}
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={(e) => {
                  e.stopPropagation(); // Avoid triggering onSelectApp when deleting
                  onRemoveApp(app.id);
                }}
                sx={{ color: "red" }}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
);

export default ApplicationList;
