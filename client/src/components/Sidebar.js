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
import { useTheme } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { getVersionInfo } from '../services/versionService';

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(!isMobile);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [version, setVersion] = useState('0.1.0');
  const [releaseDate, setReleaseDate] = useState(null);

  // Fetch version info on component mount
  useEffect(() => {
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
  }, []);

  // Info Popover functions
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setIsPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setIsPopoverOpen(false);
  };

  // Language selection functions
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleToggle = () => {
    setOpen(!open);
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
        sx={{ 
          zIndex: theme.zIndex.drawer + 1,
        }}
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
            sx={{ 
              flexGrow: isMobile ? 1 : 0, 
              fontWeight: 600,
            }}
          >
            PhishIntel
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              size='large' 
              color="inherit" 
              onClick={handlePopoverOpen}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <InfoIcon />
            </IconButton>
            
            <FormControl variant="outlined" size="small">
              <Select
                labelId="language-select-label"
                value={selectedLanguage}
                onChange={handleLanguageChange}
                sx={{
                  color: 'white',
                  border: '1px solid white',
                  '& .MuiSelect-icon': {
                    color: 'white',
                  },
                  '&:focus': {
                    outline: 'none',
                    border: '0px',
                  },
                  '&:hover': {
                    border: '0px',
                  },
                  '&.Mui-focused': {
                    border: '0px',
                    outline: 'none',
                  },
                }}
              >
                <MenuItem value="EN">EN</MenuItem>
                <MenuItem value="FR">FR</MenuItem>
              </Select>
            </FormControl>
            
            <Popover
              open={isPopoverOpen}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                sx: {
                  borderRadius: '12px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(0,0,0,0.08)',
                }
              }}
            >
              <Box sx={{ p: 2, minWidth: '200px' }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  Community Edition
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Release Date: {releaseDate || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Version: {version}
                </Typography>
              </Box>
            </Popover>
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
          
          {/* Enhanced Documentation Button */}
          <ListItem sx={{ px: 2, py: 1 }}>
            <Button
              component="a"
              href="https://docs.phishintel.com/"
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              startIcon={<HelpIcon />}
              sx={{
                justifyContent: 'flex-start',
                width: '100%',
                py: 1.5,
                px: 2,
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                borderRadius: '12px',
                textTransform: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  borderColor: theme.palette.primary.dark,
                  color: theme.palette.primary.dark,
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.15)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              Documentation
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
