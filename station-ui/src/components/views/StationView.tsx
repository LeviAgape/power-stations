import React, { useState } from "react";
import {
  TextField,
  Box,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Modal,
} from "@mui/material";
import axios from "axios";
import { RequestPowerStation } from "../station-utills/station-utills";
import { TableHeaders } from "../station-utills/station-headers";
import { statesOfBrazil } from "../station-utills/station-states-brazil";

const API_URL = import.meta.env.VITE_API_URL;

interface StationViewProps {
  station: RequestPowerStation;
  closeModal: () => void;
  refreshData: () => void;
  openSnackbar: boolean;
  setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const StationView = ({
  station,
  closeModal,
  refreshData,
  setOpenSnackbar,
  setSnackbarMessage,
}: StationViewProps) => {
  const [formData, setFormData] = useState<RequestPowerStation>(station);
  const [isCnpjValid, setIsCnpjValid] = useState<boolean>(
    station.numCnpjEmpresaConexao?.replace(/\D/g, "").length === 14
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const field = TableHeaders.find((item) => item.key === name);

    let newValue = value;

    if (field?.type === "numeric") {
      newValue = value.replace(/\D/g, "");
    } else if (field?.type === "letters") {
      newValue = value.replace(/[^A-Za-z]/g, "");
    } else if (field?.type === "cnpj") {
      newValue = value.replace(/\D/g, ""); 
      setIsCnpjValid(newValue.length === 14);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleStateChange = (e: SelectChangeEvent<string>) => {
    setFormData((prevData) => ({
      ...prevData,
      sigUFPrincipal: e.target.value,
    }));
  };

  const handleSave = () => {
    axios
      .put(`${API_URL}/station/${formData.id}`, formData)
      .then(() => {
        closeModal();
        refreshData();
        setSnackbarMessage("Usina editada com sucesso!");
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.error("Erro ao salvar os dados:", error);
        setSnackbarMessage("Erro ao salvar a usina.");
        setOpenSnackbar(true);
      });
  };

  return (
    <Modal open={true} onClose={closeModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          width: 400,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Detalhes da Usina
        </Typography>

        {TableHeaders.map(({ name, key, type }) =>
          key === "sigUFPrincipal" ? (
            <FormControl fullWidth margin="normal" key={key}>
              <InputLabel>UF</InputLabel>
              <Select
                value={formData.sigUFPrincipal ?? ""}
                onChange={handleStateChange}
                label={name}
                name={key}
              >
                {statesOfBrazil.map((state) => (
                  <MenuItem key={state.value} value={state.value}>
                    {state.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <TextField
              key={key}
              label={name}
              name={key}
              value={formData[key as keyof RequestPowerStation] ?? ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              inputProps={{
                maxLength:
                  type === "cnpj"
                    ? 14
                    : type === "letters" && key === "sigTipoGeracao"
                    ? 3
                    : undefined,
                inputMode:
                  type === "decimal" || type === "cnpj"
                    ? "decimal"
                    : type === "letters"
                    ? "text"
                    : "text",
                pattern:
                  type === "decimal" || type === "cnpj"
                    ? "[0-9]*"
                    : type === "letters"
                    ? "[A-Za-z]*"
                    : undefined,
              }}
              error={
                key === "sigTipoGeracao" &&
                typeof formData[key as keyof RequestPowerStation] ===
                  "string" &&
                formData[key as keyof RequestPowerStation]!.length > 3
              }
              helperText={
                key === "sigTipoGeracao" &&
                typeof formData[key as keyof RequestPowerStation] ===
                  "string" &&
                formData[key as keyof RequestPowerStation]!.length < 3
                  ? "A sigla deve ter até 3 letras"
                  : key === "numCnpjEmpresaConexao" && !isCnpjValid
                  ? "O CNPJ deve conter 14 dígitos"
                  : ""
              }
              disabled={type === "disabled"}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                if (key === "sigTipoGeracao" && target.value.length > 3) {
                  e.preventDefault();
                }
              }}
            />
          )
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Button onClick={closeModal} variant="outlined" color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            disabled={!isCnpjValid}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
