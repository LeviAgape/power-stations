package com.example.powerstation.controller

import com.example.powerstation.domain.aneel.AneelRecord

import com.example.powerstation.domain.aneel.AneelApiService
import com.example.powerstation.domain.station.PowerStation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/aneel")
class AneelApiController(private val aneelApiService: AneelApiService) {

    @GetMapping("/load/csv")
    fun getCvs(): ResponseEntity<List<PowerStation>> {
        val getCvs = aneelApiService.getPowerStationsFromAneelAndSave()
        return ResponseEntity.ok(getCvs)
    }


    @GetMapping("/records")
    fun getRecords(): ResponseEntity<List<AneelRecord>> {
        val records = aneelApiService.getRecordsWithDetails()
        return ResponseEntity.ok(records)
    }
}