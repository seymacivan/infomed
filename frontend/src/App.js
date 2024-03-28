import React, { useState } from 'react';
import './App.css';
import Header from "./components/base/Header";
import Patients from "./components/patient/Patients";
import Hospitals from "./components/hospital/Hospitals";

function App() {
    const [currentPage, setCurrentPage] = useState('Hospitals');

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    let mainComponent;
    if (currentPage === 'Hospitals') {
        mainComponent = <Hospitals />;
    } else if (currentPage === 'Patients') {
        mainComponent = <Patients />;
    }

    return (
        <div className="App">
            <Header onPageChange={handlePageChange} />
            {mainComponent}
        </div>
    );
}

export default App;
