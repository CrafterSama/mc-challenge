import { Button, Flex, Menu, Portal, Text } from "@chakra-ui/react";

import { Avatar } from "@/components/ui/avatar";
import { toaster } from "@/components/ui/toaster";
import useAppStoreContext from "@/state-management/users-app-global-state";
import { AuthSession } from "@/types/common";
import { getSession } from "@/utils/auth-cookie";
import { useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";

const UserInfo = () => {
  const session: AuthSession | null = getSession();
  const router = useRouter();
  const { auth } = useAppStoreContext();

  const onLogout = () => {
    auth.logout();
    router.push("/");
    toaster.create({
      title: "Success",
      description: "Sesión cerrada exitosamente",
      type: "success",
    });
  };

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="ghost">
          <Avatar name={session?.auth?.user?.[0]?.username} size="sm" />
          <Text fontSize="sm" color="gray.500">
            {session?.auth?.user?.[0]?.username}
          </Text>
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="user">
              <Flex
                direction="column"
                alignItems="start"
                justifyContent="start"
              >
                <Text fontSize="base" fontWeight="semibold">
                  email:
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {session?.auth?.user?.[0]?.email}
                </Text>
              </Flex>
            </Menu.Item>
            <Menu.Item value="logout" onClick={onLogout}>
              <LuLogOut />
              <Text fontSize="xs" color="gray.500">
                Logout
              </Text>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default UserInfo;
