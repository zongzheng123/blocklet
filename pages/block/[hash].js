import { Container, Box, Flex, Text, chakra, SimpleGrid, Stack } from '@chakra-ui/react';
import { Summary } from '@/components/Summary';
import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Pagination from '@choc-ui/paginator';
dayjs.extend(relativeTime);
const BlockDetail = ({ block, ...restProps }) => {
  return <Summary summary={block} {...restProps}></Summary>;
};

const SortEnum = {
  LAST: 'LAST',
  FIRST: 'FIRST',
};

const size = 10;

const ActionList = ({ actions, ...restProps }) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(SortEnum.FIRST);
  const sortedActionList = useMemo(() => {
    switch (sort) {
      case SortEnum.FIRST:
        return actions;
      case SortEnum.LAST:
        return actions.reverse();
      default:
        return [];
    }
  }, [sort, actions]);
  const actionList = useMemo(() => {
    return sortedActionList.slice((page - 1) * 10, page * 10);
  }, [page, sortedActionList]);
  return (
    <Box {...restProps}>
      <Stack gap={6}>
        {actionList?.map((a) => (
          <Box key={a.hash} border="1px solid white" borderRadius={'10px'} p="12px">
            <Flex justifyContent={'space-between'}>
              <Box>
                <Flex>
                  <chakra.span>TX</chakra.span>
                  {a.rank}.Hash
                </Flex>
                <Flex>{a.time}</Flex>
              </Box>
              <Box>
                <Flex></Flex>
                <Flex>Fee {a.fee} Sats</Flex>
              </Box>
            </Flex>
            <SimpleGrid columns={2}>
              <Box>
                <Text>From</Text>
                <Box>
                  {a.inputs.map(({ prev_out: { hash, value, tx_index, n }, script }) => (
                    <Box key={hash}>
                      <Text>{hash}</Text>
                      <Text>{value}</Text>
                      <Text>{script}</Text>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box>
                <Text>To</Text>
                <Box>
                  {a.out.map(({ value, hash, script }) => (
                    <Box key={hash}>
                      <Text>{hash}</Text>
                      <Text>{value}</Text>
                      <Text>{script}</Text>
                    </Box>
                  ))}
                </Box>
              </Box>
            </SimpleGrid>
          </Box>
        ))}
      </Stack>
      <Flex
        w="full"
        bg={'gray.400'}
        _dark={{
          bg: 'gray.600',
        }}
        p={50}
        alignItems="center"
        justifyContent="center">
        <Pagination
          defaultCurrent={1}
          current={page}
          size={size}
          onChange={setPage}
          total={actions.length}
          paginationProps={{
            display: 'flex',
          }}
        />
      </Flex>
      ;
    </Box>
  );
};

export default function Home({ block = {}, actions = [] }) {
  return (
    <Container bg="whiteAlpha.100" maxW={'1200px'}>
      <Text>Detail</Text>
      <BlockDetail mt="12px" block={block}></BlockDetail>
      <Text mt="24px">Transactions</Text>
      <ActionList mt="12px" actions={actions}></ActionList>
    </Container>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { hash } = params;
  const res = await fetch(`https://blockchain.info/rawblock/${hash}`);
  const block = await res.json();
  const actions = block.tx.sort((a, b) => b.time - a.time);
  actions.forEach((a, index) => {
    a.fromNow = dayjs(a.time * 1000).fromNow();
    a.time = dayjs(a.time * 1000).format('YYYY-MM-DD HH:mm:ss');
    a.rank = index;
  });
  delete block.tx;
  delete block.next_block;
  return {
    props: {
      block,
      actions,
    },
  };
}
