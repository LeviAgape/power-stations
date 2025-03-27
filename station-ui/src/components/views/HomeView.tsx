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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useState, useEffect } from "react";
import { formatCNPJ } from "../station-utills/station-cnpj-mask";
import { PowerStation } from "../station-utills/station-utills";
import { TableHeaders } from "../station-utills/station-headers";
import { ButtonHomeView } from "../button/button";
import { StationView } from "./StationView";

export const HomeView = () => {
  const [data, setData] = useState<PowerStation[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<PowerStation | null>(null);
  const [openDetailsModal, setOpenDetailsModal] = useState<boolean>(false);

  const fetchData = () => {
    axios
      .get("http://localhost:8080/station")
      .then((response) => {
        const sortedData = response.data.sort(
          (a: PowerStation, b: PowerStation) => {
            const idA = parseInt(a.idPowerStationAneel || "0", 10);
            const idB = parseInt(b.idPowerStationAneel || "0", 10);
            return idA - idB;
          }
        );
        setData(sortedData);
      })
      .catch((error) => {
        console.error("Erro ao carregar os dados:", error);
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
    console.log("Excluindo", selectedItem);
    handleClose();
  };

  const closeDetailsModal = () => {
    setOpenDetailsModal(false);
    setSelectedItem(null);
  };

  return (
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
                    <MenuItem onClick={handleDelete} sx={{ color: "red" }}>
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
        />
      )}
      <ButtonHomeView />
    </Box>
  );
};
