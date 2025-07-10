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
    Divider
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
                                Input Parameters
                            </Typography>
                            
                            {/* First Row - 2 columns */}
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Target Audience"
                                        defaultValue="general-employees"
                                        size="small"
                                        sx={{ 
                                            '& .MuiSelect-select': { 
                                                color: 'text.primary',
                                                cursor: 'pointer'
                                            },
                                            '&:hover': {
                                                '& .MuiSelect-select': {
                                                    backgroundColor: 'rgba(25, 118, 210, 0.04)'
                                                }
                                            },
                                            '& .MuiMenu-paper': {
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(0,0,0,0.08)'
                                            },
                                            '& .MuiMenuItem-root': {
                                                padding: '8px 16px',
                                                fontSize: '0.875rem'
                                            }
                                        }}
                                    >
                                        <option value="it-staff">IT Staff</option>
                                        <option value="executives">Executives</option>
                                        <option value="finance">Finance</option>
                                        <option value="hr">HR</option>
                                        <option value="sales">Sales</option>
                                        <option value="general-employees">General</option>
                                        <option value="contractors">Contractors</option>
                                        <option value="new-hires">New Hires</option>
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Objective"
                                        defaultValue="initial-awareness"
                                        size="small"
                                        sx={{ 
                                            '& .MuiSelect-select': { 
                                                color: 'text.primary',
                                                cursor: 'pointer'
                                            },
                                            '&:hover': {
                                                '& .MuiSelect-select': {
                                                    backgroundColor: 'rgba(25, 118, 210, 0.04)'
                                                }
                                            },
                                            '& .MuiMenu-paper': {
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(0,0,0,0.08)'
                                            },
                                            '& .MuiMenuItem-root': {
                                                padding: '8px 16px',
                                                fontSize: '0.875rem'
                                            }
                                        }}
                                    >
                                        <option value="initial-awareness">Initial Awareness</option>
                                        <option value="advanced-training">Advanced Training</option>
                                        <option value="compliance-training">Compliance</option>
                                        <option value="incident-response">Incident Response</option>
                                        <option value="social-engineering">Social Engineering</option>
                                        <option value="data-protection">Data Protection</option>
                                    </TextField>
                                </Grid>
                            </Grid>
                            
                            {/* Second Row - 2 columns */}
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Threat Type"
                                        defaultValue="credential-harvesting"
                                        size="small"
                                        sx={{ 
                                            '& .MuiSelect-select': { 
                                                color: 'text.primary',
                                                cursor: 'pointer'
                                            },
                                            '&:hover': {
                                                '& .MuiSelect-select': {
                                                    backgroundColor: 'rgba(25, 118, 210, 0.04)'
                                                }
                                            },
                                            '& .MuiMenu-paper': {
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(0,0,0,0.08)'
                                            },
                                            '& .MuiMenuItem-root': {
                                                padding: '8px 16px',
                                                fontSize: '0.875rem'
                                            }
                                        }}
                                    >
                                        <option value="credential-harvesting">Credential Harvesting</option>
                                        <option value="malware-distribution">Malware</option>
                                        <option value="business-email-compromise">BEC</option>
                                        <option value="social-engineering">Social Engineering</option>
                                        <option value="data-exfiltration">Data Exfiltration</option>
                                        <option value="ransomware-precursor">Ransomware</option>
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Industry"
                                        defaultValue="general"
                                        size="small"
                                        sx={{ 
                                            '& .MuiSelect-select': { 
                                                color: 'text.primary',
                                                cursor: 'pointer'
                                            },
                                            '&:hover': {
                                                '& .MuiSelect-select': {
                                                    backgroundColor: 'rgba(25, 118, 210, 0.04)'
                                                }
                                            },
                                            '& .MuiMenu-paper': {
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(0,0,0,0.08)'
                                            },
                                            '& .MuiMenuItem-root': {
                                                padding: '8px 16px',
                                                fontSize: '0.875rem'
                                            }
                                        }}
                                    >
                                        <option value="general">General Business</option>
                                        <option value="healthcare">Healthcare</option>
                                        <option value="financial-services">Financial</option>
                                        <option value="technology">Technology</option>
                                        <option value="manufacturing">Manufacturing</option>
                                        <option value="government">Government</option>
                                        <option value="education">Education</option>
                                        <option value="retail">Retail</option>
                                        <option value="legal">Legal</option>
                                    </TextField>
                                </Grid>
                            </Grid>
                            
                            {/* Third Row - 2 columns */}
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Tone"
                                        defaultValue="formal-corporate"
                                        size="small"
                                        sx={{ 
                                            '& .MuiSelect-select': { 
                                                color: 'text.primary',
                                                cursor: 'pointer'
                                            },
                                            '&:hover': {
                                                '& .MuiSelect-select': {
                                                    backgroundColor: 'rgba(25, 118, 210, 0.04)'
                                                }
                                            },
                                            '& .MuiMenu-paper': {
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(0,0,0,0.08)'
                                            },
                                            '& .MuiMenuItem-root': {
                                                padding: '8px 16px',
                                                fontSize: '0.875rem'
                                            }
                                        }}
                                    >
                                        <option value="formal-corporate">Formal</option>
                                        <option value="urgent-time-sensitive">Urgent</option>
                                        <option value="friendly-collegial">Friendly</option>
                                        <option value="authoritative">Authoritative</option>
                                        <option value="technical">Technical</option>
                                        <option value="compliance-focused">Compliance</option>
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Trigger"
                                        defaultValue="none"
                                        size="small"
                                        sx={{ 
                                            '& .MuiSelect-select': { 
                                                color: 'text.primary',
                                                cursor: 'pointer'
                                            },
                                            '&:hover': {
                                                '& .MuiSelect-select': {
                                                    backgroundColor: 'rgba(25, 118, 210, 0.04)'
                                                }
                                            },
                                            '& .MuiMenu-paper': {
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(0,0,0,0.08)'
                                            },
                                            '& .MuiMenuItem-root': {
                                                padding: '8px 16px',
                                                fontSize: '0.875rem'
                                            }
                                        }}
                                    >
                                        <option value="none">None</option>
                                        <option value="tax-season">Tax Season</option>
                                        <option value="holidays">Holidays</option>
                                        <option value="year-end">Year-end</option>
                                        <option value="mergers-acquisitions">M&A</option>
                                        <option value="layoffs-restructuring">Layoffs</option>
                                        <option value="system-updates">System Updates</option>
                                        <option value="policy-changes">Policy Changes</option>
                                        <option value="cyber-threats">Cyber Threats</option>
                                        <option value="custom">Custom</option>
                                    </TextField>
                                </Grid>
                            </Grid>
                            
                            {/* Fourth Row - 2 columns */}
                            <Grid container spacing={2} sx={{ mb: 3 }}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Call-to-Action"
                                        defaultValue="click-link"
                                        size="small"
                                        sx={{ 
                                            '& .MuiSelect-select': { 
                                                color: 'text.primary',
                                                cursor: 'pointer'
                                            },
                                            '&:hover': {
                                                '& .MuiSelect-select': {
                                                    backgroundColor: 'rgba(25, 118, 210, 0.04)'
                                                }
                                            },
                                            '& .MuiMenu-paper': {
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(0,0,0,0.08)'
                                            },
                                            '& .MuiMenuItem-root': {
                                                padding: '8px 16px',
                                                fontSize: '0.875rem'
                                            }
                                        }}
                                    >
                                        <option value="click-link">Click Link</option>
                                        <option value="download-attachment">Download</option>
                                        <option value="reply-information">Reply</option>
                                        <option value="transfer-funds">Transfer</option>
                                        <option value="system-access">System Access</option>
                                    </TextField>
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
