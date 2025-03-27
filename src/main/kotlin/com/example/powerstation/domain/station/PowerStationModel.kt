package com.example.powerstation.domain.station

data class PostPowerStationRequest(
    val idPowerStationAneel: String,
    val sigUFPrincipal: String?,
    val ideNucleoCEG: String?,
    val codCEG: String?,
    val sigTipoGeracao: String?,
    val nomEmpreendimento: String?,
    val mdaPotenciaOutorgadaKw: String?,
    val mdaTensaoConexao: String?,
    val nomEmpresaConexao: String?,
    val numCnpjEmpresaConexao: String?
)

data class EditPowerStationRequest(
    val sigUFPrincipal: String?,
    val ideNucleoCEG: String?,
    val codCEG: String?,
    val sigTipoGeracao: String?,
    val nomEmpreendimento: String?,
    val mdaPotenciaOutorgadaKw: String?,
    val mdaTensaoConexao: String?,
    val nomEmpresaConexao: String?,
    val numCnpjEmpresaConexao: String?

)

