import ProfileCard from '@/app/components/ProfileCard';

import { Box } from '@mui/material';

// Function to fetch a single profile from the backend
const fetchProfile = async () => {
  // We'll hardcode the API call here for simplicity, but in a real app,
  // this would be a more robust fetch from your backend.
  const response = await fetch('http://localhost:3001/api/v1/profiles');
  
  const profiles = await response.json();
  return profiles[0]; // Return the first profile
};

const HomePage = async () => {
  const initialProfile = await fetchProfile();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ProfileCard initialProfile={initialProfile} />
    </Box>
  );
};

export default HomePage;