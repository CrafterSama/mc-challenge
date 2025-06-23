import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import { Flex, IconButton } from "@chakra-ui/react";

type PaginationProps = {
  data: any[];
  currentPage: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  totalPages: number;
};

const Pagination = ({
  data,
  currentPage,
  setCurrentPage,
  totalPages,
}: PaginationProps) => {
  return (
    <Flex
      width="full"
      direction="row"
      padding={4}
      border={1}
      borderColor="gray.400"
      shadow="sm"
      background={"white"}
      justifyContent={data?.length > 0 ? "space-between" : "end"}
      alignItems="center"
    >
      {data?.length > 0 && (
        <Flex direction="row" gap={2}>
          Página {currentPage} de {totalPages}
        </Flex>
      )}
      <Flex gap={2}>
        <IconButton
          size="xs"
          bg="#fff"
          borderRadius="md"
          borderColor="blue.500"
          color="blue.500"
          _disabled={{
            bg: "blue.100",
          }}
          disabled={currentPage === 1 || data?.length === 0}
          onClick={() => setCurrentPage((prev: number) => prev - 1)}
        >
          <LuChevronLeft />
        </IconButton>
        <IconButton
          size="xs"
          bg="#fff"
          borderRadius="md"
          borderColor="blue.500"
          color="blue.500"
          _disabled={{
            bg: "blue.100",
          }}
          disabled={currentPage === totalPages || data?.length === 0}
          onClick={() => setCurrentPage((prev: number) => prev + 1)}
        >
          <LuChevronRight />
        </IconButton>
      </Flex>
    </Flex>
  );
};

export default Pagination;
