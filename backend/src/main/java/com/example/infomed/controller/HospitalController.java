package com.example.infomed.controller;

import com.example.infomed.dto.HospitalDto;
import com.example.infomed.service.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("hospitals")
@CrossOrigin(origins = "*")
public class HospitalController {
    @Autowired
    private HospitalService hospitalService;

    @GetMapping()
    public HospitalDto getHospital(@RequestParam(value = "id") long id) {
        return hospitalService.getHospital(id);
    }
    @GetMapping("/list")
    public List<HospitalDto> getHospitals(){
        return hospitalService.getAllHospitals();
    }

    @PostMapping()
    public HospitalDto saveHospital(@RequestBody HospitalDto hospitalDto){
        return hospitalService.saveHospital(hospitalDto);
    }

    @PutMapping()
    public HospitalDto updateHospital(@RequestBody HospitalDto hospitalDto){
        return hospitalService.updateHospital(hospitalDto);
    }

    @DeleteMapping()
    public void deleteHospital(@RequestParam(value = "id") long id){
        hospitalService.deleteHospital(id);
    }

}
