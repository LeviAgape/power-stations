export interface PowerStation {
  id: string;
  idPowerStationAneel?: string;
  sigUFPrincipal?: string;
  ideNucleoCEG?: string;
  codCEG?: string;
  sigTipoGeracao?: string;
  nomEmpreendimento?: string;
  mdaPotenciaOutorgadaKw?: string;
  mdaTensaoConexao?: string;
  nomEmpresaConexao?: string;
  numCnpjEmpresaConexao?: string;
}

export interface RequestPowerStation {
  id: string;
  sigUFPrincipal?: string;
  ideNucleoCEG?: string;
  codCEG?: string;
  sigTipoGeracao?: string;
  nomEmpreendimento?: string;
  mdaPotenciaOutorgadaKw?: string;
  mdaTensaoConexao?: string;
  nomEmpresaConexao?: string;
  numCnpjEmpresaConexao?: string;
}

export interface RegisterPowerStation {
  idPowerStationAneel?: string;
  sigUFPrincipal?: string;
  ideNucleoCEG?: string;
  codCEG?: string;
  sigTipoGeracao?: string;
  nomEmpreendimento?: string;
  mdaPotenciaOutorgadaKw?: string;
  mdaTensaoConexao?: string;
  nomEmpresaConexao?: string;
  numCnpjEmpresaConexao?: string;
}
