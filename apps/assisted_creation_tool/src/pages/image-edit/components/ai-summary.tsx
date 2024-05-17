import { useState, useCallback, useEffect, useRef } from 'react';
import { CircularProgress, Grid, IconButton, Typography } from '@mui/material';
import { Science, VolumeOff, VolumeUp } from '@mui/icons-material';
import { Markdown } from '../../../components/markdown';

type AiSummaryType = {
  aiSummary?: string;
  isLoading: boolean;
};

export const AiSummary = ({ aiSummary, isLoading }: AiSummaryType) => {
  const [isAudioInProgress, setAudioInProgress] = useState(false);
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);

  const toggleTextToSpeech = useCallback(() => {
    if (aiSummary && utterance.current) {
      utterance.current = null;
      speechSynthesis.cancel();

      setAudioInProgress(false);
    } else {
      setAudioInProgress(true);

      utterance.current = new SpeechSynthesisUtterance(aiSummary);

      speechSynthesis.speak(utterance.current);
    }
  }, [aiSummary]);

  useEffect(() => {
    if (utterance.current && isAudioInProgress) {
      utterance.current.onend = () => {
        setAudioInProgress(false);
      };
    }
  }, [isAudioInProgress]);

  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  return (
    <>
      {isLoading && (
        <>
          <CircularProgress size={24} />
          <Typography>Loading AI analysis...</Typography>
        </>
      )}

      {aiSummary && (
        <Grid>
          <Typography variant="h4">
            <Science /> AI Analysis
          </Typography>
          <Markdown>{aiSummary}</Markdown>
          <IconButton color="primary" onClick={toggleTextToSpeech}>
            {isAudioInProgress ? <VolumeOff /> : <VolumeUp />}
          </IconButton>
        </Grid>
      )}
    </>
  );
};
