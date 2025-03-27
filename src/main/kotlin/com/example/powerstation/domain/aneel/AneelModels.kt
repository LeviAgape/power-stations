package com.example.powerstation.domain.aneel

data class AneelApiResponse(
    val result: AneelResult
)

data class AneelResult(
    val records: List<AneelRecord>
)

data class AneelRecord(
    val _id: String,
    val SigUFPrincipal: String?,
    val IdeNucleoCEG: String?,
    val CodCEG: String?,
    val SigTipoGeracao: String?,
    val NomEmpreendimento: String?,
    val MdaPotenciaOutorgadaKw: String?,
    val MdaTensaoConexao: String?,
    val NomEmpresaConexao: String?,
    val NumCnpjEmpresaConexao: String?
)
