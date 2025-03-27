package com.example.powerstation.controller

import com.example.powerstation.domain.station.EditPowerStationRequest
import com.example.powerstation.domain.station.PowerStation
import com.example.powerstation.domain.station.PostPowerStationRequest
import com.example.powerstation.domain.station.PowerStationService
import org.apache.coyote.Response
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*


@RestController
@RequestMapping("/station")
class PowerStationController(private val powerStationService: PowerStationService) {

    @GetMapping("/top5")
    fun getTop5Stations(): List<PowerStation> {
        return powerStationService.getTop5PowerStations()
    }

    @PostMapping
    fun addPowerStation(@RequestBody request: PostPowerStationRequest): ResponseEntity<Any> {
        return try {
            val savedStation = powerStationService.addPowerStation(request)
            ResponseEntity.ok(savedStation)
        } catch (e: Exception) {
            val errorMessage = mapOf("error" to e.message)
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage)
        }
    }
    @PutMapping("/{id}")
    fun updatePowerStation(
        @PathVariable id: String,
        @RequestBody request: EditPowerStationRequest
    ): ResponseEntity<Any> {
        return try {
            val updatedStation = powerStationService.updatePowerStation(id, request)
                ?: return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(mapOf("error" to "PowerStation not found with ID: $id"))

            ResponseEntity.ok(updatedStation)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to e.message))
        }
    }

    @DeleteMapping("/{id}")
    fun deletePowerStation(@PathVariable id: String): ResponseEntity<Any> {
        return try {
            val isDeleted = powerStationService.deletePowerStation(id)
            if (isDeleted) {
                ResponseEntity.ok(mapOf("message" to "PowerStation deleted successfully"))
            } else {
                ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(mapOf("error" to "PowerStation not found with ID: $id"))
            }
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to "An error occurred while deleting the PowerStation: ${e.message}"))
        }
    }
}