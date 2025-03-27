export const TableHeaders = [
  { name: "Id", key: "idPowerStationAneel", type: "disabled" },
  { name: "UF", key: "sigUFPrincipal", type: "select" },
  {
    name: "Identificação Nucleo CEG",
    key: "ideNucleoCEG",
    type: "decimal",
  },
  { name: "Código CEG", key: "codCEG", type: "undefined" },
  { name: "Sigla do tipo de geração", key: "sigTipoGeracao", type: "letters" },
  { name: "Nome do Empreendimento", key: "nomEmpreendimento", type: "text" },
  {
    name: "Média Potência Outorgada (KW)",
    key: "mdaPotenciaOutorgadaKw",
    type: "decimal",
  },
  { name: "Média Tensão Conexão", key: "mdaTensaoConexao", type: "decimal" },
  { name: "Nome da Empresa Conexão", key: "nomEmpresaConexao", type: "text" },
  {
    name: "CNPJ da Empresa Conexão",
    key: "numCnpjEmpresaConexao",
    type: "cnpj",
  },
];
