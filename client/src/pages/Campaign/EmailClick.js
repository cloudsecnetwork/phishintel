import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Button, Grid, IconButton, Alert, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { DataGrid } from '@mui/x-data-grid';
import useEmailClicks from '../../hooks/useEmailClicks';
import { useExport } from '../../hooks/useExport';
import { formatDataGridDate } from '../../utils/dateUtils';

const EmailClick = () => {
    const { id: campaignId } = useParams();  // Get the campaign ID from the URL params
    const { emailClicks, loading, error, getEmailClicksByCampaign, deleteEmailClick } = useEmailClicks();
    const { exportEmailClicks, loading: exportLoading, error: exportError } = useExport(); // Integrate useExport

    // Fetch email clicks for the specific campaign on component mount
    useEffect(() => {
        if (campaignId) {
            getEmailClicksByCampaign(campaignId);
        }
    }, [campaignId, getEmailClicksByCampaign]);

    const handleExport = () => {
        exportEmailClicks(campaignId); // Call the export function from useExport
    };

    const handleDelete = (emailClickId) => {
        deleteEmailClick(emailClickId);
    };

    const columns = [
        { field: 'email', headerName: 'Email', flex: 0.4 },
        { field: 'ipAddress', headerName: 'IP Address', flex: 0.3 },
        { field: 'device', headerName: 'Device', flex: 0.5 },
        { field: 'count', headerName: 'Count', flex: 0.1 },
        { 
            field: 'createdAt', 
            headerName: 'Date/Time', 
            flex: 0.3,
            valueGetter: (params) => formatDataGridDate(params.value)
        },
        {
            field: 'actions',
            headerName: 'Action',
            flex: 0.1,
            renderCell: (params) => (
                <IconButton
                    color="error"
                    onClick={() => handleDelete(params.row._id)}  // Specify _id for the row
                    size="small"
                >
                    <HighlightOffIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <Box>
            {/* Header and Export Button */}
            <Grid container spacing={2} sx={{ mb: 2}}>
                <Grid item xs={12} md={8}>
                    <Typography sx={{ m: 1, fontSize: 13 }} color="text.secondary">
                        View and manage tracking of users who clicked on phishing emails. Export data as needed.
                    </Typography>
                </Grid>
                {/* Export Button */}
                {/* Export Button */}
                {emailClicks.length > 0 && (
                    <Grid item xs={12} md={4}>
                        <Grid container justifyContent="flex-end">
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={handleExport} // Attach the export handler
                                disabled={exportLoading} // Disable while exporting
                            >
                                {exportLoading ? 'Exporting...' : 'Export Data'}
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Grid>

            {/* Display export errors if any */}
            {exportError && (
                <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                    {exportError}
                </Alert>
            )}

            {/* Display error, no data alert, or the table */}
            {error ? (
                <Alert severity="info" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            ) : loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                    <CircularProgress />
                    <Typography sx={{ ml: 2 }}>Loading email clicks...</Typography>
                </Box>
            ) : emailClicks.length === 0 ? (
                <Alert severity="info" sx={{ mt: 2 }}>
                    No data exists for this campaign.
                </Alert>
            ) : (
                <Box
                    sx={{
                        width: '100%',
                    }}>
                    <DataGrid
                        rows={emailClicks}
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
                </Box>
            )}
        </Box>
    );
};

export default EmailClick;
