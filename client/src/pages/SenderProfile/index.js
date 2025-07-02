import React from 'react';
import { Typography, Container, Box, Button, Grid, IconButton, Chip, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useSenderProfiles } from '../../hooks/useSenderProfiles';
import { useNavigate } from 'react-router-dom';

const SenderProfile = () => {
    const navigate = useNavigate();
    const { senderProfiles, loading, handleDelete } = useSenderProfiles();

    const handleCreateSenderProfile = () => {
        navigate('/console/sender-profile/create');
    };

    const smtpProviders = [
        { name: 'Google SMTP', link: 'https://support.google.com/mail/answer/7126229' },
        { name: 'Zoho', link: 'https://www.zoho.com/mail/help/zoho-smtp.html' },
        { name: 'Elastic Email', link: 'https://elasticemail.com/resources/settings/smtp' },
        { name: 'SendGrid', link: 'https://docs.sendgrid.com/for-developers/sending-email/getting-started-smtp' },
    ];

    const columns = [
        { field: 'senderName', headerName: 'Sender Name', flex: 1 },
        { field: 'host', headerName: 'Host', flex: 1 },
        { field: 'port', headerName: 'Port', flex: 0.5 },
        { field: 'email', headerName: 'Email/Username', flex: 1 },
        {
            field: 'secure',
            headerName: 'Secure',
            flex: 0.5,
            renderCell: (params) => (
                <Chip size='small'
                    label={params.value ? "true" : "false"}
                    color={params.value ? "success" : "warning"} // Use success for true and warning for false
                />
            ),
        }, {
            field: 'actions',
            headerName: 'Action',
            flex: 0.5,
            sortable: false,
            renderCell: (params) => (
                <IconButton color="error" onClick={() => handleDelete(params.row._id)}>
                    <HighlightOffIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: "#fafafa" }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Container maxWidth="lg" sx={{ flexGrow: 1, mt: '110px', mb: 2 }}>
                    <Grid container spacing={2}>
                        <Grid sx={{ pl: 2, pb: 2 }} xs={12} md={8} lg={8}>
                            <Typography variant="h5" color="primary">
                                Sender Profile
                            </Typography>
                            <Typography sx={{ fontSize: 13 }} color="text.secondary">
                                Manage and configure your sender profile SMTP information. You can use{' '}
                                {smtpProviders.map((provider, index) => (
                                    <React.Fragment key={provider.name}>
                                        <a href={provider.link} target="_blank" rel="noopener noreferrer">
                                            {provider.name}
                                        </a>
                                        {index < smtpProviders.length - 1 ? ', ' : ' '}
                                    </React.Fragment>
                                ))}
                                and other services.
                            </Typography>
                        </Grid>
                        <Grid sx={{ p: 2 }} xs={12} md={4} lg={4}>
                            <Grid container justifyContent="flex-end">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AddIcon />}
                                    onClick={handleCreateSenderProfile}
                                >
                                    Setup SMTP
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 8 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box sx={{ width: '100%', mt: 2 }}>
                            <DataGrid
                                rows={senderProfiles}
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
                </Container>
                <Footer />
            </Box>
        </Box>
    );
};

export default SenderProfile;