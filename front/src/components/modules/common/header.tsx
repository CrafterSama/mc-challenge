"use client";

import Link from "next/link";

import { getSession } from "@/utils/auth-cookie";
import { Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import UserInfo from "./user-info";

const Header = () => {
  const pathname = usePathname();
  const session = getSession();

  return (
    <Flex
      px={4}
      py={2}
      w="full"
      borderBottom={1}
      borderColor="gray.400"
      shadow="md"
    >
      <Flex
        width="full"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap="2"
      >
        <Flex direction="row" gap="4" alignItems="center">
          <Link href="/" passHref>
            <Flex gap="2" alignItems={"center"} justifyContent={"start"}>
              <Image src={"/mc-logo.png"} alt="logo" width={40} height={40} />
              <Text fontSize="sm" textAlign="left" fontWeight={"semibold"}>
                Shopping Cart
              </Text>
            </Flex>
          </Link>
          {pathname.includes("/dashboard") && (
            <Link href="/dashboard/products" passHref>
              <Text fontSize="sm" textAlign="left">
                Productos
              </Text>
            </Link>
          )}
        </Flex>
        <Flex
          direction="row"
          gap="4"
          justifySelf={"end"}
          alignItems="center"
          justifyContent={"between"}
        >
          {!session?.isAuthenticated ? (
            <Flex
              direction="row"
              gap="4"
              justifySelf={"end"}
              alignItems="center"
              justifyContent={"between"}
            >
              <Link href="/login" passHref>
                <Button
                  variant="ghost"
                  flex="row"
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={2}
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup" passHref>
                <Button
                  variant="ghost"
                  flex="row"
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={2}
                >
                  Registro
                </Button>
              </Link>
            </Flex>
          ) : (
            <UserInfo />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
