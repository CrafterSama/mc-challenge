import AuthDirective from "@/components/modules/auth/auth-directive";
import { Container, Flex, Link, Text } from "@chakra-ui/react";

const UsersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthDirective>
      <Flex direction="column" w="full" h="screen">
        <Container maxW="container.xl">{children}</Container>
        <Flex
          direction="row"
          gap="4"
          width="full"
          justifyContent="center"
          position="relative"
          wrap="wrap"
          marginTop="4"
        >
          <Text fontSize="sm" textAlign="center" color="gray.400">
            Creado por{" "}
            <Link
              bottom={1}
              color="blue.500"
              href="https://www.linkedin.com/in/julmerolivero"
            >
              Julmer Olivero
            </Link>
          </Text>
        </Flex>
      </Flex>
    </AuthDirective>
  );
};

export default UsersLayout;
