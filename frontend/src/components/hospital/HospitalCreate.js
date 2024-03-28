import React, { useState } from 'react';
import {
    Modal,
    Typography,
    Button,
    CardContent,
    CardActions,
    Card,
    TextField,
    Grid,
    CardMedia,
    MenuItem,
    Snackbar
} from '@mui/material';
import hospitalImage from "../../static/image/Hospital.png";
import axios from 'axios';

const hospitalTypes = [
    { value: 'DENTAL_HOSPITAL', label: 'Dental Hospital' },
    { value: 'EYE_HOSPITAL', label: 'Eye Hospital' },
    { value: 'GENERAL_HOSPITAL', label: 'General Hospital' },
    { value: 'OTHERS', label: 'Others' }
];

function HospitalCreate({ open, handleCloseModal, fetchData }) {
    const [newHospitalInfo, setNewHospitalInfo] = useState({
        name: '',
        address: '',
        hospitalType: '',
    });

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showSubmitWarning, setShowSubmitWarning] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewHospitalInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCreateHospital = () => {
        if (!newHospitalInfo.name || !newHospitalInfo.address || !newHospitalInfo.hospitalType) {
            setShowSubmitWarning(true);
            return;
        }

        axios.post('http://localhost:8080/hospitals', newHospitalInfo)
            .then(response => {
                setShowSuccessMessage(true);
                fetchData();
                handleCloseModal();
            })
            .catch(error => {
                setShowError(true);
                console.error('An error occurred while creating the hospital:', error);
            });
    };

    const handleCloseSnackbar = () => {
        setShowSuccessMessage(false);
        setShowError(false);
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
                        image={hospitalImage}
                        alt="hospital"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Create New Hospital
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="Hospital Name"
                                    variant="outlined"
                                    value={newHospitalInfo.name}
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
                                    value={newHospitalInfo.address}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    id="hospitalType"
                                    name="hospitalType"
                                    label="Hospital Type"
                                    variant="outlined"
                                    value={newHospitalInfo.hospitalType}
                                    onChange={handleChange}
                                >
                                    {hospitalTypes.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleCloseModal} size="small">Cancel</Button>
                        <Button onClick={handleCreateHospital} color="primary" size="small">Create</Button>
                    </CardActions>
                </Card>
            </Modal>
            <Snackbar
                open={showSuccessMessage}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Hospital successfully created."
            />
            <Snackbar
                open={showSubmitWarning}
                autoHideDuration={6000}
                onClose={() => setShowSubmitWarning(false)}
                message="Please fill all fields."
            />
            <Snackbar
                open={showError}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="An error occurred while creating the hospital."
            />
        </div>
    );
}

export default HospitalCreate;
