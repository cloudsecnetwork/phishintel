import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    IconButton,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Visibility as VisibilityIcon, HighlightOff as HighlightOffIcon } from '@mui/icons-material';
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

    const [responsiveColumns, setResponsiveColumns] = useState([]);

    useEffect(() => {
        const baseColumns = [
            { 
                field: 'name', 
                headerName: 'Name', 
                flex: isMobile ? 0.4 : 0.25,
                minWidth: isMobile ? 120 : 150,
                renderCell: (params) => {
                    const firstName = params.row.firstName || '';
                    const lastName = params.row.lastName || '';
                    const fullName = `${firstName} ${lastName}`.trim();
                    return (
                        <Typography sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            height: '100%',
                            width: '100%',
                            fontSize: 'inherit'
                        }}>
                            {fullName}
                        </Typography>
                    );
                }
            },
            { 
                field: 'email', 
                headerName: 'Email Address', 
                flex: isMobile ? 0.5 : 0.3,
                minWidth: isMobile ? 150 : 200
            },
            { 
                field: 'role', 
                headerName: 'Role', 
                flex: 0.2,
                minWidth: 100,
                hide: isMobile // Hide on mobile
            },
            { 
                field: 'country', 
                headerName: 'Country', 
                flex: 0.1,
                minWidth: 80,
                hide: isMobile || isTablet // Hide on mobile and tablet
            },
            {
                field: 'actions',
                headerName: 'Actions',
                flex: isMobile ? 0.1 : 0.15,
                minWidth: isMobile ? 80 : 100,
                sortable: false,
                renderCell: (params) => (
                    <Box sx={actionButtonsStyles}>
                        <IconButton 
                            color="primary" 
                            size="small"
                            onClick={() => onViewContact(params.row)}
                            title="View Details"
                        >
                            <VisibilityIcon />
                        </IconButton>
                        <IconButton 
                            color="error" 
                            size="small"
                            onClick={() => onDeleteContact(params.row._id)}
                            title="Delete Contact"
                        >
                            <HighlightOffIcon />
                        </IconButton>
                    </Box>
                ),
            },
        ];

        setResponsiveColumns(baseColumns);
    }, [isMobile, isTablet, isDesktop]);

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
            <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 3 }}>
                No contacts found for this audience.
            </Typography>
        );
    }

    return (
        <DataGrid
            rows={contacts}
            columns={responsiveColumns}
            getRowId={(row) => row._id}
            autoHeight
            sx={{
                ...dataGridStyles,
                '& .MuiDataGrid-cell': {
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                },
                '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#fafafa',
                    borderBottom: '2px solid rgba(224, 224, 224, 1)',
                },
            }}
        />
    );
};

export default ContactsDataGrid; 