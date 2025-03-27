package com.example.powerstation.domain.station

import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface PowerStationRepository : JpaRepository<PowerStation, String>{
    fun existsByIdPowerStationAneel( idPowerStationAneel: String?): Boolean

}
