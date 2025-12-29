import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
    Avatar,
    Box,

} from '@mui/material';
import {
    Menu as MenuIcon,
    Notifications as NotificationsIcon,

    AccountCircle,
} from '@mui/icons-material';


// Styled Search Component






const Navbar = ({ onMenuClick }) => {
    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                background: 'linear-gradient(135deg, #7C4DFF 0%, #6A1B9A 100%)', // ✅ Violet
                boxShadow: '0 4px 20px rgba(124, 77, 255, 0.3)',
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={onMenuClick}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        fontWeight: 600,
                        letterSpacing: 1,
                    }}
                >
                    🏥 Cabinet Médical
                </Typography>



                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    <IconButton color="inherit">
                        <Avatar
                            sx={{
                                width: 36,
                                height: 36,
                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                            }}
                        >
                            <AccountCircle />
                        </Avatar>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;