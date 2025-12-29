import React, { useState } from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F0F9FF' }}>
            <Navbar onMenuClick={handleSidebarToggle} />
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: 8,
                    width: '100%',
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Layout;