export const formatCNPJ = (cnpj: string): string => {
    if (!cnpj) return "Sem dados";
    cnpj = cnpj.replace(/\D/g, "");
    
    if (cnpj.length !== 14) return "CNPJ inválido";
    
    return cnpj.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  };
  