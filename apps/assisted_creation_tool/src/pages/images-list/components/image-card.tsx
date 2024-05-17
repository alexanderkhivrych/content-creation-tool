import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Card,
} from '@mui/material';
import { Link } from 'react-router-dom';

export const ImageCard = ({
  author,
  id,
  url,
}: {
  id: string;
  author: string;
  url: string;
}) => {
  return (
    <Card>
      <CardActionArea
        component={Link}
        to={`/edit/${id}`}
        aria-label={`Edit image by ${author}`}
      >
        <CardMedia
          component="img"
          height="200"
          image={url}
          alt={`Image by ${author}`}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {`Author: ${author}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
