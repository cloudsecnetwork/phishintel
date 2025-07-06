import React from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    IconButton
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Visibility as VisibilityIcon, HighlightOff as HighlightOffIcon } from '@mui/icons-material';

const ContactsDataGrid = ({ 
    contacts, 
    loading, 
    onViewContact, 
    onDeleteContact 
}) => {
    const columns = [
        { 
            field: 'name', 
            headerName: 'Name', 
            flex: 0.25,
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
        { field: 'email', headerName: 'Email Address', flex: 0.3 },
        { field: 'role', headerName: 'Role', flex: 0.2 },
        { field: 'country', headerName: 'Country', flex: 0.1 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.15,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{ 
                    display: 'flex', 
                    gap: 1, 
                    alignItems: 'center', 
                    height: '100%',
                    justifyContent: 'center'
                }}>
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

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
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
            columns={columns}
            getRowId={(row) => row._id}
            autoHeight
            sx={{
                bgcolor: '#fff',
                borderRadius: 2,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                p: 1,
                '& .MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 'bold',
                },
            }}
        />
    );
};

export default ContactsDataGrid; 