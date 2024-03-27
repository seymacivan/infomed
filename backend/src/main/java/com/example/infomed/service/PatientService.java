package com.example.infomed.service;

import com.example.infomed.dto.PatientDto;
import com.example.infomed.exception.ResourceAlreadyExistException;
import com.example.infomed.exception.ResourceNotFoundException;
import com.example.infomed.model.Patient;
import com.example.infomed.repository.PatientRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Optional;

@Service
@Validated
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private ModelMapper modelMapper;

    public PatientDto savePatient(PatientDto patientDto) {
        Optional<Patient> patient_check = patientRepository.findByNameAndSurnameAndTc(patientDto.getName(), patientDto.getSurname(), patientDto.getTc());
        Patient patient;
        if(patient_check.isPresent()){
            throw new ResourceAlreadyExistException("Patient already exists!");
        }else{
            patient = patientRepository.save(modelMapper.map(patientDto, Patient.class));
        }
        return modelMapper.map(patient, new TypeToken<PatientDto>(){}.getType());
    }

    public PatientDto getPatient(long id) {
        Patient patient = patientRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("patient", "id", String.valueOf(id))
        );
        return modelMapper.map(patient, new TypeToken<PatientDto>(){}.getType());
    }

    public List<PatientDto> getAllPatients() {
        List<Patient> patientList = patientRepository.findAll();
        return modelMapper.map(patientList, new TypeToken<List<PatientDto>>(){}.getType());
    }

    public PatientDto updatePatient(PatientDto patientDto) {
        Optional<Patient> patient = patientRepository.findByNameAndSurnameAndTc(patientDto.getName(), patientDto.getSurname(), patientDto.getTc());
        if (patient.isEmpty()){
            throw new ResourceNotFoundException("patient", "name", String.valueOf(patientDto.getName()));
        }
        else{
            Patient existingPatient = patient.get();
            existingPatient.setAddress(patientDto.getAddress());
            existingPatient.setAge(patientDto.getAge());
            existingPatient.setComplaint(patientDto.getComplaint());
            existingPatient.setGender(patientDto.getGender());
            existingPatient.setHospital(patientDto.getHospital());
            Patient updatedPatient = patientRepository.save(existingPatient);
            return modelMapper.map(updatedPatient, new TypeToken<PatientDto>(){}.getType());
        }
    }

    public void deletePatient(long id) throws ResourceNotFoundException {
        Optional<Patient> patient = patientRepository.findById(id);
        if (patient.isEmpty()){
            throw new ResourceNotFoundException("patient", "id", String.valueOf(id));
        }
        else patientRepository.deleteById(id);
    }
}
