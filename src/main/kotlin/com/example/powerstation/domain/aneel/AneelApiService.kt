package com.example.powerstation.domain.aneel

import com.example.powerstation.domain.station.PowerStation
import com.example.powerstation.domain.station.PowerStationRepository
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.getForObject
import java.util.*

@Service
class AneelApiService(
    private val restTemplate: RestTemplate,
    private val powerStationRepository: PowerStationRepository
) {

    fun getPowerStationsFromAneelAndSave(): List<PowerStation> {
        val records = getRecordsWithDetails()

        val existingIds = powerStationRepository.findAll().map { it.idPowerStationAneel }.toSet()

        val newPowerStations = records
            .filter { record -> record._id !in existingIds }
            .map { record ->
                PowerStation(
                    id = UUID.randomUUID().toString(),
                    idPowerStationAneel = record._id,
                    codCEG = record.CodCEG,
                    sigUFPrincipal = record.SigUFPrincipal,
                    ideNucleoCEG = record.IdeNucleoCEG,
                    sigTipoGeracao = record.SigTipoGeracao,
                    nomEmpreendimento = record.NomEmpreendimento,
                    mdaPotenciaOutorgadaKw = record.MdaPotenciaOutorgadaKw,
                    mdaTensaoConexao = record.MdaTensaoConexao,
                    nomEmpresaConexao = record.NomEmpresaConexao,
                    numCnpjEmpresaConexao = record.NumCnpjEmpresaConexao
                )
            }

        if (newPowerStations.isNotEmpty()) {
            powerStationRepository.saveAll(newPowerStations)
            println("${newPowerStations.size} register create with success!")
        } else {
            println("Anyone register to save.")
        }

        return newPowerStations
    }

    fun getRecordsWithDetails(): List<AneelRecord> {
        val url = "https://dadosabertos.aneel.gov.br/api/3/action/datastore_search" +
                "?resource_id=4a615df8-4c25-48fa-bbea-873a36a79518&limit=4"

        return restTemplate.getForObject<AneelApiResponse>(url)?.result?.records ?: emptyList()
    }
}
