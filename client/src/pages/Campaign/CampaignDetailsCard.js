import React from 'react';
import { Grid, Card, CardContent, Typography, Divider, Chip } from '@mui/material';
import { Campaign, Email, Mouse, BarChart, Person, Group } from '@mui/icons-material';

const CampaignDetailsCard = ({ campaign }) => {
    return (
        <Card sx={{ backgroundColor: "#ffffff", borderRadius: 2, mb: 4 }}>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Campaign color="primary" />
                            </Grid>
                            <Grid sx={{ maxWidth: '85%' }} item>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Campaign Name
                                </Typography>
                                <Typography
                                    sx={{
                                        display: 'block',
                                        maxWidth: '100%',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        fontWeight: 500
                                    }}
                                    variant="h6">
                                    {campaign?.name}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 2 }} />

                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Email color="primary" />
                            </Grid>
                            <Grid sx={{ maxWidth: '85%' }} item>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Status
                                </Typography>
                                <Chip
                                    size="small"
                                    label={campaign?.status}
                                    color={
                                        campaign?.status === 'completed'
                                            ? 'success'
                                            : campaign?.status === 'ongoing'
                                                ? 'primary'
                                                : campaign?.status === 'scheduled'
                                                    ? 'warning'
                                                    : campaign?.status === 'archived'
                                                        ? 'default'
                                                        : 'default'
                                    }
                                />
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 2 }} />

                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Mouse color="primary" />
                            </Grid>
                            <Grid sx={{ maxWidth: '85%' }} item>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Emails Delivered
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                    {campaign?.emailsDelivered || 0} / {campaign?.totalRecipients || 0}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Person color="primary" />
                            </Grid>
                            <Grid sx={{ maxWidth: '85%' }} item>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Sender Profile
                                </Typography>
                                <Typography
                                    sx={{
                                        display: 'block',
                                        maxWidth: '100%',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        fontWeight: 500
                                    }}
                                    variant="h6">
                                    {campaign?.senderProfile?.senderName}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 2 }} />

                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Group color="primary" />
                            </Grid>
                            <Grid sx={{ maxWidth: '85%' }} item>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Audience
                                </Typography>
                                <Typography
                                    sx={{
                                        display: 'block',
                                        maxWidth: '100%',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        fontWeight: 500
                                    }}
                                    variant="h6">
                                    {campaign?.audience?.name}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 2 }} />

                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Mouse color="primary" />
                            </Grid>
                            <Grid sx={{ maxWidth: '85%' }} item>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Email Clicks
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                    {campaign?.totalEmailClicks || 0}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Email color="primary" />
                            </Grid>
                            <Grid sx={{ maxWidth: '85%' }} item>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Email Template
                                </Typography>
                                <Typography
                                    sx={{
                                        display: 'block',
                                        maxWidth: '100%',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        fontWeight: 500
                                    }}
                                    variant="h6">
                                    {campaign?.template?.name || 'NA'}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 2 }} />

                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Email color="primary" />
                            </Grid>
                            <Grid sx={{ maxWidth: '85%' }} item>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Phishing Site
                                </Typography>
                                <Typography
                                    sx={{
                                        display: 'block',
                                        maxWidth: '100%',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        fontWeight: 500
                                    }}
                                    variant="h6">
                                    Microsoft 365 Login
                                </Typography>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 2 }} />

                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <BarChart color="primary" />
                            </Grid>
                            <Grid sx={{ maxWidth: '85%' }} item>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Submissions
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                    {campaign?.totalSubmissions || 0}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CampaignDetailsCard;
