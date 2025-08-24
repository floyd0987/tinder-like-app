import { Box } from "@mui/material";
import { fetchUsers } from "@/lib/api";
import UserSwiper from "@/app/components/UserSwiper";
import { User } from "@/types/user";

const fetchInitialUser = async (): Promise<User | null> => {
  const users = await fetchUsers();
  if (!users.length) return null;
  return users[Math.floor(Math.random() * users.length)];
};

const HomePage = async () => {
  const initialUser = await fetchInitialUser();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <UserSwiper initialUser={initialUser} loggedInUserId={1} />
    </Box>
  );
};

export default HomePage;
