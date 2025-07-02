import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, Button, Grid, TextField, MenuItem, CircularProgress, LinearProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // For redirection after starting the campaign
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { ReactComponent as SuccessIcon } from '../../assets/icons/success.svg';
import { useResources } from '../../hooks/useResources';
import { usePrepareCampaign, useStartCampaign } from '../../hooks/useCampaign';

const StartCampaign = () => {
    const [campaignName, setCampaignName] = useState('');
    const [selectedAudience, setSelectedAudience] = useState('');
    const [selectedSenderProfile, setSelectedSenderProfile] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [emailConcurrency, setEmailConcurrency] = useState('');
    const [timeDelay, setTimeDelay] = useState('');
    const [isPreparing, setIsPreparing] = useState(false);
    const [preparedCampaignId, setPreparedCampaignId] = useState(null);
    const [campaignPrepared, setCampaignPrepared] = useState(false); // New state for campaign preparation status

    const navigate = useNavigate(); // To handle redirection

    const { audiences, senderProfiles, templates, loading: resourceLoading, error: resourceError } = useResources();
    const { prepareCampaign, error: prepareError, success: prepareSuccess } = usePrepareCampaign();
    const { startCampaign, loading: startLoading, error: startError, success: startSuccess } = useStartCampaign();

    const handleContinue = async (e) => {
        e.preventDefault();
        setIsPreparing(true); // Move to preparation view
        setCampaignPrepared(false); // Ensure this is false when re-preparing the campaign

        const campaignData = {
            name: campaignName,
            audience: selectedAudience,
            senderProfile: selectedSenderProfile,
            template: selectedTemplate,
            emailConcurrency,
            timeDelay,
        };

        const response = await prepareCampaign(campaignData);
        console.log('Campaign prepared successfully:', response.data);
        console.log('response object:', response);

        if (response?.success) {
            setPreparedCampaignId(response.data._id); // Store campaign ID from response
            setCampaignPrepared(true); // Mark campaign as prepared when the response is successful
            setIsPreparing(false); // Reset isPreparing when successful
        } else {
            setIsPreparing(false); // Reset state on failure
            setCampaignPrepared(false); // Keep the campaignPrepared state false on failure
        }
    };

    // Function to handle campaign start
    const handleLaunch = async () => {
        if (preparedCampaignId) {
            const startResponse = await startCampaign(preparedCampaignId); // Start campaign only if ID is set
            if (startResponse && startResponse.success) { // Ensure startResponse is not null
                // Redirect to the detailed campaign page upon success
                navigate(`/console/campaign/${preparedCampaignId}`);
            } else if (startResponse && !startResponse.success) {
                console.error("Failed to start campaign:", startResponse.message || "Unknown error");
            }
        } else {
            console.error("Campaign ID is not set. Cannot start campaign.");
        }
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: "#fafafa" }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {campaignPrepared ? ( // Show "Your campaign is ready" view if campaign is prepared
                    <Container maxWidth="lg" sx={{ flexGrow: 1, mt: '110px', mb: 2, textAlign: 'center' }}>
                        <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
                            Campaign Preparation Complete
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, px: 4 }}>
                            Congratulations! Your campaign has been successfully prepared and is now ready.
                            You can proceed launch your phishing campaign.
                        </Typography>

                        {/* Success Icon */}
                        <Box
                            sx={{
                                width: '84px',
                                height: '84px',
                                margin: '0 auto',
                                display: 'block'
                            }}
                        >
                            <SuccessIcon style={{ width: '100%', height: '100%' }} />
                        </Box>

                        {/* Button */}
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ mt: 4 }}
                            onClick={handleLaunch}
                        >
                            {startLoading ? <CircularProgress size={24} /> : "Launch Campaign"}
                        </Button>

                        {startError && (
                            <Box sx={{ mt: 2 }}>
                                <Alert severity="error">{startError || "An error occurred while starting the campaign."}</Alert>
                            </Box>
                        )}
                    </Container>
                ) : isPreparing ? (
                    <Container maxWidth="lg" sx={{ flexGrow: 1, mt: '110px', mb: 2, textAlign: 'center' }}>
                        <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
                            Preparing Your Campaign                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            Please hold on while we set up your campaign.
                            This process may take a few moments, and we'll notify you as soon as everything is ready.
                        </Typography>
                        {isPreparing && (
                            <CircularProgress sx={{ mb: 4 }} />
                        )}
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                            Setting up your campaign list...
                        </Typography>

                        {prepareError && (
                            <Box sx={{ mb: 2 }}>
                                <Alert severity="error">{prepareError || "An error occurred while preparing the campaign."}</Alert>
                            </Box>
                        )}

                        {startError && (
                            <Box sx={{ mt: 2 }}>
                                <Alert severity="error">{startError}</Alert>
                            </Box>
                        )}
                    </Container>
                ) : (
                    <Container maxWidth="lg" sx={{ flexGrow: 1, mt: '110px', mb: 2 }}>
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid sx={{ pl: 2, pb: 2 }} xs={12} md={8} lg={8}>
                                <Typography variant="h5" color="primary">
                                    Start a New Campaign
                                </Typography>
                                <Typography sx={{ fontSize: 13 }} color="text.secondary">
                                    Create and launch your email campaigns by selecting the appropriate audience, sender profile, and email template.
                                </Typography>
                            </Grid>
                        </Grid>

                        {resourceLoading && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                                <CircularProgress />
                            </Box>
                        )}

                        {resourceError && (
                            <Box sx={{ mb: 2 }}>
                                <Alert severity="error">{resourceError || "An error occurred while loading resources."}</Alert>
                            </Box>
                        )}

                        {!resourceLoading && !resourceError && !campaignPrepared && (
                            <form onSubmit={handleContinue}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Campaign Name"
                                            variant="outlined"
                                            value={campaignName}
                                            onChange={(e) => setCampaignName(e.target.value)}
                                            required
                                            helperText="Provide a name for your campaign. This will help you identify it later."
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Select Audience"
                                            value={selectedAudience}
                                            onChange={(e) => setSelectedAudience(e.target.value)}
                                            required
                                            helperText="Choose the audience you want to target with this campaign."
                                        >
                                            {audiences.map((audience) => (
                                                <MenuItem key={audience._id} value={audience._id}>
                                                    {audience.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Select Sender Profile"
                                            value={selectedSenderProfile}
                                            onChange={(e) => setSelectedSenderProfile(e.target.value)}
                                            required
                                            helperText="Select the profile that will appear as the sender of the campaign emails."
                                        >
                                            {senderProfiles.map((profile) => (
                                                <MenuItem key={profile._id} value={profile._id}>
                                                    {profile.senderName} {profile.email ? `(${profile.email})` : ""}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Select Email Template"
                                            value={selectedTemplate}
                                            onChange={(e) => setSelectedTemplate(e.target.value)}
                                            required
                                            helperText="Select a pre-designed email template for this campaign."
                                        >
                                            <MenuItem value="ai-generated">AI Generated Content</MenuItem>
                                            {templates.map((template) => (
                                                <MenuItem key={template._id} value={template._id}>
                                                    {template.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Email Concurrency"
                                            value={emailConcurrency}
                                            onChange={(e) => setEmailConcurrency(e.target.value)}
                                            required
                                            helperText="Select the number of emails to send concurrently."
                                        >
                                            {[1, 2, 5].map((value) => (
                                                <MenuItem key={value} value={value}>
                                                    {value}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Time Delay (seconds)"
                                            value={timeDelay}
                                            onChange={(e) => setTimeDelay(e.target.value)}
                                            required
                                            helperText="Specify the time delay between email batches in seconds."
                                        >
                                            {[0, 5, 10, 30].map((value) => (
                                                <MenuItem key={value} value={value}>
                                                    {value}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>

                                <Grid container justifyContent="flex-start" sx={{ mt: 3 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Continue
                                    </Button>
                                </Grid>
                            </form>
                        )}

                        {prepareError && (
                            <Box sx={{ mt: 2, mb: 2 }}>
                                <Alert severity="error">{prepareError}</Alert>
                            </Box>
                        )}
                    </Container>
                )}
                <Footer />
            </Box>
        </Box>
    );
};

export default StartCampaign;
