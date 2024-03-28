import React, { useState, useEffect } from 'react';
import {
    Modal,
    Typography,
    Button,
    CardContent,
    CardActions,
    Card,
    TextField,
    Grid,
    MenuItem,
    Snackbar,
    CardMedia
} from '@mui/material';
import axios from 'axios';
import patientImage from "../../static/image/Patient.png";

function PatientCreate({ open, handleCloseModal, fetchData }) {
    const [newPatientInfo, setNewPatientInfo] = useState({
        name: '',
        surname: '',
        age: '',
        tc: '',
        address: '',
        complaint: '',
        hospital: '',
        gender: '',
    });

    const [hospitals, setHospitals] = useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showSubmitWarning, setShowSubmitWarning] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showTcLengthWarning, setShowTcLengthWarning] = useState(false);

    useEffect(() => {
        fetchHospitals();
    }, []);

    const fetchHospitals = () => {
        axios.get('http://localhost:8080/hospitals/list')
            .then(response => {
                setHospitals(response.data);
            })
            .catch(error => {
                console.error('An error occurred while fetching hospitals:', error);
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewPatientInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCreatePatient = () => {
        if (!validateForm()) {
            setShowSubmitWarning(true);
            return;
        }

        if (newPatientInfo.tc.length !== 11) {
            setShowTcLengthWarning(true);
            return;
        }

        const hospitalInfo = {
            id: newPatientInfo.hospital
        };

        const newPatient = {
            ...newPatientInfo,
            hospital: hospitalInfo
        };

        axios.post('http://localhost:8080/patients', newPatient)
            .then(response => {
                setShowSuccessMessage(true);
                fetchData();
                handleCloseModal();
            })
            .catch(error => {
                setShowError(true);
                console.error('An error occurred while creating the patient:', error);
            });
    };

    const validateForm = () => {
        return (
            newPatientInfo.name &&
            newPatientInfo.surname &&
            newPatientInfo.age &&
            newPatientInfo.tc &&
            newPatientInfo.address &&
            newPatientInfo.complaint &&
            newPatientInfo.hospital &&
            newPatientInfo.gender
        );
    };

    const handleCloseSnackbar = () => {
        setShowSuccessMessage(false);
        setShowError(false);
        setShowTcLengthWarning(false);
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <CardMedia
                        component="img"
                        height="160"
                        image={patientImage}
                        alt="hospital"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Create New Patient
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="Name"
                                    variant="outlined"
                                    value={newPatientInfo.name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="surname"
                                    name="surname"
                                    label="Surname"
                                    variant="outlined"
                                    value={newPatientInfo.surname}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="age"
                                    name="age"
                                    label="Age"
                                    type="number"
                                    variant="outlined"
                                    value={newPatientInfo.age}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="tc"
                                    name="tc"
                                    label="TC No"
                                    variant="outlined"
                                    value={newPatientInfo.tc}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="address"
                                    name="address"
                                    label="Address"
                                    variant="outlined"
                                    value={newPatientInfo.address}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="complaint"
                                    name="complaint"
                                    label="Complaint"
                                    variant="outlined"
                                    value={newPatientInfo.complaint}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    fullWidth
                                    id="hospital"
                                    name="hospital"
                                    label="Hospital"
                                    variant="outlined"
                                    value={newPatientInfo.hospital}
                                    onChange={handleChange}
                                >
                                    {hospitals.map((hospital) => (
                                        <MenuItem key={hospital.id} value={hospital.id}>
                                            {hospital.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    fullWidth
                                    id="gender"
                                    name="gender"
                                    label="Gender"
                                    variant="outlined"
                                    value={newPatientInfo.gender}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="MALE">Male</MenuItem>
                                    <MenuItem value="FEMALE">Female</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleCloseModal} size="small">Cancel</Button>
                        <Button onClick={handleCreatePatient} color="primary" size="small">Create</Button>
                    </CardActions>
                </Card>
            </Modal>
            <Snackbar
                open={showSuccessMessage}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Patient successfully created."
            />
            <Snackbar
                open={showSubmitWarning}
                autoHideDuration={6000}
                onClose={() => setShowSubmitWarning(false)}
                message="Please fill all fields."
            />
            <Snackbar
                open={showTcLengthWarning}
                autoHideDuration={6000}
                onClose={() => setShowTcLengthWarning(false)}
                message="TC no must be 11 characters."
            />
            <Snackbar
                open={showError}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="An error occurred while creating the patient."
            />
        </div>
    );
}

export default PatientCreate;
