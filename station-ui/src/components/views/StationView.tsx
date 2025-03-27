import React, { useState } from "react";
import {
  TextField,
  Box,
  Button,
  Typography,
  Modal,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import { RequestPowerStation } from "../station-utills/station-utills";
import { TableHeaders } from "../station-utills/station-headers";
import { statesOfBrazil } from "../station-utills/station-states-brazil";
import { formatCNPJ } from "../station-utills/station-cnpj-mask"; 

interface StationViewProps {
  station: RequestPowerStation;
  closeModal: () => void;
  refreshData: () => void;
}

export const StationView = ({
  station,
  closeModal,
  refreshData,
}: StationViewProps) => {
  const [formData, setFormData] = useState<RequestPowerStation>(station);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cnpj") {
      const cleanedValue = value.replace(/\D/g, ""); 
      
      setFormData((prevData) => ({
        ...prevData,
        [name]: formatCNPJ(cleanedValue), 
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleStateChange = (e: SelectChangeEvent<string>) => {
    setFormData((prevData) => ({
      ...prevData,
      sigUFPrincipal: e.target.value,
    }));
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:8080/station/${formData.id}`, formData)
      .then((response) => {
        console.log("Usina atualizada com sucesso", response.data);
        closeModal();
        refreshData();
      })
      .catch((error) => {
        console.error("Erro ao salvar os dados:", error);
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

        {TableHeaders.map(({ name, key }) => {
          if (key === "idPowerStationAneel") {
            return (
              <TextField
                key={key}
                label={name}
                name={key}
                value={formData[key as keyof RequestPowerStation] ?? ""}
                fullWidth
                margin="normal"
                disabled
              />
            );
          } else if (key === "sigUFPrincipal") {
            return (
              <FormControl fullWidth margin="normal" key={key}>
                <InputLabel>UF</InputLabel>
                <Select
                  value={formData.sigUFPrincipal ?? ""}
                  onChange={handleStateChange}
                  key={key}
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
            );
          } else if (key === "numCnpjEmpresaConexao") {
            return (
              <TextField
                key={key}
                label={name}
                name={key}
                value={formData[key as keyof RequestPowerStation] ?? ""}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                inputProps={{
                  maxLength: 18,
                }}
              />
            );
          } else {
            return (
              <TextField
                key={key}
                label={name}
                name={key}
                value={formData[key as keyof RequestPowerStation] ?? ""}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            );
          }
        })}

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
          <Button onClick={handleSave} variant="contained" color="primary">
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
