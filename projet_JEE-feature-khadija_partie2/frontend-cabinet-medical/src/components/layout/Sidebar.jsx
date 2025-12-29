import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Box,
    Typography,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 260;

// ✅ LISTE SIMPLIFIÉE - Seulement 2 éléments
const menuItems = [
    { text: 'Tableau de Bord', icon: <DashboardIcon />, path: '/' },
    { text: 'Patients', icon: <PeopleIcon />, path: '/patients' },
];

const Sidebar = ({ open, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => {
        navigate(path);
        onClose();
    };

    return (
        <Drawer
            variant="temporary"
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    background: 'linear-gradient(180deg, #F3E5F5 0%, #FFFFFF 100%)', // ✅ Violet pâle
                    borderRight: '1px solid rgba(124, 77, 255, 0.2)',
                },
            }}
        >
            <Box sx={{ mt: 8, p: 2, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ color: '#7C4DFF', fontWeight: 600 }}>
                    Module Patient
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Gestion & Dossiers
                </Typography>
            </Box>

            <Divider sx={{ borderColor: 'rgba(79, 195, 247, 0.2)' }} />

            <List sx={{ px: 1, mt: 2 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton
                            selected={location.pathname === item.path}
                            onClick={() => handleNavigation(item.path)}
                            sx={{
                                borderRadius: 2,
                                '&.Mui-selected': {
                                    background: 'linear-gradient(135deg, #7C4DFF 0%, #6A1B9A 100%)', // ✅ Violet
                                    color: 'white',
                                    '& .MuiListItemIcon-root': {
                                        color: 'white',
                                    },
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #6A1B9A 0%, #4A148C 100%)',
                                    },
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(124, 77, 255, 0.1)', // ✅ Violet transparent
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: '#4FC3F7' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontWeight: location.pathname === item.path ? 600 : 400,
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider sx={{ mt: 'auto', borderColor: 'rgba(79, 195, 247, 0.2)' }} />

            <List sx={{ px: 1, py: 2 }}>
                <ListItem disablePadding>
                    <ListItemButton sx={{ borderRadius: 2, color: '#EF5350' }}>
                        <ListItemIcon sx={{ color: '#EF5350' }}>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Déconnexion" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;