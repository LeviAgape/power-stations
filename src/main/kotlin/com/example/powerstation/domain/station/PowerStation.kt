package com.example.powerstation.domain.station

import jakarta.persistence.*

@Entity
@Table(name = "power_station")
data class PowerStation(
    @Id
    val id: String,

    @Column(name = "id_power_station_aneel")
    val idPowerStationAneel: String,

    @Column(name = "cod_ceg")
    val codCEG: String?,

    @Column(name = "sig_uf_principal")
    val sigUFPrincipal: String?,

    @Column(name = "ide_nucleo_ecg")
    val ideNucleoCEG: String?,

    @Column(name = "sig_tipo_geracao")
    val sigTipoGeracao: String?,

    @Column(name = "nome_empreendimento")
    val nomEmpreendimento: String?,

    @Column(name = "mda_potencial_outorgada_kw")
    val mdaPotenciaOutorgadaKw: String?,

    @Column(name = "mda_tensao_conexao")
    val mdaTensaoConexao: String?,

    @Column(name = "nome_empresa_conexao")
    val nomEmpresaConexao: String?,

    @Column(name = "num_cnpj_empresa_conexao")
    val numCnpjEmpresaConexao: String?
)


