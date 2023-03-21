import { CheckCircleIcon } from '@chakra-ui/icons';
import { GridProps, Grid, Icon, Text, Box, IconProps } from '@chakra-ui/react';
import { ReactNode, SVGProps } from 'react';

interface Item {
  label: ReactNode;
  value: string | number;
}

interface Props extends GridProps {
  itemList: Item[];
  activeItemValue?: string | number;
}

function CircleSvg(props: SVGProps<SVGCircleElement>) {
  return (
    <circle
      {...props}
      cx="16"
      cy="16"
      r="15"
      fill="transparent"
      stroke="currentColor"
      strokeWidth={2}
    />
  );
}

function StepIcon(props: IconProps) {
  return (
    <Icon {...props} color="secondary.100" viewBox="0 0 32 32">
      <CircleSvg />
    </Icon>
  );
}

function StepIconActive(props: IconProps) {
  return (
    <Icon {...props} color="secondary.100" viewBox="0 0 32 32">
      <CircleSvg />
      <circle cx="16" cy="16" r="5" fill="currentColor" />
    </Icon>
  );
}

function StepIconCompleted(props: IconProps) {
  return <Icon {...props} as={CheckCircleIcon} color="green.100" />;
}

export default function Steps({ itemList, activeItemValue, ...props }: Props) {
  const activeItemIndex = itemList.findIndex(
    (item) => item.value === activeItemValue,
  );

  const itemListNodes = itemList.flatMap((item, i) => {
    const isActive = i === activeItemIndex;
    const isCompleted = i < activeItemIndex;

    let IconComponent = StepIcon;
    if (isActive) IconComponent = StepIconActive;
    else if (isCompleted) IconComponent = StepIconCompleted;

    return [
      <IconComponent key={`icon-${item.value}`} boxSize={8} />,
      <Box key={`label-${item.value}`} as={Text} ml={6} mt={1} gridRow="span 2">
        {item.label}
      </Box>,
      i < itemList.length - 1 ? (
        <Box
          key={`line-${item.value}`}
          justifySelf="center"
          alignSelf="stretch"
          bgColor={isCompleted ? 'green.100' : 'secondary.100'}
          width="2px"
        />
      ) : undefined,
    ];
  });

  const rowCount = itemListNodes.length / 3;

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
