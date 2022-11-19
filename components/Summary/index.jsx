import { SimpleGrid, Flex, chakra } from '@chakra-ui/react';

export const Summary = ({ summary, ...restProps }) => {
  return summary ? (
    <SimpleGrid
      columns={{
        base: 1,
        md: 2,
      }}
      columnGap={3}
      {...restProps}>
      {Object.entries(summary).map(([key, value]) => (
        <SimpleGrid key={key} columns={2}>
          <chakra.label
            color="rgb(0, 0, 0)"
            cursor="pointer"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflowWrap="break-word"
            overflow="hidden">
            {key}：
          </chakra.label>

          <chakra.span
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflowWrap="break-word"
            color="rgb(153, 153, 153)">
            {value === undefined ? '-' : value}
          </chakra.span>
        </SimpleGrid>
      ))}
    </SimpleGrid>
  ) : null;
};

Summary.displayName = 'Summary';
