package com.example.infomed.service;

import com.example.infomed.dto.HospitalDto;
import com.example.infomed.exception.ResourceAlreadyExistException;
import com.example.infomed.exception.ResourceNotFoundException;
import com.example.infomed.model.Hospital;
import com.example.infomed.repository.HospitalRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class HospitalService {


    @Autowired
    private HospitalRepository hospitalRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<HospitalDto> getAllHospitals(){
        List<Hospital> hospitalList = hospitalRepository.findAll();
        return modelMapper.map(hospitalList, new TypeToken<List<HospitalDto>>(){}.getType());
    }

    public HospitalDto saveHospital(HospitalDto hospitalDto) {
        Optional<Hospital> hospital_check = hospitalRepository.findByName(hospitalDto.getName());
        Hospital hospital;
        if(hospital_check.isPresent()){
            throw new ResourceAlreadyExistException("Hospital already exists!");
        }else{
            hospital = hospitalRepository.save(modelMapper.map(hospitalDto, Hospital.class));
        }
        return modelMapper.map(hospital, new TypeToken<HospitalDto>(){}.getType());
    }

    public HospitalDto getHospital(Long id) {
        Hospital hospital = hospitalRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("hospital", "id", String.valueOf(id))
        );
        return modelMapper.map(hospital, new TypeToken<HospitalDto>(){}.getType());
    }

    public HospitalDto updateHospital(HospitalDto hospitalDto) {
        Optional<Hospital> hospital = hospitalRepository.findByName(hospitalDto.getName());
        if (hospital.isEmpty()){
            throw new ResourceNotFoundException("hospital", "name", String.valueOf(hospitalDto.getName()));
        }
        else{
            Hospital existingHospital = hospital.get();
            existingHospital.setAddress(hospitalDto.getAddress());
            existingHospital.setHospitalType(hospitalDto.getHospitalType());
            Hospital updatedHospital = hospitalRepository.save(existingHospital);
            return modelMapper.map(updatedHospital, new TypeToken<HospitalDto>(){}.getType());
        }
    }

    public void deleteHospital(Long id) throws ResourceNotFoundException {
        Optional<Hospital> hospital = hospitalRepository.findById(id);
        if (hospital.isEmpty()){
            throw new ResourceNotFoundException("hospital", "id", String.valueOf(id));
        }
        else hospitalRepository.deleteById(id);
    }
}
