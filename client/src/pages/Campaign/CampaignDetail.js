import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Typography, Container, Box, Grid, Tabs, Tab, CircularProgress,
    Alert, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, Button, IconButton, Menu, MenuItem
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import EmailClick from './EmailClick';
import Submission from './Submission';
import CampaignDetailsCard from './CampaignDetailsCard';
import { useGetCampaign, useStartCampaign, useResendFailedEmails, useArchiveCampaign, useReactivateCampaign, useDeleteCampaign } from '../../hooks/useCampaign';

const CampaignDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);  // State for confirmation dialog
    const [openArchiveDialog, setOpenArchiveDialog] = useState(false);  // State for archive confirmation dialog
    const [openReactivateDialog, setOpenReactivateDialog] = useState(false);  // State for reactivate confirmation dialog

    const { getCampaign, campaign, setCampaign, loading, error } = useGetCampaign();
    const { deleteCampaign, loading: deleteLoading, success: deleteSuccess, error: deleteError } = useDeleteCampaign();
    const { startCampaign, loading: startLoading, error: startError, success: startSuccess } = useStartCampaign();
    const { resendFailedEmails, loading: resendLoading, error: resendError, success: resendSuccess } = useResendFailedEmails();
    const { archiveCampaign, loading: archiveLoading, error: archiveError, success: archiveSuccess } = useArchiveCampaign();
    const { reactivateCampaign, loading: reactivateLoading, error: reactivateError, success: reactivateSuccess } = useReactivateCampaign();

    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const isMenuOpen = Boolean(menuAnchorEl);

    // Fetch campaign data only if id is defined
    useEffect(() => {
        if (id) {
            getCampaign(id);
        }
    }, [id, getCampaign]);

    // Redirect after successful delete
    useEffect(() => {
        if (deleteSuccess) {
            navigate('/console/campaign');
        }
    }, [deleteSuccess, navigate]);

    const handleMenuOpen = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };


    // Function to handle campaign start
    const handleLaunchCampaign = async () => {
        if (id) {
            try {
                const response = await startCampaign(id); // Start campaign only if ID is set
                // Ensure response exists before accessing response.success
                if (response && response.success) {
                    // Redirect to the detailed campaign page upon success
                    navigate(`/console/campaign/${id}`);
                    window.location.reload();  // Reload the page to fetch updated data
                } else {
                    console.error("Failed to start campaign:", response?.message || "Unknown error");
                }
            } catch (error) {
                console.error("Error starting campaign:", error.message);
            }
        } else {
            console.error("Campaign ID is not set. Cannot launch campaign");
        }
    };

    const handleResendFailedEmails = async () => {
        if (id) {
            try {
                const response = await resendFailedEmails(id);
                if (response && response.success) {
                    console.log('Resend Failed Emails initiated successfully.');
                } else {
                    console.error('Failed to resend emails:', response?.message || 'Unknown error');
                }
            } catch (error) {
                console.error('Error in resending emails:', error.message);
            } finally {
                handleMenuClose();
            }
        }
    };

    // Confirm Archive Campaign
    const handleConfirmArchive = async () => {
        setOpenArchiveDialog(false);
        if (id) {
            try {
                const response = await archiveCampaign(id, setCampaign);
                if (response && response.success) {
                    console.log('Campaign archived successfully.');
                    navigate(`/console/campaign/${id}`); // Redirect back to the detailed campaign route
                    // window.location.reload();
                } else {
                    console.error('Failed to archive campaign:', response?.message || 'Unknown error');
                }
            } catch (error) {
                console.error('Error archiving campaign:', error.message);
            }
        }
    };

    // Confirm Reactivate Campaign
    const handleConfirmReactivate = async () => {
        setOpenReactivateDialog(false);
        if (id) {
            try {
                const response = await reactivateCampaign(id, setCampaign);
                if (response && response.success) {
                    console.log('Campaign reactivated successfully.');
                    navigate(`/console/campaign/${id}`); // Redirect back to the detailed campaign route
                    // window.location.reload();
                } else {
                    console.error('Failed to reactivate campaign:', response?.message || 'Unknown error');
                }
            } catch (error) {
                console.error('Error reactivating campaign:', error.message);
            }
        }
    };

    // Open dialogs
    const handleDeleteCampaign = () => setOpenDeleteDialog(true);
    const handleOpenArchiveDialog = () => setOpenArchiveDialog(true);
    const handleOpenReactivateDialog = () => setOpenReactivateDialog(true);

    // Close dialogs
    const handleCancelDelete = () => setOpenDeleteDialog(false);
    const handleCloseArchiveDialog = () => setOpenArchiveDialog(false);
    const handleCloseReactivateDialog = () => setOpenReactivateDialog(false);

    const handleConfirmDelete = () => {
        setOpenDeleteDialog(false);  // Close the dialog
        if (id) {
            deleteCampaign(id);
        }
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: "#f0f4f7" }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Container maxWidth="lg" sx={{ flexGrow: 1, mt: '96px', mb: 2 }}>

                    {/* Main Campaign Details Content */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                        <Box sx={{ pl: 2, pb: 2 }}>
                            <Typography 
                                sx={{ 
                                    mb: 1, 
                                    fontWeight: 500,
                                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontSize: { xs: '1.2rem', md: '1.8rem' }
                                }} 
                                variant="h4" 
                                color="primary"
                            >
                                Campaign Details
                            </Typography>
                            <Typography sx={{ fontSize: 13 }} color="text.secondary">
                                View and manage your campaign details, track progress, and analyze results.
                            </Typography>
                        </Box>

                        {/* More Button */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton
                                aria-label="more options"
                                aria-controls="campaign-options-menu"
                                aria-haspopup="true"
                                onClick={handleMenuOpen}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="campaign-options-menu"
                                anchorEl={menuAnchorEl}
                                open={isMenuOpen}
                                onClose={handleMenuClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem
                                    onClick={handleResendFailedEmails}
                                    disabled={campaign?.status !== 'completed'}
                                >
                                    Resend Failed Emails
                                </MenuItem>
                                <MenuItem
                                    onClick={handleOpenArchiveDialog}
                                    disabled={campaign?.status !== 'completed'}
                                >
                                    Archive Campaign
                                </MenuItem><MenuItem
                                    onClick={handleOpenReactivateDialog}
                                    disabled={campaign?.status !== 'archived'}
                                >
                                    Reactivate Campaign
                                </MenuItem>
                                <MenuItem onClick={handleDeleteCampaign} disabled={deleteLoading}>
                                    Delete Campaign
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>

                    {archiveError && <Alert sx={{ mb: 2 }} severity="error">{archiveError}</Alert>}
                    {archiveSuccess && <Alert sx={{ mb: 2 }} severity="success">Campaign archived successfully!</Alert>}

                    {reactivateError && <Alert sx={{ mb: 2 }} severity="error">{reactivateError}</Alert>}
                    {reactivateSuccess && <Alert sx={{ mb: 2 }} severity="success">Campaign reactivated successfully!</Alert>}

                    {deleteError && <Alert sx={{ mb: 2 }} severity="warning">{deleteError}</Alert>}

                    {resendError && <Alert sx={{ mb: 2 }} severity="warning">{resendError}</Alert>}
                    {resendSuccess && <Alert sx={{ mb: 2 }} severity="success">Resend failed emails initiated successfully!</Alert>}

                    {!id ? (
                        <Alert severity="error">Error: Campaign ID is required</Alert>
                    ) : loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Alert severity="error">{error}</Alert>
                    ) : (
                        <>
                            <CampaignDetailsCard campaign={campaign} />

                            {(campaign?.status === 'draft' || campaign?.status === 'scheduled') ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleLaunchCampaign} // Add your function to handle launching
                                >
                                    Launch Campaign
                                </Button>
                            ) : (
                                <>
                                    {/* Tabs Section for Email Click and Submission */}
                                    <Box sx={{ mb: 4 }}>
                                        <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
                                            <Tab label="Email Clicks" />
                                            <Tab label="Submissions" />
                                        </Tabs>

                                        {/* Render Tab Content */}
                                        {activeTab === 0 && (
                                            <Box sx={{ mt: 2 }}>
                                                <EmailClick />
                                            </Box>
                                        )}
                                        {activeTab === 1 && (
                                            <Box sx={{ mt: 2 }}>
                                                <Submission />
                                            </Box>
                                        )}
                                    </Box>
                                </>
                            )}
                        </>
                    )}
                </Container>

                {/* Confirmation Dialog */}
                <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this campaign?
                            This action will permanently delete all associated data, including submissions and email clicks.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={handleCancelDelete} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmDelete} color="error">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openArchiveDialog} onClose={handleCloseArchiveDialog}>
                    <DialogTitle>Confirm Archive</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to archive this campaign?
                            Archiving will update the campaign status to archived, making it unmodifiable.
                            Additionally, all links in successful emails sent for this campaign will be disabled.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={handleCloseArchiveDialog} color="warning">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmArchive} color="primary">
                            Archive
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openReactivateDialog} onClose={handleCloseReactivateDialog}>
                    <DialogTitle>Confirm Reactivation</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Do you want to proceed with reactivating this campaign?
                            Reactivating will re-enable all disabled links in successful emails.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={handleCloseReactivateDialog} color="warning">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmReactivate} color="primary">
                            Reactivate
                        </Button>
                    </DialogActions>
                </Dialog>

                <Footer />
            </Box>
        </Box>
    );
};

export default CampaignDetail;
