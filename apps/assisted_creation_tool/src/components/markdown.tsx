import ReactMarkdown, { Components } from 'react-markdown';
import { Typography } from '@mui/material';

const components: Components = {
  h1: ({ children }) => (
    <Typography variant="h1" gutterBottom>
      {children}
    </Typography>
  ),
  h2: ({ children }) => (
    <Typography variant="h2" gutterBottom>
      {children}
    </Typography>
  ),
  h3: ({ children }) => (
    <Typography variant="h3" gutterBottom>
      {children}
    </Typography>
  ),
  h4: ({ children }) => (
    <Typography variant="h4" gutterBottom>
      {children}
    </Typography>
  ),
  h5: ({ children }) => (
    <Typography variant="h5" gutterBottom>
      {children}
    </Typography>
  ),
  h6: ({ children }) => (
    <Typography variant="h6" gutterBottom>
      {children}
    </Typography>
  ),
  p: ({ children }) => (
    <Typography variant="body1" gutterBottom>
      {children}
    </Typography>
  ),
  li: ({ children }) => (
    <Typography variant="body1" component={'li'} gutterBottom>
      {children}
    </Typography>
  ),
};

export const Markdown = ({ children }: { children: string }) => (
  <ReactMarkdown components={components}>{children}</ReactMarkdown>
);
