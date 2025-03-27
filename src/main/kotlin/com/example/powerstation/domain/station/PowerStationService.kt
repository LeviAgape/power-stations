package com.example.powerstation.domain.station

import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import java.util.*

@Service
class PowerStationService(
    private val powerStationRepository: PowerStationRepository,
    private val restTemplate: RestTemplate,

    ) {
    fun getTop5PowerStations(): List<PowerStation> {
        return powerStationRepository.findTop5ByOrderByPotenciaOutorgadaDesc(PageRequest.of(0, 5))
    }

    fun addPowerStation(request: PostPowerStationRequest): PowerStation {

        val powerStation = PowerStation(
            id = UUID.randomUUID().toString(),
            idPowerStationAneel = request.idPowerStationAneel,
            ideNucleoCEG = request.ideNucleoCEG,
            codCEG = request.codCEG,
            sigUFPrincipal = request.sigUFPrincipal,
            sigTipoGeracao = request.sigTipoGeracao,
            nomEmpreendimento = request.nomEmpreendimento,
            mdaPotenciaOutorgadaKw = request.mdaPotenciaOutorgadaKw,
            mdaTensaoConexao = request.mdaTensaoConexao,
            nomEmpresaConexao = request.nomEmpresaConexao,
            numCnpjEmpresaConexao = request.numCnpjEmpresaConexao
        )
        if (powerStationRepository.existsByIdPowerStationAneel(request.idPowerStationAneel)) {
            throw IllegalArgumentException("Id in csv ${request.idPowerStationAneel} already exist.")
        }

        return powerStationRepository.save(powerStation)
    }

    fun updatePowerStation(id: String, request: EditPowerStationRequest): PowerStation? {
        val existingStation = powerStationRepository.findById(id).orElse(null) ?: return null

        val updatedStation = existingStation.copy(
            ideNucleoCEG = request.ideNucleoCEG ?: existingStation.ideNucleoCEG,
            codCEG = request.codCEG ?: existingStation.codCEG,
            sigUFPrincipal = request.sigUFPrincipal ?: existingStation.sigUFPrincipal,
            sigTipoGeracao = request.sigTipoGeracao ?: existingStation.sigTipoGeracao,
            nomEmpreendimento = request.nomEmpreendimento ?: existingStation.nomEmpreendimento,
            mdaPotenciaOutorgadaKw = request.mdaPotenciaOutorgadaKw ?: existingStation.mdaPotenciaOutorgadaKw,
            mdaTensaoConexao = request.mdaTensaoConexao ?: existingStation.mdaTensaoConexao,
            nomEmpresaConexao = request.nomEmpresaConexao ?: existingStation.nomEmpresaConexao,
            numCnpjEmpresaConexao = request.numCnpjEmpresaConexao ?: existingStation.numCnpjEmpresaConexao
        )
        return powerStationRepository.save(updatedStation)
    }

    fun deletePowerStation(id: String): Boolean {
        if (powerStationRepository.existsById(id)) {
            powerStationRepository.deleteById(id)
            return true
        } else {
            throw IllegalArgumentException("Id $id can't be deleted")
        }
    }
}