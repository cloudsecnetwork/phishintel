// AIBuilder.js
import React, { useState } from 'react';
import { 
    Box, 
    Typography, 
    Card, 
    CardContent, 
    Grid, 
    TextField,
    Paper,
    IconButton,
    Tooltip,
    Divider,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import {
    AutoAwesome as AutoAwesomeIcon,
    Email as EmailIcon,
    ContentCopy as ContentCopyIcon
} from '@mui/icons-material';

const AIBuilder = () => {




    return (
        <Box sx={{ mt: 2 }}>
            {/* Hero Section */}
            <Card sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                mb: 3,
                position: 'relative',
                overflow: 'hidden'
            }}>
                <Box sx={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    zIndex: 1
                }} />
                <Box sx={{
                    position: 'absolute',
                    bottom: -30,
                    left: -30,
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)',
                    zIndex: 1
                }} />
                <CardContent sx={{ position: 'relative', zIndex: 2, p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AutoAwesomeIcon sx={{ fontSize: 48, mr: 2 }} />
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                                AI Email Builder
                            </Typography>
                            <Typography variant="body1" sx={{ opacity: 0.9 }}>
                                Coming Soon - Revolutionize your email campaigns with AI
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>



            {/* Interactive Demo Section */}
            <Card sx={{ mb: 4 }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                        Preview Example
                    </Typography>
                    
                    <Grid container spacing={4}>
                        {/* Left Column - Compact Input Parameters */}
                        <Grid item xs={12} md={5}>
                            <Typography variant="h6" sx={{ mb: 4 }}>
                                Example Parameters
                            </Typography>
                            
                            {/* First Row - 2 columns */}
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Target Audience</InputLabel>
                                        <Select
                                            defaultValue="general-employees"
                                            label="Target Audience"
                                        >
                                            <MenuItem value="it-staff">IT Staff</MenuItem>
                                            <MenuItem value="executives">Executives</MenuItem>
                                            <MenuItem value="finance">Finance</MenuItem>
                                            <MenuItem value="hr">HR</MenuItem>
                                            <MenuItem value="sales">Sales</MenuItem>
                                            <MenuItem value="general-employees">General</MenuItem>
                                            <MenuItem value="contractors">Contractors</MenuItem>
                                            <MenuItem value="new-hires">New Hires</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Objective</InputLabel>
                                        <Select
                                            defaultValue="initial-awareness"
                                            label="Objective"
                                        >
                                            <MenuItem value="initial-awareness">Initial Awareness</MenuItem>
                                            <MenuItem value="advanced-training">Advanced Training</MenuItem>
                                            <MenuItem value="compliance-training">Compliance</MenuItem>
                                            <MenuItem value="incident-response">Incident Response</MenuItem>
                                            <MenuItem value="social-engineering">Social Engineering</MenuItem>
                                            <MenuItem value="data-protection">Data Protection</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            
                            {/* Second Row - 2 columns */}
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Threat Type</InputLabel>
                                        <Select
                                            defaultValue="credential-harvesting"
                                            label="Threat Type"
                                        >
                                            <MenuItem value="credential-harvesting">Credential Harvesting</MenuItem>
                                            <MenuItem value="malware-distribution">Malware</MenuItem>
                                            <MenuItem value="business-email-compromise">BEC</MenuItem>
                                            <MenuItem value="social-engineering">Social Engineering</MenuItem>
                                            <MenuItem value="data-exfiltration">Data Exfiltration</MenuItem>
                                            <MenuItem value="ransomware-precursor">Ransomware</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Industry</InputLabel>
                                        <Select
                                            defaultValue="general"
                                            label="Industry"
                                        >
                                            <MenuItem value="general">General Business</MenuItem>
                                            <MenuItem value="healthcare">Healthcare</MenuItem>
                                            <MenuItem value="financial-services">Financial</MenuItem>
                                            <MenuItem value="technology">Technology</MenuItem>
                                            <MenuItem value="manufacturing">Manufacturing</MenuItem>
                                            <MenuItem value="government">Government</MenuItem>
                                            <MenuItem value="education">Education</MenuItem>
                                            <MenuItem value="retail">Retail</MenuItem>
                                            <MenuItem value="legal">Legal</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            
                            {/* Third Row - 2 columns */}
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Tone</InputLabel>
                                        <Select
                                            defaultValue="formal-corporate"
                                            label="Tone"
                                        >
                                            <MenuItem value="formal-corporate">Formal</MenuItem>
                                            <MenuItem value="urgent-time-sensitive">Urgent</MenuItem>
                                            <MenuItem value="friendly-collegial">Friendly</MenuItem>
                                            <MenuItem value="authoritative">Authoritative</MenuItem>
                                            <MenuItem value="technical">Technical</MenuItem>
                                            <MenuItem value="compliance-focused">Compliance</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Trigger</InputLabel>
                                        <Select
                                            defaultValue="none"
                                            label="Trigger"
                                        >
                                            <MenuItem value="none">None</MenuItem>
                                            <MenuItem value="tax-season">Tax Season</MenuItem>
                                            <MenuItem value="holidays">Holidays</MenuItem>
                                            <MenuItem value="year-end">Year-end</MenuItem>
                                            <MenuItem value="mergers-acquisitions">M&A</MenuItem>
                                            <MenuItem value="layoffs-restructuring">Layoffs</MenuItem>
                                            <MenuItem value="system-updates">System Updates</MenuItem>
                                            <MenuItem value="policy-changes">Policy Changes</MenuItem>
                                            <MenuItem value="cyber-threats">Cyber Threats</MenuItem>
                                            <MenuItem value="custom">Custom</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            
                            {/* Fourth Row - 2 columns */}
                            <Grid container spacing={2} sx={{ mb: 3 }}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Call-to-Action</InputLabel>
                                        <Select
                                            defaultValue="click-link"
                                            label="Call-to-Action"
                                        >
                                            <MenuItem value="click-link">Click Link</MenuItem>
                                            <MenuItem value="download-attachment">Download</MenuItem>
                                            <MenuItem value="reply-information">Reply</MenuItem>
                                            <MenuItem value="transfer-funds">Transfer</MenuItem>
                                            <MenuItem value="system-access">System Access</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                        <Typography variant="caption" color="text.secondary">
                                            Example parameters (feature coming soon)
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            
                            {/* Custom Details */}
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Custom Context & Details"
                                defaultValue="Create a credential harvesting email targeting IT staff, appearing to come from IT support asking for account verification due to security updates."
                                size="small"
                                sx={{ 
                                    '& .MuiInputBase-input': { 
                                        color: 'text.primary'
                                    }
                                }}
                            />
                        </Grid>
                        
                        {/* Right Column - Enhanced Example Output */}
                        <Grid item xs={12} md={7}>
                            <Typography variant="h6" sx={{ mb: 3 }}>
                                Example Output
                            </Typography>
                            <Paper sx={{ 
                                p: 4,
                                pt: 2,
                                background: '#ffffff',
                                border: '1px solid #e0e0e0',
                                borderRadius: 2,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                position: 'relative'
                            }}>
                                {/* Email Header */}
                                <Box sx={{ 
                                    borderBottom: '2px solid #f0f0f0', 
                                    pb: 1, 
                                    mb: 2,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2' }}>
                                            HR Update - Salary Increase Notification
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            From: hr@company.com • To: you@company.com
                                        </Typography>
                                    </Box>
                                    <Tooltip title="Example only - feature coming soon">
                                        <IconButton size="small" disabled>
                                            <ContentCopyIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                
                                {/* Email Content */}
                                <Box sx={{ lineHeight: 1.6 }}>
                                    <Typography variant="body1" sx={{ mb: 2 }}>
                                        Dear Valued Employee,
                                    </Typography>
                                    
                                    <Typography variant="body1" sx={{ mb: 2 }}>
                                        We are pleased to inform you that your annual salary review has been completed. Based on your excellent performance and contributions to the company, you have been approved for a salary increase.
                                    </Typography>
                                    
                                    <Typography variant="body1" sx={{ mb: 2 }}>
                                        To view your updated compensation details and access your new pay information, please log into the HR portal using the link below:
                                    </Typography>
                                    
                                    <Box sx={{ 
                                        background: '#f8f9fa', 
                                        p: 2, 
                                        borderRadius: 1, 
                                        border: '1px dashed #ccc',
                                        mb: 2,
                                        textAlign: 'center'
                                    }}>
                                        <Typography variant="body2" color="text.secondary">
                                            🔗 [VIEW SALARY UPDATE] - hr-portal.company.com/compensation
                                        </Typography>
                                    </Box>
                                    
                                    <Typography variant="body1" sx={{ mb: 2 }}>
                                        Please review your updated compensation package by close of business today. 
                                        The new rates will be effective from your next pay period.
                                    </Typography>
                                    
                                    <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic' }}>
                                        Best regards,<br/>
                                        Human Resources Team
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>


        </Box>
    );
};

export default AIBuilder;
