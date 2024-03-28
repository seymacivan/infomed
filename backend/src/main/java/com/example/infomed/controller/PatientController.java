package com.example.infomed.controller;

import com.example.infomed.dto.PatientDto;
import com.example.infomed.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("patients")
@CrossOrigin(origins = "*")
public class PatientController {
    @Autowired
    private PatientService patientService;

    @GetMapping()
    public PatientDto getPatient(@RequestParam(value = "id") long id) {
        return patientService.getPatient(id);
    }
    @GetMapping("/list")
    public List<PatientDto> getPatients(){
        return patientService.getAllPatients();
    }

    @PostMapping()
    public PatientDto savePatient(@RequestBody PatientDto patientDto){
        return patientService.savePatient(patientDto);
    }

    @PutMapping()
    public PatientDto updatePatient(@RequestBody PatientDto patientDto){
        return patientService.updatePatient(patientDto);
    }

    @DeleteMapping()
    public void deletePatient(@RequestParam(value = "id") long id){
        patientService.deletePatient(id);
    }

}
