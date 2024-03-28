import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    TableContainer,
    IconButton,
    styled,
    Typography,
    Box,
    Snackbar
} from '@mui/material';
import { Delete, Edit, RemoveRedEyeOutlined } from "@mui/icons-material";
import PatientDetail from "./PatientDetail";
import PatientUpdate from "./PatientUpdate";
import PatientDelete from "./PatientDelete";
import PatientCreate from "./PatientCreate";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from "@mui/material/Button";

const AddButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1rem',
    marginRight: '1rem',
});

const AddButton = styled(Button)({
    padding: '0.5rem 1rem',
});

function Patients() {
    const [data, setData] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [error, setError] = useState(null);
    const [selectedPatientName, setSelectedPatientName] = useState('');
    const [selectedPatientID, setSelectedPatientID] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:8080/patients/list')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                setError(error);
                console.log(error);
            });
    };

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const handleCloseViewModal = () => {
        setOpenViewModal(false);
    };

    const handleViewPatient = (patient) => {
        setSelectedPatient(patient);
        setOpenViewModal(true);
    };

    const handleCloseUpdateModal = () => {
        setOpenUpdateModal(false);
        fetchData();
    };

    const handleEditPatient = (patient) => {
        setSelectedPatient(patient);
        setOpenUpdateModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
        fetchData();
    };

    const handleDeletePatient = (patientID) => {
        axios.delete(`http://localhost:8080/patients?id=${patientID}`)
            .then(response => {
                fetchData();
                setShowSuccessMessage(true);
                console.log('Patient successfully deleted');
            })
            .catch(error => {
                setError(error);
                console.log(error);
            });
    };

    const handleOpenDeleteModal = (patientName, patientID) => {
        setSelectedPatientName(patientName);
        setSelectedPatientID(patientID);
        setOpenDeleteModal(true);
    };

    const operationsCell = (patient) => {
        return (
            <TableCell align="center">
                <IconButton color="primary" onClick={() => handleViewPatient(patient)}><RemoveRedEyeOutlined /></IconButton>
                <IconButton color="primary" onClick={() => handleEditPatient(patient)}><Edit /></IconButton>
                <IconButton color="error" onClick={() => handleOpenDeleteModal(patient.name, patient.id)}><Delete /></IconButton>
            </TableCell>
        );
    };

    return (
        <div>
            <Box marginBottom="1rem">
                <Typography variant="h4" gutterBottom>Patient List</Typography>
            </Box>
            {error && (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error.message}
                </Alert>
            )}
            <AddButtonContainer>
                <AddButton size={"small"} onClick={() => setOpenCreateModal(true)} color={"inherit"} variant="contained">
                    New Patient
                </AddButton>
            </AddButtonContainer>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="center">Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="center">Surname</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="center">Age</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="center">Operations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(patient => (
                            <StyledTableRow key={patient.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center">{patient.name}</TableCell>
                                <TableCell align="center">{patient.surname}</TableCell>
                                <TableCell align="center">{patient.age}</TableCell>
                                {operationsCell(patient)}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
                <PatientDetail open={openViewModal} handleCloseModal={handleCloseViewModal} patient={selectedPatient} />
                <PatientUpdate open={openUpdateModal} handleCloseModal={handleCloseUpdateModal} patient={selectedPatient} />
                <PatientDelete open={openDeleteModal} handleCloseModal={handleCloseDeleteModal} patientName={selectedPatientName} patientID={selectedPatientID} handleDelete={handleDeletePatient} />
                <PatientCreate open={openCreateModal} handleCloseModal={() => setOpenCreateModal(false)} fetchData={fetchData} />
            </TableContainer>
            <Snackbar
                open={showSuccessMessage}
                autoHideDuration={6000}
                onClose={() => setShowSuccessMessage(false)}
                message="Patient successfully deleted."
            />
        </div>
    );
}

export default Patients;
