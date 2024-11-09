import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CaseIcon from '@mui/icons-material/Assignment';
import KnowledgeIcon from '@mui/icons-material/MenuBook';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Sidebar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawerContent = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Menú
        </Typography>
      </Toolbar>
      <List>
        <ListItem button onClick={() => handleNavigation('/dashboard')}>
          <ListItemIcon>
            <DashboardIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/casos')}>
          <ListItemIcon>
            <CaseIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Gestión de Casos" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/conocimiento')}>
          <ListItemIcon>
            <KnowledgeIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Base de Conocimiento" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/login')}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <nav>
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, backgroundColor: '#5BA397', color: '#fff' },
            }}
          >
            {drawerContent}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', backgroundColor: '#5BA397', color: '#fff' },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </nav>
  );
};

export default Sidebar;
