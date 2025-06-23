'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

function ChakraProviders({ children }: { children: React.ReactNode }) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}

export default ChakraProviders;
