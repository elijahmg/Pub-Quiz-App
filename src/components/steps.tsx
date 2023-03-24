import { GridProps, Grid, Box } from '@chakra-ui/react';
import StepsItem from './steps-item';
import type { Props as StepsItemProps } from './steps-item';

type Item = Pick<StepsItemProps, 'value' | 'onClick'> & {
  label: StepsItemProps['children'];
};

interface Props extends GridProps {
  itemList: Item[];
  activeItemValue?: string | number;
}

export default function Steps({ itemList, activeItemValue, ...props }: Props) {
  let activeItemIndex = itemList.findIndex(
    (item) => item.value === activeItemValue,
  );

  if (activeItemIndex === -1) activeItemIndex = Infinity;

  const itemListNodes = itemList.flatMap(({ value, label, onClick }, i) => {
    const isActive = i === activeItemIndex;
    const isCompleted = i < activeItemIndex;

    return [
      <StepsItem
        key={value}
        value={value}
        isActive={isActive}
        isCompleted={isCompleted}
        isDisabled={!isActive && !isCompleted}
        onClick={onClick}
      >
        {label}
      </StepsItem>,
      i < itemList.length - 1 ? (
        <Box
          key={`line-${value}`}
          justifySelf="center"
          alignSelf="stretch"
          bgColor={isCompleted ? 'green.100' : 'secondary.100'}
          width="2px"
        />
      ) : undefined,
    ];
  });

  const rowCount = itemListNodes.length / 2;

  return (
    <Grid
      {...props}
      templateColumns="auto 1fr"
      templateRows={`repeat(${rowCount - 1}, auto 1fr) auto`}
    >
      {itemListNodes}
    </Grid>
  );
}
