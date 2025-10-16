'use client';

import {
  ButtonGroup,
  Heading,
  IconButton,
  Pagination,
  Stack,
  Table,
  Input,
  InputGroup,
  type TableRootProps,
  TableBody,
} from '@chakra-ui/react';
import {
  LeftOutlined,
  RightOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';


interface TableProps<T> extends TableRootProps {
  withSearch?: boolean;
  withPagination?: boolean;
  tableColumns: string[];
  label: string;
  data: T[];
  deleteHandler: (id: number) => void;
  editHandler: (id: number) => void;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AdminTable<T extends Record<string, any>>({
  withPagination = false,
  withSearch = false,
  tableColumns,
  label,
  data,
  deleteHandler,
  editHandler,
  ...props
}: TableProps<T>) {
  return (
    <Stack
      p={4}
      gap='5'
    >
      {withSearch && (
        <InputGroup
          w={'1/4'}
          startElementProps={{ ml: 4}}
          startElement={<SearchOutlined />}

        >
          <Input placeholder='Type to search...' />
        </InputGroup>
      )}
      <Heading size='xl'>{label}</Heading>
      <Table.Root
        size='md'
        {...props}
      >
        <Table.Header font={'bold'}>
          <Table.Row>
            {tableColumns?.map((column) => (
              <Table.ColumnHeader
                p={4}
                key={column}
              >
                {column}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <TableBody>
          {data?.map((item) => (
            <Table.Row
              fontSize={'md'}
              key={item.id}
            >
              {tableColumns?.map((column) => (
                <Table.Cell
                  p={2}
                  key={column}
                >
                  {column !== 'Actions' ? (
                    item[column.toLowerCase()]
                  ) : (
                    
                      <ButtonGroup>
                        <IconButton
                          colorPalette={'teal'}
                          onClick={() => editHandler(item.id)}
                        >
                          <EditOutlined />
                        </IconButton>
                        <IconButton
                          colorPalette={'red'} opacity={0.8}
                          onClick={() => deleteHandler(item.id)}
                        >
                          <DeleteOutlined />
                        </IconButton>
                      </ButtonGroup>
      
                  )}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </TableBody>
      </Table.Root>

      {withPagination && (
        <Pagination.Root
          count={data?.length * 3}
          pageSize={5}
          page={1}
        >
          <ButtonGroup
            variant='ghost'
            size='sm'
            wrap='wrap'
          >
            <Pagination.PrevTrigger asChild>
              <IconButton>
                <LeftOutlined />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(page) => (
                <IconButton variant={{ base: 'ghost', _selected: 'outline' }}>
                  {page.value}
                </IconButton>
              )}
            />

            <Pagination.NextTrigger asChild>
              <IconButton>
                <RightOutlined />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      )}
    </Stack>
  );
}
