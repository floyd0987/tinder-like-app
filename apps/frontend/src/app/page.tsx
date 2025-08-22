import UserCard from "@/app/components/UserCard";

import { Box } from "@mui/material";

// Function to fetch a single profile from the backend
const fetchProfile = async () => {
  const response = await fetch("http://localhost:3001/api/v1/users");
  const users = await response.json();

  return users[0]; // Return the first profile
};

const HomePage = async () => {
  const initialProfile = await fetchProfile();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <UserCard initialProfile={initialProfile} />
    </Box>
  );
};

export default HomePage;
