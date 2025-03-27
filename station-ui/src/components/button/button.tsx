import { Button } from "@mui/material";

export const ButtonHomeView = () => {
  return (
    <Button
      sx={{
        backgroundColor: "#4f8ef7", 
        color: "white", 
        fontWeight: "bold", 
        padding: "10px 20px", 
        borderRadius: "16px", 
        fontSize: "16px", 
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
        transition: "background-color 0.3s ease, transform 0.2s ease", 
        "&:hover": {
          backgroundColor: "#3582d8",
          transform: "scale(1.05)", 
        },
        "&:active": {
          backgroundColor: "#3582d8",
          transform: "scale(1)", 
        },
      }}
    >
      Novo Registro
    </Button>
  );
};
