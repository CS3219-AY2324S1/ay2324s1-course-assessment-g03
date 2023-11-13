import { keyframes } from "@chakra-ui/react";

export const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); opacity: 0.8 }
  100% { transform: scale(1); }
`;
