package com.example.powerstation.domain.station

import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface PowerStationRepository : JpaRepository<PowerStation, String>{
    fun existsByIdPowerStationAneel( idPowerStationAneel: String?): Boolean
    @Query("SELECT p FROM PowerStation p ORDER BY CAST(p.mdaPotenciaOutorgadaKw AS double) DESC")
    fun findTop5ByOrderByPotenciaOutorgadaDesc(pageable: Pageable): List<PowerStation>

}
