import { Box, Container, Typography, Paper, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Link } from 'react-router-dom';

const ErrorPage = () => (
  <Container
    maxWidth="md"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}
  >
    <Paper
      elevation={3}
      sx={{ padding: 4, textAlign: 'center', width: '100%', maxWidth: 600 }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <ErrorOutlineIcon color="error" sx={{ fontSize: 80 }} />
        <Typography variant="h3" component="h1" color="error" gutterBottom>
          Oops!
        </Typography>
        <Typography variant="h5" component="h2" color="textSecondary">
          We can't seem to find the page you're looking for.
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ marginBottom: 3 }}
        >
          The page might have been removed, had its name changed, or is
          temporarily unavailable.
        </Typography>
      </Box>

      <Button variant="contained" component={Link} sx={{ ml: 2 }} to="/">
        Go to Home
      </Button>
    </Paper>
  </Container>
);

export default ErrorPage;
