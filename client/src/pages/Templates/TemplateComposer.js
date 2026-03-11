import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
    Alert,
    CircularProgress,
} from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useTemplates } from '../../hooks/useTemplates';
import { marked } from 'marked';
import MDEditor, { commands } from '@uiw/react-md-editor';
import DOMPurify from 'dompurify';

const PLACEHOLDER_GROUPS = [
    {
        label: 'Personal',
        items: [
            { key: 'firstName', label: 'First name' },
            { key: 'lastName', label: 'Last name' },
            { key: 'email', label: 'Email' },
            { key: 'phoneNumber', label: 'Phone' },
        ],
    },
    {
        label: 'Organization',
        items: [
            { key: 'role', label: 'Role' },
            { key: 'department', label: 'Department' },
            { key: 'company', label: 'Company' },
            { key: 'country', label: 'Country' },
        ],
    },
    {
        label: 'Template',
        items: [
            { key: 'link', label: 'Link' },
        ],
    },
];

const SAMPLE_DATA = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    link: 'https://example.com/signin',
    phoneNumber: '+1 555-0100',
    role: 'Manager',
    country: 'United States',
    department: 'Engineering',
    company: 'Acme Corp',
};

const DEFAULT_CSS = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    primaryColor: '#333333',
};

const placeholderCommand = {
    name: 'placeholder',
    keyCommand: 'group',
    groupName: 'placeholder',
    buttonProps: { 'aria-label': 'Insert placeholder', title: 'Insert variable' },
    icon: (
        <span style={{ fontSize: 12, fontFamily: 'monospace', fontWeight: 700, letterSpacing: -0.5 }}>
            {'{{ }}'}
        </span>
    ),
    children: (handle) => (
        <div style={{ padding: '4px 0', minWidth: 230, maxHeight: 340, overflowY: 'auto' }}>
            {PLACEHOLDER_GROUPS.map((group, gi) => (
                <div key={group.label}>
                    {gi > 0 && <div style={{ borderTop: '1px solid #eee', margin: '4px 0' }} />}
                    <div
                        style={{
                            fontSize: 10,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: 0.8,
                            color: '#999',
                            padding: '8px 12px 4px',
                        }}
                    >
                        {group.label}
                    </div>
                    {group.items.map(({ key, label }) => (
                        <button
                            key={key}
                            type="button"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                padding: '6px 12px',
                                border: 'none',
                                background: 'none',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontSize: 13,
                                color: '#333',
                                borderRadius: 4,
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f0f7ff'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                            onClick={() => {
                                handle.textApi?.replaceSelection(`{{ ${key} }}`);
                                handle.close();
                            }}
                        >
                            <span>{label}</span>
                            <code
                                style={{
                                    fontSize: 11,
                                    color: '#aaa',
                                    fontFamily: 'monospace',
                                    marginLeft: 12,
                                }}
                            >
                                {`{{${key}}}`}
                            </code>
                        </button>
                    ))}
                </div>
            ))}
        </div>
    ),
};

const EDITOR_COMMANDS = [
    commands.bold,
    commands.italic,
    commands.strikethrough,
    commands.divider,
    commands.title,
    commands.divider,
    commands.unorderedListCommand,
    commands.orderedListCommand,
    commands.checkedListCommand,
    commands.divider,
    commands.link,
    commands.quote,
    commands.code,
    commands.codeBlock,
    commands.divider,
    placeholderCommand,
];

const STARTER_TEMPLATE = `Hi **{{ firstName }}**,

We noticed a recent sign-in attempt on your **{{ company }}** account ({{ email }}) from {{ country }}. If this wasn't you, please secure your account immediately.

[Verify My Identity]({{ link }})

If you have any questions, reach out to the **{{ department }}** team.

Thanks,
**{{ company }}** Security Team
`;

async function computePreviewHtml(markdown, cssSettings, sampleData) {
    if (!markdown || !markdown.trim()) return '';
    const rawHtml = await marked.parse(markdown);
    const html = typeof rawHtml === 'string' ? rawHtml : '';
    const withPlaceholders = html.replace(
        /\{\{?\s*(\w+)\s*\}?\}/g,
        (_, key) => sampleData[key] ?? `{{${key}}}`,
    );
    const fontFamily = cssSettings?.fontFamily || 'Arial, sans-serif';
    const fontSize = cssSettings?.fontSize || '16px';
    const primaryColor = cssSettings?.primaryColor || '#1976d2';
    return `<div style="font-family:${fontFamily};font-size:${fontSize};line-height:1.6;color:#333"><style>a{color:${primaryColor};text-decoration:underline;}</style>${withPlaceholders}</div>`;
}

export default function TemplateComposer() {
    const theme = useTheme();
    const isNarrow = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const { createTemplate, updateTemplate, getTemplateById } = useTemplates();
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState(null);
    const [submitError, setSubmitError] = useState(null);
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [markdownContent, setMarkdownContent] = useState(isEdit ? '' : STARTER_TEMPLATE);
    const [cssSettings, setCssSettings] = useState({ ...DEFAULT_CSS });
    const [activeTab, setActiveTab] = useState(0);
    const [previewHtml, setPreviewHtml] = useState('');

    useEffect(() => {
        let cancelled = false;
        computePreviewHtml(markdownContent, cssSettings, SAMPLE_DATA).then((html) => {
            if (!cancelled) setPreviewHtml(DOMPurify.sanitize(html));
        });
        return () => { cancelled = true; };
    }, [markdownContent, cssSettings]);

    useEffect(() => {
        if (isEdit && id) {
            getTemplateById(id).then((res) => {
                if (res.success && res.data) {
                    const t = res.data;
                    if (t.sourceFormat && t.sourceFormat !== 'markdown') {
                        navigate('/console/templates');
                        return;
                    }
                    setName(t.name || '');
                    setSubject(t.subject || '');
                    setMarkdownContent(
                        t.sourceFormat === 'markdown' && t.markdownContent
                            ? t.markdownContent
                            : '',
                    );
                    if (t.cssSettings && typeof t.cssSettings === 'object') {
                        setCssSettings((prev) => ({ ...prev, ...t.cssSettings }));
                    }
                } else {
                    setLoadError(res.message || 'Failed to load template');
                }
            });
        }
    }, [isEdit, id, getTemplateById, navigate]);

    const handleSave = async () => {
        setSubmitError(null);
        if (!name.trim() || !subject.trim()) {
            setSubmitError('Name and subject are required.');
            return;
        }
        setLoading(true);
        const payload = {
            name: name.trim(),
            subject: subject.trim(),
            type: 'editor',
            sourceFormat: 'markdown',
            markdownContent: markdownContent.trim() || '',
            cssSettings,
        };
        const res = isEdit
            ? await updateTemplate(id, payload)
            : await createTemplate(payload);
        setLoading(false);
        if (res.success) {
            navigate('/console/templates');
        } else {
            setSubmitError(res.message || 'Save failed');
        }
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafafa' }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Container maxWidth="xl" sx={{ flexGrow: 1, mt: '110px', mb: 2 }}>
                    {/* Header */}
                    <Box sx={{ mb: 2 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 0.5,
                                fontWeight: 600,
                                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            {isEdit ? 'Edit Email Template' : 'New Email Template'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Compose your email using the rich text editor. Insert
                            placeholders and preview before saving.
                        </Typography>
                    </Box>

                    {loadError && (
                        <Alert severity="error" onClose={() => setLoadError(null)} sx={{ mb: 2 }}>
                            {loadError}
                        </Alert>
                    )}
                    {submitError && (
                        <Alert severity="error" onClose={() => setSubmitError(null)} sx={{ mb: 2 }}>
                            {submitError}
                        </Alert>
                    )}

                    {/* Name + Subject */}
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Template name"
                                variant="outlined"
                                size="small"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                sx={{
                                    '& .MuiInputLabel-root .MuiInputLabel-asterisk': {
                                        color: 'error.main',
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email subject"
                                variant="outlined"
                                size="small"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                                sx={{
                                    '& .MuiInputLabel-root .MuiInputLabel-asterisk': {
                                        color: 'error.main',
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>

                    {/* Narrow screens: Write / Preview tabs */}
                    {isNarrow && (
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 0 }}>
                            {['Write', 'Preview'].map((tab, idx) => (
                                <Button
                                    key={tab}
                                    size="small"
                                    onClick={() => setActiveTab(idx)}
                                    sx={{
                                        mr: 1,
                                        fontWeight: activeTab === idx ? 600 : 400,
                                        borderBottom: activeTab === idx ? '2px solid' : 'none',
                                        borderColor: 'primary.main',
                                        borderRadius: 0,
                                        textTransform: 'none',
                                    }}
                                >
                                    {tab}
                                </Button>
                            ))}
                        </Box>
                    )}

                    {/* Editor + Preview split pane */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: isNarrow ? 'column' : 'row',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            height: isNarrow ? 'auto' : 520,
                            minHeight: 400,
                            mb: 3,
                        }}
                    >
                        {/* Editor pane */}
                        <Box
                            data-color-mode="light"
                            sx={{
                                flex: 1,
                                display: isNarrow && activeTab === 1 ? 'none' : 'flex',
                                flexDirection: 'column',
                                minWidth: 0,
                                '& .w-md-editor': {
                                    border: 'none',
                                    borderRadius: 0,
                                    boxShadow: 'none',
                                    flex: 1,
                                },
                                '& .w-md-editor-toolbar': {
                                    borderBottom: '1px solid',
                                    borderColor: 'divider',
                                    backgroundColor: '#fafafa',
                                },
                                '& .w-md-editor-content': {
                                    flex: 1,
                                },
                                '& .w-md-editor-text-input': {
                                    fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace !important',
                                    fontSize: '0.875rem !important',
                                },
                                '& .w-md-editor-text-pre > code': {
                                    fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace !important',
                                    fontSize: '0.875rem !important',
                                },
                            }}
                        >
                            <MDEditor
                                value={markdownContent}
                                onChange={(val) => setMarkdownContent(val || '')}
                                preview="edit"
                                commands={EDITOR_COMMANDS}
                                extraCommands={[]}
                                height="100%"
                                visibleDragbar={false}
                            />
                        </Box>

                        {/* Divider between panes */}
                        {!isNarrow && (
                            <Divider orientation="vertical" flexItem />
                        )}

                        {/* Preview pane */}
                        <Box
                            sx={{
                                flex: 1,
                                display: isNarrow && activeTab === 0 ? 'none' : 'flex',
                                flexDirection: 'column',
                                minWidth: 0,
                                backgroundColor: '#fff',
                            }}
                        >
                            <Box
                                sx={{ p: 3, flex: 1, overflow: 'auto' }}
                                dangerouslySetInnerHTML={{
                                    __html:
                                        previewHtml ||
                                        '<p style="color:#bbb;font-style:italic">Start typing to see a live preview&hellip;</p>',
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Actions */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Save template'}
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/console/templates')}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Container>
                <Footer />
            </Box>
        </Box>
    );
}
