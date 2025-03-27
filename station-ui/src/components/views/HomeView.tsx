import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useState, useEffect } from "react";
import { formatCNPJ } from "../station-utills/station-cnpj-mask";
import { PowerStation } from "../station-utills/station-utills";
import { TableHeaders } from "../station-utills/station-headers";
import { StationView } from "./StationView";
import { globalStyles } from "../globalStyles";
import { RegisterView } from "./RegisterView";

export const HomeView = () => {
  const [data, setData] = useState<PowerStation[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<PowerStation | null>(null);
  const [openDetailsModal, setOpenDetailsModal] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchData = () => {
    axios
      .get(`${API_URL}/station/top5`)
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {
        console.error("Erro ao carregar os dados:");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    item: PowerStation
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setOpenDetailsModal(true);
    handleClose();
  };

  const handleDelete = () => {
    if (selectedItem?.id) {
      axios
        .delete(`${API_URL}/station/${selectedItem.id}`)
        .then(() => {
          setSnackbarMessage("Estação excluída com sucesso!");
          setOpenSnackbar(true);
          fetchData();
        })
        .catch(() => {
          console.error("Erro ao excluir a estação:");
          setSnackbarMessage("Erro ao excluir a estação.");
          setOpenSnackbar(true);
        });
      setOpenDeleteModal(false);
    }
  };

  const openDeleteConfirmation = () => {
    setOpenDeleteModal(true);
    setAnchorEl(null);
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const closeDetailsModal = () => {
    setOpenDetailsModal(false);
    setSelectedItem(null);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      {globalStyles}
      <Box
        sx={{
          backgroundColor: "#333333",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" mb={2} color="white">
          Lista de Estações de Energia
        </Typography>

        {data.length > 0 ? (
          <Table
            sx={{
              backgroundColor: "white",
              color: "black",
              maxWidth: "1800px",
              width: "100%",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <TableHead>
              <TableRow>
                {TableHeaders.map((header, index) => (
                  <TableCell
                    key={index}
                    sx={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    {header.name}
                  </TableCell>
                ))}
                <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  {TableHeaders.map((header, cellIndex) => (
                    <TableCell key={cellIndex} sx={{ textAlign: "center" }}>
                      {header.key === "numCnpjEmpresaConexao"
                        ? formatCNPJ(
                            item[header.key as keyof PowerStation] as string
                          )
                        : header.key === "mdaPotenciaOutorgadaKw" &&
                          item[header.key as keyof PowerStation]
                        ? parseFloat(
                            item[header.key as keyof PowerStation] as string
                          ).toLocaleString("pt-BR")
                        : typeof item[header.key as keyof PowerStation] ===
                          "string"
                        ? item[header.key as keyof PowerStation] ?? "Sem dados"
                        : item[header.key as keyof PowerStation] ?? "Sem dados"}
                    </TableCell>
                  ))}
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton onClick={(e) => handleClick(e, item)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleEdit} sx={{ color: "red" }}>
                        Editar
                      </MenuItem>
                      <MenuItem
                        onClick={openDeleteConfirmation}
                        sx={{ color: "red" }}
                      >
                        Excluir
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography color="white">Carregando dados...</Typography>
        )}

        {selectedItem && openDetailsModal && (
          <StationView
            station={selectedItem}
            closeModal={closeDetailsModal}
            refreshData={fetchData}
            openSnackbar={openSnackbar}
            setOpenSnackbar={setOpenSnackbar}
            setSnackbarMessage={setSnackbarMessage}
          />
        )}

        <RegisterView
          refreshData={fetchData}
          openSnackbar={openSnackbar}
          setOpenSnackbar={setOpenSnackbar}
          setSnackbarMessage={setSnackbarMessage}
        />
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{
            width: "700px",
            "& .MuiSnackbarContent-root": {
              fontSize: "18px",
              padding: "16px 24px",
            },
          }}
        >
          <Alert severity="success" onClose={handleSnackbarClose}>
            {snackbarMessage}
          </Alert>
        </Snackbar>

        <Dialog open={openDeleteModal} onClose={closeDeleteModal}>
          <DialogTitle>Você deseja mesmo excluir?</DialogTitle>
          <DialogContent>
            <Typography>Esta ação não pode ser desfeita.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteModal} color="primary">
              Não
            </Button>
            <Button onClick={handleDelete} color="secondary">
              Sim
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};
