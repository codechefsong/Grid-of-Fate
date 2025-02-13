import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Game Board",
  description: "Game Board",
});

const GameBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default GameBoardLayout;
