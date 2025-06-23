import SignupForm from "@/components/modules/auth/signup-form";
import Card from "@/components/ui/card";
import { Center, Stack, Text } from "@chakra-ui/react";

function Signup() {
  return (
    <Center height="100vh" bg="gray.100">
      <Card
        width="380px"
        header={
          <Stack gap="2">
            <Text fontSize="2xl" fontWeight="semibold" textAlign="center">
              Shopping Cart
            </Text>
            <Text fontSize="sm" textAlign="center">
              Registro de Usuarios
            </Text>
          </Stack>
        }
      >
        <SignupForm />
      </Card>
    </Center>
  );
}

export default Signup;
