import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    IconButton,
    useTheme,
    useMediaQuery,
    Card,
    CardContent,
    Tooltip,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import { 
    HighlightOff as HighlightOffIcon,
    Email as EmailIcon,
    Settings as SettingsIcon,
    Security as SecurityIcon
} from '@mui/icons-material';
import { formatDataGridDate } from '../utils/dateUtils';

const ResponsiveSenderProfilesTable = ({ 
    senderProfiles, 
    loading, 
    onDeleteProfile 
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    
    // Add window width state for continuous resizing
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // No pagination or search needed for sender profiles

    // Listen for window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Use all profiles directly since no pagination is needed
    const profiles = senderProfiles;

    // Helper functions for table rendering
    const getColumnWidth = (column) => {
        // Desktop column widths
        const widths = {
            senderName: '25%',
            host: '25%',
            port: '10%',
            email: '20%',
            secure: '10%',
            created: '10%',
            actions: '10%'
        };
        return widths[column];
    };

    const getColumnHeader = (column) => {
        const headers = {
            senderName: 'Name',
            host: 'SMTP Host',
            port: 'Port',
            email: 'Email/Username',
            secure: 'Secure',
            created: 'Created',
            actions: 'Actions'
        };
        return headers[column];
    };

    const renderCell = (profile, column) => {
        switch (column) {
            case 'senderName':
                return (
                    <Typography sx={{ 
                        fontWeight: 500,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {profile.senderName || 'Unnamed Profile'}
                    </Typography>
                );
            case 'host':
                return (
                    <Typography sx={{ 
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontFamily: 'monospace',
                        fontSize: '0.875rem'
                    }}>
                        {profile.host}
                    </Typography>
                );
            case 'port':
                return (
                    <Typography sx={{ 
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontFamily: 'monospace',
                        fontSize: '0.875rem'
                    }}>
                        {profile.port}
                    </Typography>
                );
            case 'email':
                return (
                    <Typography sx={{ 
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {profile.email || 'N/A'}
                    </Typography>
                );
            case 'secure':
                return (
                    <Chip 
                        size="small"
                        label={profile.secure ? "SSL/TLS" : "None"}
                        color={profile.secure ? "success" : "default"}
                        sx={{ fontSize: '0.75rem' }}
                    />
                );
            case 'created':
                return (
                    <Typography sx={{ 
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: '0.875rem',
                        color: 'text.secondary'
                    }}>
                        {formatDataGridDate(profile.createdAt)}
                    </Typography>
                );
            case 'actions':
                return (
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <Tooltip title="Delete Profile">
                            <IconButton 
                                color="error" 
                                size="small"
                                onClick={() => onDeleteProfile(profile._id)}
                            >
                                <HighlightOffIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                );
            default:
                return null;
        }
    };

    // Mobile compact card view
    const renderMobileCards = () => (
        <Box sx={{ mt: 2 }}>
            {profiles.map((profile, index) => (
                <Card 
                    key={profile._id} 
                    sx={{ 
                        borderRadius: 0,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        borderBottom: index < profiles.length - 1 ? '1px solid rgba(224, 224, 224, 0.5)' : 'none',
                        '&:hover': {
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            transform: 'translateY(-1px)',
                            transition: 'all 0.2s ease-in-out'
                        }
                    }}
                >
                    <CardContent sx={{ p: 2, pb: 1.5 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                {/* Sender Name */}
                                <Typography sx={{ 
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    mb: 0.5
                                }}>
                                    {profile.senderName || 'Unnamed Profile'}
                                </Typography>
                                
                                {/* Host and Port */}
                                <Typography sx={{ 
                                    fontSize: '0.875rem',
                                    color: 'text.secondary',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    mb: 0.5,
                                    fontFamily: 'monospace'
                                }}>
                                    {profile.host}:{profile.port}
                                </Typography>

                                {/* Email and Security */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                    {profile.email && (
                                        <Typography sx={{ 
                                            fontSize: '0.75rem',
                                            color: 'text.secondary',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {profile.email}
                                        </Typography>
                                    )}
                                    <Chip 
                                        size="small"
                                        label={profile.secure ? "SSL/TLS" : "None"}
                                        color={profile.secure ? "success" : "default"}
                                        sx={{ fontSize: '0.625rem', height: 20 }}
                                    />
                                </Box>
                            </Box>
                            
                            {/* Actions */}
                            <Box sx={{ display: 'flex', gap: 0.5, ml: 1 }}>
                                <Tooltip title="Delete Profile">
                                    <IconButton 
                                        color="error" 
                                        size="small"
                                        onClick={() => onDeleteProfile(profile._id)}
                                    >
                                        <HighlightOffIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );

    // No search or pagination controls needed

    if (loading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '300px',
                flexDirection: 'column',
                gap: 2
            }}>
                <CircularProgress />
                <Typography>Loading Sender Profiles...</Typography>
            </Box>
        );
    }

    if (senderProfiles.length === 0) {
        return (
            <Box sx={{ 
                textAlign: 'center', 
                py: 4,
                backgroundColor: '#fafafa',
                borderRadius: 2,
                border: '1px dashed #ccc'
            }}>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    No sender profiles found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    You haven't created any sender profiles yet. Create your first SMTP configuration to get started.
                </Typography>
            </Box>
        );
    }

    // Use compact card view for mobile and tablet devices (up to 1024px)
    if (windowWidth < 1024) {
        return (
            <Box>
                {renderMobileCards()}
            </Box>
        );
    }

    // Desktop table configuration
    const visibleColumns = ['senderName', 'host', 'port', 'email', 'secure', 'created', 'actions'];

    // Use custom table for desktop only (1024px and above)
    return (
        <Box>
            <Box sx={{ 
                width: '100%',
                overflow: 'auto',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                backgroundColor: '#fff',
                border: '1px solid rgba(0,0,0,0.08)'
            }}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#fafafa' }}>
                                {visibleColumns.map((column) => (
                                    <TableCell
                                        key={column}
                                        sx={{
                                            width: getColumnWidth(column),
                                            fontWeight: 600,
                                            color: 'text.primary',
                                            borderBottom: '2px solid rgba(224, 224, 224, 1)',
                                            padding: '16px',
                                            fontSize: '0.8rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}
                                    >
                                        {getColumnHeader(column)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {profiles.map((profile) => (
                                <TableRow
                                    key={profile._id}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'rgba(25, 118, 210, 0.04)',
                                            transition: 'background-color 0.2s ease-in-out'
                                        },
                                        '&:last-child td': {
                                            border: 0
                                        }
                                    }}
                                >
                                    {visibleColumns.map((column) => (
                                        <TableCell
                                            key={column}
                                            sx={{
                                                width: getColumnWidth(column),
                                                padding: '12px 16px',
                                                borderBottom: '1px solid rgba(224, 224, 224, 1)',
                                                fontSize: '0.875rem'
                                            }}
                                        >
                                            {renderCell(profile, column)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default ResponsiveSenderProfilesTable; 