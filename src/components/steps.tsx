import { GridProps, Grid } from '@chakra-ui/react';
import StepsItem from './steps-item';
import type { Props as StepsItemProps } from './steps-item';
import StepsLine from './steps-line';

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
    const hasLine = i < itemList.length - 1;

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
      hasLine && <StepsLine key={`line-${value}`} isCompleted={isCompleted} />,
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
