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
    Stack,
    Tooltip
} from '/material';
import { DataGrid } from '@mui/x-data-grid';
import { 
    Visibility as VisibilityIcon, 
    HighlightOff as HighlightOffIcon,
    Email as EmailIcon,
    Person as PersonIcon,
    Business as BusinessIcon,
    LocationOn as LocationIcon
} from '@mui/icons-material';
import { dataGridStyles, actionButtonsStyles, loadingContainerStyles } from '../utils/styles';

const ContactsDataGrid = ({ 
    contacts, 
    loading, 
    onViewContact, 
    onDeleteContact 
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    
    // Add window width state for continuous resizing
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [responsiveColumns, setResponsiveColumns] = useState([]);

    // Listen for window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Calculate responsive column widths based on actual window width
        const getColumnWidths = () => {
            if (windowWidth < 600) { // Mobile
                return {
                    name: { flex: 0.4, minWidth: 120 },
                    email: { flex: 0.5, minWidth: 150 },
                    role: { flex: 0, minWidth: 0, hide: true },
                    country: { flex: 0, minWidth: 0, hide: true },
                    actions: { flex: 0.1, minWidth: 80 }
                };
            } else if (windowWidth < 1024) { // Tablet
                return {
                    name: { flex: 0.25, minWidth: 150 },
                    email: { flex: 0.35, minWidth: 200 },
                    role: { flex: 0.25, minWidth: 100, hide: false },
                    country: { flex: 0, minWidth: 0, hide: true },
                    actions: { flex: 0.15, minWidth: 100 }
                };
            } else { // Desktop
                return {
                    name: { flex: 0.2, minWidth: 150 },
                    email: { flex: 0.3, minWidth: 200 },
                    role: { flex: 0.2, minWidth: 100, hide: false },
                    country: { flex: 0.15, minWidth: 80, hide: false },
                    actions: { flex: 0.15, minWidth: 100 }
                };
            }
        };

        const columnWidths = getColumnWidths();
        
        const baseColumns = [
            { 
                field: 'name', 
                headerName: 'Name', 
                flex: columnWidths.name.flex,
                minWidth: columnWidths.name.minWidth,
                hide: columnWidths.name.hide,
                renderCell: (params) => {
                    const firstName = params.row.firstName || '';
                    const lastName = params.row.lastName || '';
                    const fullName = `${firstName} ${lastName}`.trim();
                    return (
                        <Typography sx={{ 
                            fontSize: 'inherit',
                            fontWeight: 500,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}>
                            {fullName}
                        </Typography>
                    );
                }
            },
            { 
                field: 'email', 
                headerName: 'Email Address', 
                flex: columnWidths.email.flex,
                minWidth: columnWidths.email.minWidth,
                hide: columnWidths.email.hide,
                renderCell: (params) => (
                    <Typography sx={{ 
                        fontSize: 'inherit',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {params.value}
                    </Typography>
                )
            },
            { 
                field: 'role', 
                headerName: 'Role', 
                flex: columnWidths.role.flex,
                minWidth: columnWidths.role.minWidth,
                hide: columnWidths.role.hide,
                renderCell: (params) => (
                    <Typography sx={{ 
                        fontSize: 'inherit',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {params.value || 'N/A'}
                    </Typography>
                )
            },
            { 
                field: 'country', 
                headerName: 'Country', 
                flex: columnWidths.country.flex,
                minWidth: columnWidths.country.minWidth,
                hide: columnWidths.country.hide,
                renderCell: (params) => (
                    <Typography sx={{ 
                        fontSize: 'inherit',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {params.value || 'N/A'}
                    </Typography>
                )
            },
            {
                field: 'actions',
                headerName: 'Actions',
                flex: columnWidths.actions.flex,
                minWidth: columnWidths.actions.minWidth,
                hide: columnWidths.actions.hide,
                sortable: false,
                renderCell: (params) => (
                    <Box sx={actionButtonsStyles}>
                        <Tooltip title="View Details">
                            <IconButton 
                                color="primary" 
                                size="small"
                                onClick={() => onViewContact(params.row)}
                            >
                                <VisibilityIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Contact">
                            <IconButton 
                                color="error" 
                                size="small"
                                onClick={() => onDeleteContact(params.row._id)}
                            >
                                <HighlightOffIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                ),
            },
        ];

        setResponsiveColumns(baseColumns);
    }, [windowWidth, isMobile, isTablet, isDesktop]);

    // Mobile card view for better responsiveness
    const renderMobileCard = (contact) => (
        <Card 
            key={contact._id} 
            sx={{ 
                mb: 2, 
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                '&:hover': {
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s ease-in-out'
                }
            }}
        >
            <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            {`${contact.firstName || ''} ${contact.lastName || ''}`.trim() || 'Unnamed Contact'}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                            <EmailIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />
                            <Typography variant="body2" color="text.secondary" sx={{ 
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>
                                {contact.email}
                            </Typography>
                        </Stack>
                        {contact.role && (
                            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                                <BusinessIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />
                                <Typography variant="body2" color="text.secondary">
                                    {contact.role}
                                </Typography>
                            </Stack>
                        )}
                        {contact.country && (
                            <Stack direction="row" spacing={1}>
                                <LocationIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />
                                <Typography variant="body2" color="text.secondary">
                                    {contact.country}
                                </Typography>
                            </Stack>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="View Details">
                            <IconButton 
                                color="primary" 
                                size="small"
                                onClick={() => onViewContact(contact)}
                            >
                                <VisibilityIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Contact">
                            <IconButton 
                                color="error" 
                                size="small"
                                onClick={() => onDeleteContact(contact._id)}
                            >
                                <HighlightOffIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );

    if (loading) {
        return (
            <Box sx={loadingContainerStyles}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Loading Contacts...</Typography>
            </Box>
        );
    }

    if (contacts.length === 0) {
        return (
            <Box sx={{ 
                textAlign: 'center', 
                py: 4,
                backgroundColor: '#fafafa',
                borderRadius: 2,
                border: '1px dashed #ccc'
            }}>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    No contacts found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This audience doesn't have any contacts yet. Add some contacts to get started.
                </Typography>
            </Box>
        );
    }

    // Use card view for mobile devices
    if (isMobile) {
        return (
            <Box sx={{ mt: 2 }}>
                {contacts.map(renderMobileCard)}
            </Box>
        );
    }

    return (
        <Box sx={{ 
            width: '100%',
            overflow: 'hidden',
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            backgroundColor: '#fff'
        }}>
            <DataGrid
                rows={contacts}
                columns={responsiveColumns}
                getRowId={(row) => row._id}
                autoHeight
                disableRowSelectionOnClick
                sx={{
                    ...dataGridStyles,
                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid rgba(224, 224, 224, 1)',
                        padding: '8px 16px',
                        '&:focus': {
                            outline: 'none'
                        }
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#fafafa',
                        borderBottom: '2px solid rgba(224, 224, 224, 1)',
                        '& .MuiDataGrid-columnHeader': {
                            padding: '12px 16px'
                        }
                    },
                    '& .MuiDataGrid-row': {
                        '&:hover': {
                            backgroundColor: 'rgba(25, 118, 210, 0.04)'
                        }
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: '#fff'
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: '1px solid rgba(224, 224, 224, 1)',
                        backgroundColor: '#fafafa'
                    }
                }}
                componentsProps={{
                    pagination: {
                        labelRowsPerPage: 'Rows per page:',
                        labelDisplayedRows: ({ from, to, count }) => 
                            `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
                    }
                }}
            />
        </Box>
    );
};

export default ContactsDataGrid; 