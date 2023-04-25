import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
export const BackTable = ({ data }) => {
  return (
    <Table variant="simple" width="100%" minWidth="600px">
      <Thead>
        <Tr>
          <Th>Column 1</Th>
          <Th>Column 2</Th>
          <Th>Column 3</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row, index) => (
          <Tr key={index}>
            <Td>{row.column1}</Td>
            <Td>{row.column2}</Td>
            <Td>{row.column3}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
