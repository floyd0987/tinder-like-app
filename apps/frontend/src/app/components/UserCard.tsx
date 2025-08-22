"use client";

import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import MatchNotification from "./MatchNotification";

interface Profile {
  id: string;
  name: string;
  age: number;
  photoUrl: string;
}

interface UserCardProps {
  initialProfile: Profile;
}

const UserCard: React.FC<UserCardProps> = ({ initialProfile }) => {
  const [currentProfile, setCurrentProfile] = useState<Profile>(initialProfile);
  const [isMatch, setIsMatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loggedInUserId = 1;

  const handleAction = async (action: "LIKE" | "DISLIKE") => {
    setIsLoading(true);
    const response = await fetch("http://localhost:3001/api/v1/actions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: loggedInUserId,
        recipientId: currentProfile.id,
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
    const response = await fetch("http://localhost:3001/api/v1/users");
    const users = await response.json();

    const others = users.filter((u: { id: string; }) => u.id !== currentProfile.id);
    const randomIndex = Math.floor(Math.random() * others.length);

    setCurrentProfile(others[randomIndex] || null);
  };

  const handleOkay = () => {
    setIsMatch(false);
    getNextProfile();
  };

  if (!currentProfile) {
    return (
      <Typography variant="h5">Sorry, no more users available.</Typography>
    );
  }

  if (isLoading) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {isMatch ? (
        <MatchNotification onOkay={handleOkay} />
      ) : (
        <Card sx={{ maxWidth: 345, position: "relative" }}>
          <CardMedia
            component="img"
            height="400"
            image={currentProfile.photoUrl}
            alt={`${currentProfile.name} profile`}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {currentProfile.name}, {currentProfile.age}, {currentProfile.id}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              padding: "16px",
            }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => handleAction("LIKE")}
            >
              Like
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleAction("DISLIKE")}
            >
              Dislike
            </Button>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default UserCard;
