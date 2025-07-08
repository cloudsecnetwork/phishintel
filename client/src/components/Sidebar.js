import React, { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  Divider,
  Button,
  Popover,
  MenuItem,
  Select,
  FormControl,
  Box,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  Outbox as OutboxIcon,
  Email as EmailIcon,
  Campaign as CampaignIcon,
  Menu as MenuIcon,
  Info as InfoIcon,
  Help as HelpIcon,
} from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import { useTheme } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { getVersionInfo } from '../services/versionService';
import { jwtDecode } from 'jwt-decode';
import { getToken, clearToken } from '../utils/tokenManager';

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(!isMobile);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [version, setVersion] = useState('0.1.0');
  const [releaseDate, setReleaseDate] = useState(null);
  const [user, setUser] = useState(null);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  const handleToggle = () => {
    setOpen(!open);
  }

  // Fetch version info on component mount
  useEffect(() => {
    // Fetch version info
    const fetchVersionInfo = async () => {
      try {
        const versionInfo = await getVersionInfo();
        setVersion(versionInfo.version);
        setReleaseDate(versionInfo.releaseDate);
      } catch (error) {
        console.error('Failed to fetch version info:', error);
      }
    };
    fetchVersionInfo();
    // Decode user info from JWT
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  // Profile menu handlers
  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };
  const handleLogout = () => {
    clearToken();
    handleProfileMenuClose();
    window.location.href = '/console';
  };

  // Grouped menu items with enhanced structure
  const menuItems = [
    {
      group: 'Main',
      items: [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/console/dashboard' },
      ],
    },
    {
      group: 'Setup',
      items: [
        { text: 'Audience', icon: <GroupIcon />, path: '/console/audience' },
        { text: 'Sender Profile', icon: <OutboxIcon />, path: '/console/sender-profile' },
        { text: 'Email Templates', icon: <EmailIcon />, path: '/console/templates' },
        { text: 'Campaign', icon: <CampaignIcon />, path: '/console/campaign' },
      ],
    },
  ];

  return (
    <>
      {/* Simple AppBar */}
      <AppBar 
        position="fixed" 
        sx={{ zIndex: theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleToggle}
              edge="start"
              sx={{ 
                mr: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            sx={{ flexGrow: isMobile ? 1 : 0, fontWeight: 600 }}
          >
            PhishIntel
          </Typography>
          {/* Modernized Profile Avatar & Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleProfileMenuOpen}
              sx={{ p: 0, ml: 2, borderRadius: '50%' }}
            >
              <Box sx={{
                bgcolor: 'primary.main',
                borderRadius: '50%',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <AccountCircleIcon sx={{ color: '#fff', width: 32, height: 32 }} />
              </Box>
            </IconButton>
            <Menu
              anchorEl={profileMenuAnchor}
              open={Boolean(profileMenuAnchor)}
              onClose={handleProfileMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: {
                  borderRadius: '16px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  minWidth: 260,
                  p: 1,
                }
              }}
            >
              <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ bgcolor: 'primary.main', color: '#fff', width: 40, height: 40, fontWeight: 700, fontSize: 22, border: '2.5px solid #fff', boxSizing: 'border-box' }}>
                  {user?.firstName ? user.firstName[0].toUpperCase() : (user?.username ? user.username[0].toUpperCase() : <AccountCircleIcon sx={{ width: 32, height: 32 }} />)}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} noWrap>
                    {user?.firstName || 'User'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {user?.email || user?.role || 'NA'}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ px: 2, py: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  Community Edition
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  Release Date: {releaseDate || 'N/A'}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  Version: {version}
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <MenuItem disabled>View Profile</MenuItem>
              <MenuItem disabled>Update Password</MenuItem>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Enhanced Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        sx={{
          width: 260,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 260,
            boxSizing: 'border-box',
            border: 'none',
            background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
            boxShadow: '2px 0 10px rgba(0,0,0,0.08)',
          },
        }}
        open={open}
        onClose={handleToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Toolbar />
        
        <List sx={{ pt: 1 }}>
          {menuItems.map((group) => (
            <Box key={group.group}>
              {/* Enhanced Section Headers */}
              <Typography 
                variant="subtitle2" 
                color='text.secondary' 
                sx={{ 
                  px: 3, 
                  py: 1.5, 
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: theme.palette.text.secondary,
                  opacity: 0.7,
                }}
              >
                {group.group}
              </Typography>
              
              {group.items.map((item) => (
                <ListItem
                  key={item.text}
                  component={NavLink}
                  to={item.path}
                  onClick={isMobile ? handleToggle : undefined}
                  sx={{
                    mx: 1,
                    mb: 0.5,
                    borderRadius: '12px',
                    backgroundColor: 'transparent',
                    color: 'inherit',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                      transform: 'translateX(4px)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.text.secondary,
                      transition: 'color 0.3s ease',
                    },
                    '& .MuiListItemText-primary': {
                      fontWeight: 500,
                      transition: 'all 0.3s ease',
                    },
                    '&.active': {
                      backgroundColor: '#1976d2',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#1565c0',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'white',
                      },
                      '& .MuiListItemText-primary': {
                        fontWeight: 600,
                        color: 'white',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '0.9rem',
                      }
                    }}
                  />
                </ListItem>
              ))}
              <Divider sx={{ my: 1, mx: 2, opacity: 0.3 }} />
            </Box>
          ))}
          
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
