import { ReactComponent as AudienceIcon } from '../assets/icons/audience.svg';
import { ReactComponent as EmailIcon } from '../assets/icons/email.svg';
import { ReactComponent as CampaignIcon } from '../assets/icons/campaign.svg';
import { ReactComponent as AiIcon } from '../assets/icons/ai.svg';
import { ReactComponent as SenderIcon } from '../assets/icons/sender.svg';
import { ReactComponent as AnalyticsIcon } from '../assets/icons/analytics.svg';

export const dashboardCard = [
    {
        id: '1',
        icon: <AudienceIcon style={{ width: '36px', height: '36px' }} />,
        title: 'Create Audience',
        description: 'Manage your contacts and target audience',
        route: '/console/audience/create',
    },
    {
        id: '2',
        icon: <AiIcon style={{ width: '36px', height: '36px' }} />,
        title: 'Template Builder',
        description: 'Design and create email templates using AI',
        route: '/console/templates?view=builder',
    },
    {
        id: '3',
        icon: <SenderIcon style={{ width: '36px', height: '36px' }} />,
        title: 'Setup SMTP',
        description: 'Configure sender profiles for emails',
        route: '/console/sender-profile/create',
    },
    {
        id: '4',
        icon: <EmailIcon style={{ width: '36px', height: '36px' }} />,
        title: 'Manage Templates',
        description: 'Manage and import HTML templates',
        route: '/console/templates',
    },
    {
        id: '5',
        icon: <CampaignIcon style={{ width: '36px', height: '36px' }} />,
        title: 'Start Campaign',
        description: 'Launch a phishing simulation campaign',
        route: '/console/campaign/create',
    },
    {
        id: '6',
        icon: <AnalyticsIcon style={{ width: '36px', height: '36px' }} />,
        title: 'View Campaigns',
        description: 'Track and inspect existing campaigns',
        route: '/console/campaign',
    },
];
