import LoginForm from "@/components/modules/auth/login-form";
import Card from "@/components/ui/card";
import { Center, Stack, Text } from "@chakra-ui/react";

function Home() {
  return (
    <Center height="100vh" bg="gray.100">
      <Card
        width="380px"
        header={
          <Stack gap="2">
            <Text fontSize="2xl" fontWeight="semibold" textAlign="center">
              Manejo de Frases
            </Text>
            <Text fontSize="sm" textAlign="center">
              Login para gestionar frases
            </Text>
          </Stack>
        }
      >
        <LoginForm />
      </Card>
    </Center>
  );
}

export default Home;
