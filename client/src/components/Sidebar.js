import React, { useState } from 'react';
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
  // Timeline as TimelineIcon,
  Group as GroupIcon,
  Outbox as OutboxIcon,
  Email as EmailIcon,
  Campaign as CampaignIcon,
  Menu as MenuIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(!isMobile);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');

  // Info Popover functions
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setIsPopoverOpen(true); // Open the popover
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setIsPopoverOpen(false); // Close the popover
  };

  // Language selection functions
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  // Grouped menu items
  const menuItems = [
    {
      group: 'Main',
      items: [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/console/dashboard' },
        // { text: 'Timeline', icon: <TimelineIcon />, path: '/console/timeline' },
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
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleToggle}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: isMobile ? 1 : 0, fontWeight: 600 }}>
            PhishIntel
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size='large' color="inherit" onClick={handlePopoverOpen}>
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
                    color: 'white', // Change the arrow icon color to white
                  },
                  '&:focus': {
                    outline: 'none', // Remove focus outline
                    border: '0px', // Ensure border remains 0px on focus
                  },
                  '&:hover': {
                    border: '0px', // Maintain no border on hover
                  },
                  '&.Mui-focused': {
                    border: '0px', // Maintain no border when focused
                    outline: 'none', // Ensure no outline when focused
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
            >
              <Typography sx={{ p: 2 }}>
                PhishIntel Community Edition<br />
                Release Date: 2025-01-01<br />
                Version: 0.1.0
              </Typography>
            </Popover>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        open={open}
        onClose={handleToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((group) => (
            <Box key={group.group}>
              <Typography variant="subtitle2" color='text.secondary' sx={{ padding: '16px', fontWeight: 'bold' }}>
                {group.group}
              </Typography>
              {group.items.map((item) => (
                <ListItem
                  key={item.text}
                  component={NavLink} // Change to NavLink
                  to={item.path}
                  onClick={isMobile ? handleToggle : undefined}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? theme.palette.action.selected : 'transparent', // Highlight active item
                  })} // Active style
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
              <Divider />
            </Box>
          ))}
          {/* Outlined Button for Guide/Documentation */}
          <ListItem>
            <Button
              component={NavLink} // Change to NavLink
              to="#" // Update this path to your documentation or support page
              variant="outlined" // Keeping it outlined as per your preference
              sx={{
                justifyContent: 'flex-start',
                mt: 1,
                color: theme.palette.text.primary, // Customize color as needed
                textTransform: 'none', // Disable uppercase transformation
                width: '100%', // Make it full width
                padding: '12px', // Add some padding for a button-like feel
                borderRadius: '8px',
                borderColor: theme.palette.text.primary, // Ensures the border is visible
                '&:hover': {
                  backgroundColor: theme.palette.action.hover, // Optional: Add hover effect
                },
              }}
            >
              Guide and Documentation
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
