"use client";
import { useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import UserCard from "./UserCard";
import { User } from "@/types/user";
import { fetchUsers, sendAction } from "@/lib/api";

interface UserSwiperProps {
  initialUser: User | null;
  loggedInUserId: number;
}

const UserSwiper: React.FC<UserSwiperProps> = ({
  initialUser,
  loggedInUserId,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(initialUser);
  const [seenUserIds, setSeenUserIds] = useState<Set<string | undefined>>(
    new Set([initialUser?.id])
  );
  const [isMatch, setIsMatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getNextUser = async () => {
    const users = await fetchUsers();
    const unseen = users.filter((u) => !seenUserIds.has(u.id));
    if (!unseen.length) {
      setCurrentUser(null);
      return;
    }
    const next = unseen[Math.floor(Math.random() * unseen.length)];
    setCurrentUser(next);
    setSeenUserIds((prev) => new Set(prev).add(next.id));
  };

  const handleAction = async (action: "LIKE" | "DISLIKE") => {
    if (!currentUser) return;
    setIsLoading(true);
    try {
      const result = await sendAction(loggedInUserId, currentUser.id, action);
      if (result.match) {
        setIsMatch(true);
      } else {
        await getNextUser();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleMatchOkay = () => {
    setIsMatch(false);
    getNextUser();
  };

  if (!currentUser) {
    return <Typography variant="h5">No more users available.</Typography>;
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
      <Box sx={{ position: "relative" }}>
        {" "}
        <UserCard
          user={currentUser}
          onLike={() => handleAction("LIKE")}
          onDislike={() => handleAction("DISLIKE")}
          isLoading={isLoading}
        />
        {isMatch && (
          <Paper
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              padding: 4,
              textAlign: "center",
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          >
            <Typography variant="h4">You got a match!</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              {currentUser.name}
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleMatchOkay}
            >
              Okay
            </Button>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default UserSwiper;
