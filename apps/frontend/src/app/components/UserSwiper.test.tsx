import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserSwiper from "./UserSwiper";
import { User } from "@/types/user";
import * as api from "@/lib/api";

// Mock users
const userAlice: User = {
  id: 1,
  name: "Alice",
  age: 25,
  photoUrl: "alice.jpg",
};
const userBob: User = { id: 2, name: "Bob", age: 30, photoUrl: "bob.jpg" };

// Mock API
jest.mock("@/lib/api", () => ({
  getRandomUser: jest.fn(),
  sendAction: jest.fn(),
}));

describe("UserSwiper", () => {
  const loggedInUserId = 999;

  const clickLike = () => fireEvent.click(screen.getByTestId("like-btn"));
  const clickDislike = () => fireEvent.click(screen.getByTestId("dislike-btn"));
  const clickOkay = () => fireEvent.click(screen.getByTestId("match-okay-btn"));

  beforeEach(() => jest.resetAllMocks());

  it("renders the initial user", () => {
    render(
      <UserSwiper initialUser={userAlice} loggedInUserId={loggedInUserId} />
    );
    expect(screen.getByText(/Alice/i)).toBeInTheDocument();
  });

  it("shows 'No more users available.' when initialUser is null", () => {
    render(<UserSwiper initialUser={null} loggedInUserId={loggedInUserId} />);
    expect(screen.getByText(/No more users available/i)).toBeInTheDocument();
  });

  it("fetches next user on LIKE with no match", async () => {
    (api.getRandomUser as jest.Mock).mockResolvedValueOnce(userBob);
    (api.sendAction as jest.Mock).mockResolvedValueOnce({ match: false });

    render(
      <UserSwiper initialUser={userAlice} loggedInUserId={loggedInUserId} />
    );
    clickLike();

    expect(await screen.findByText(/Bob/i)).toBeInTheDocument();
  });

  it("fetches next user on DISLIKE", async () => {
    (api.getRandomUser as jest.Mock).mockResolvedValueOnce(userBob);
    (api.sendAction as jest.Mock).mockResolvedValueOnce({ match: false });

    render(
      <UserSwiper initialUser={userAlice} loggedInUserId={loggedInUserId} />
    );
    clickDislike();

    expect(await screen.findByText(/Bob/i)).toBeInTheDocument();
  });

  it("shows match popup on LIKE with match", async () => {
    (api.sendAction as jest.Mock).mockResolvedValueOnce({ match: true });

    render(
      <UserSwiper initialUser={userAlice} loggedInUserId={loggedInUserId} />
    );
    clickLike();

    expect(await screen.findByTestId("match-popup")).toBeInTheDocument();
  });

  it("hides match popup and fetches next user when 'Okay' clicked", async () => {
    (api.sendAction as jest.Mock).mockResolvedValueOnce({ match: true });
    (api.getRandomUser as jest.Mock).mockResolvedValueOnce(userBob);

    render(
      <UserSwiper initialUser={userAlice} loggedInUserId={loggedInUserId} />
    );
    clickLike();

    // Wait for popup
    expect(await screen.findByTestId("match-popup")).toBeInTheDocument();

    clickOkay();

    // Next user appears and popup is gone
    expect(await screen.findByText(/Bob/i)).toBeInTheDocument();
    expect(screen.queryByTestId("match-popup")).not.toBeInTheDocument();
  });

  it("shows 'No more users available.' if getRandomUser fails", async () => {
    (api.getRandomUser as jest.Mock).mockRejectedValueOnce(
      new Error("API error")
    );
    (api.sendAction as jest.Mock).mockResolvedValueOnce({ match: false });

    render(
      <UserSwiper initialUser={userAlice} loggedInUserId={loggedInUserId} />
    );
    clickLike();

    // expect(await screen.findByText(/No more users available/i)).toBeInTheDocument();
    expect(await screen.findByTestId("no-users")).toBeInTheDocument();
  });
});
