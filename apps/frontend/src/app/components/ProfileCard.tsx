'use client';

import { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import MatchNotification from './MatchNotification';

interface Profile {
  id: string;
  name: string;
  age: number;
  photoUrl: string;
}

interface ProfileCardProps {
  initialProfile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ initialProfile }) => {
  const [currentProfile, setCurrentProfile] = useState<Profile>(initialProfile);
  const [isMatch, setIsMatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (action: 'LIKE' | 'DISLIKE') => {
    setIsLoading(true);
    const response = await fetch('http://localhost:3001/api/v1/actions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        actorId: 'your-hardcoded-user-id',
        targetId: currentProfile.id,
        action,
      }),
    });
    const result = await response.json();
    setIsMatch(result.match);

    if (!result.match) {
      await getNextProfile();
    }
    setIsLoading(false);
  };

  const getNextProfile = async () => {
    // In a real scenario, this would fetch the next profile from a queue.
    // For this demo, we'll just fetch all profiles and move to the next one.
    const response = await fetch('http://localhost:3001/api/v1/profiles');
    const profiles = await response.json();
    const nextProfile = profiles.find(p => p.id !== currentProfile.id) || null;
    setCurrentProfile(nextProfile);
  };

  const handleOkay = () => {
    setIsMatch(false);
    getNextProfile();
  };
  
  if (!currentProfile) {
    return <Typography variant="h5">Sorry, no more profiles available.</Typography>;
  }

  if (isLoading) {
    return <Typography variant="h5">Loading...</Typography>;
  }
  
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {isMatch ? (
        <MatchNotification onOkay={handleOkay} />
      ) : (
        <Card sx={{ maxWidth: 345, position: 'relative' }}>
          <CardMedia
            component="img"
            height="400"
            image={currentProfile.photoUrl}
            alt={`${currentProfile.name} profile`}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {currentProfile.name}, {currentProfile.age}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: '16px' }}>
            <Button variant="contained" color="success" onClick={() => handleAction('LIKE')}>
              Like
            </Button>
            <Button variant="contained" color="error" onClick={() => handleAction('DISLIKE')}>
              Dislike
            </Button>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default ProfileCard;