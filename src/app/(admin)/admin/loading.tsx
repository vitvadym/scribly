import { Spinner, Center } from '@chakra-ui/react';
export default function Loading() {
  return (
    <Center h={'2/3'}>
      <Spinner
        borderWidth={4}
        color={'teal.500'}
        size={'xl'}
      />
    </Center>
  );
}
