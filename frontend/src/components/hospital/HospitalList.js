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
    Button,
    Box,
} from '@mui/material';
import { Delete, Edit, RemoveRedEyeOutlined } from "@mui/icons-material";
import HospitalDetailModal from "./HospitalDetailModal";
import HospitalUpdate from "./HospitalUpdate";
import HospitalDelete from "./HospitalDelete";
import HospitalCreate from "./HospitalCreate";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const AddButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1rem',
    marginRight: '1rem',
});

const AddButton = styled(Button)({
    padding: '0.5rem 1rem',
});

function HospitalList() {
    const [data, setData] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [error, setError] = useState(null);
    const [selectedHospitalName, setSelectedHospitalName] = useState('');
    const [selectedHospitalID, setSelectedHospitalID] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:8080/hospitals/list')
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

    const handleViewHospital = (hospital) => {
        setSelectedHospital(hospital);
        setOpenViewModal(true);
    };

    const handleCloseUpdateModal = () => {
        setOpenUpdateModal(false);
        fetchData();
    };

    const handleEditHospital = (hospital) => {
        setSelectedHospital(hospital);
        setOpenUpdateModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
        fetchData();
    };

    const handleDeleteHospital = (hospitalID) => {
        axios.delete(`http://localhost:8080/hospitals?id=${hospitalID}`)
            .then(response => {
                fetchData();
                console.log('Hospital successfully deleted');
            })
            .catch(error => {
                setError(error);
                console.log(error);
            });
    };

    const handleOpenDeleteModal = (hospitalName, hospitalID) => {
        setSelectedHospitalName(hospitalName);
        setSelectedHospitalID(hospitalID);
        setOpenDeleteModal(true);
    };

    const operationsCell = (hospital) => {
        return (
            <TableCell align="center">
                <IconButton color="primary" onClick={() => handleViewHospital(hospital)}><RemoveRedEyeOutlined /></IconButton>
                <IconButton color="primary" onClick={() => handleEditHospital(hospital)}><Edit /></IconButton>
                <IconButton color="error" onClick={() => handleOpenDeleteModal(hospital.name, hospital.id)}><Delete /></IconButton>
            </TableCell>
        );
    };

    return (
        <div>
            <Box marginBottom="1rem">
                <Typography variant="h4" gutterBottom>Hospital List</Typography>
            </Box>
            {error && (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error.message}
                </Alert>
            )}
            <AddButtonContainer>
                <AddButton size={"small"} onClick={() => setOpenCreateModal(true)} color={"inherit"} variant="contained">
                    New Hospital
                </AddButton>
            </AddButtonContainer>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="center">Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="center">Address</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="center">Type</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="center">Operations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(hospital => (
                            <StyledTableRow key={hospital.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center">{hospital.name}</TableCell>
                                <TableCell align="center">{hospital.address}</TableCell>
                                <TableCell align="center">{hospital.hospitalType}</TableCell>
                                {operationsCell(hospital)}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
                <HospitalDetailModal open={openViewModal} handleCloseModal={handleCloseViewModal} hospital={selectedHospital} />
                <HospitalUpdate open={openUpdateModal} handleCloseModal={handleCloseUpdateModal} hospital={selectedHospital} />
                <HospitalDelete open={openDeleteModal} handleCloseModal={handleCloseDeleteModal} hospitalName={selectedHospitalName} hospitalID={selectedHospitalID} handleDelete={handleDeleteHospital} />
                <HospitalCreate open={openCreateModal} handleCloseModal={() => setOpenCreateModal(false)} fetchData={fetchData} />
            </TableContainer>
        </div>
    );
}

export default HospitalList;
