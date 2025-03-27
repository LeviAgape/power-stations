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
  Modal,
} from "@mui/material";
import axios from "axios";
import { TableHeaders } from "../station-utills/station-headers";
import { statesOfBrazil } from "../station-utills/station-states-brazil";
import { RegisterPowerStation } from "../station-utills/station-utills";

const API_URL = import.meta.env.VITE_API_URL;

interface RegisterViewProps {
  refreshData: () => void;
  openSnackbar: boolean;
  setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const RegisterView = ({
  refreshData,
  setOpenSnackbar,
  setSnackbarMessage,
}: RegisterViewProps) => {
  const [formData, setFormData] = useState<RegisterPowerStation>({});
  const [isCnpjValid, setIsCnpjValid] = useState(true);
  const [modalOpen, setModalOpen] = useState(false); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let newValue = value;
    const field = TableHeaders.find((item) => item.key === name);

    if (field?.type === "cnpj") {
      newValue = value.replace(/\D/g, ""); 
      setIsCnpjValid(newValue.length === 14); 
    } else if (field?.type === "letters") {
      newValue = value.replace(/[^A-Za-z]/g, ""); 
    } else if (field?.type === "decimal") {
      newValue = value
        .replace(/[^0-9,]/g, "") 
        .replace(/(,.*),/g, "$1"); 
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleStateChange = (e: React.ChangeEvent<{ value: string }>) => {
    setFormData((prevData) => ({
      ...prevData,
      sigUFPrincipal: e.target.value,
    }));
  };

  const initialFormData: RegisterPowerStation = {
    idPowerStationAneel: "",
    sigUFPrincipal: "",
    ideNucleoCEG: "",
    codCEG: "",
    sigTipoGeracao: "",
    nomEmpreendimento: "",
    mdaPotenciaOutorgadaKw: "",
    mdaTensaoConexao: "",
    nomEmpresaConexao: "",
    numCnpjEmpresaConexao: "",
  };

  const handleSubmit = () => {
    axios
      .post(`${API_URL}/station`, formData)
      .then(() => {
        refreshData(); 
        setSnackbarMessage("Usina criada com sucesso!");
        setOpenSnackbar(true);
        setFormData(initialFormData); 
        setModalOpen(false); 
      })
      .catch((error) => {
        console.error("Erro ao criar a usina:", error);
        setSnackbarMessage("Erro ao criar a usina, tente outro Id");
        setOpenSnackbar(true);
      });
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setModalOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
      >
        Criar Usina
      </Button>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
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
            Novo Registro de Usina
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
            ) : key === "mdaPotenciaOutorgadaKw" ||
              key === "mdaTensaoConexao" ? (
              <TextField
                key={key}
                label={name}
                name={key}
                value={formData[key as keyof RegisterPowerStation] ?? ""}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                inputProps={{
                  inputMode: "decimal",
                }}
              />
            ) : (
              <TextField
                key={key}
                label={name}
                name={key}
                value={formData[key as keyof RegisterPowerStation] ?? ""}
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
                }}
                error={
                  key === "sigTipoGeracao" &&
                  typeof formData[key] === "string" &&
                  formData[key]!.length > 3
                }
                helperText={
                  key === "sigTipoGeracao" &&
                  typeof formData[key] === "string" &&
                  formData[key]!.length < 3
                    ? "A sigla deve ter até 3 letras"
                    : key === "numCnpjEmpresaConexao" && !isCnpjValid
                    ? "O CNPJ deve conter 14 dígitos"
                    : ""
                }
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
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              disabled={!isCnpjValid}
            >
              Criar Usina
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
