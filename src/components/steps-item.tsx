import { CheckCircleIcon } from '@chakra-ui/icons';
import { Icon, Text, Box, IconProps } from '@chakra-ui/react';
import { ReactNode, SVGProps } from 'react';

type Value = string | number;

export interface Props {
  children: ReactNode;
  value: Value;
  isActive?: boolean;
  isCompleted?: boolean;
  isDisabled?: boolean;
  onClick?: (value: Value) => void;
}

export default function StepsItem({
  children,
  value,
  isActive = false,
  isCompleted = false,
  isDisabled = false,
  onClick,
}: Props) {
  const hasOnClick = onClick && !isActive && !isDisabled;

  const onItemClick = () => {
    if (!hasOnClick) return;
    onClick(value);
  };

  return (
    <>
      <StepIcon
        key={`icon-${value}`}
        boxSize={8}
        cursor={hasOnClick ? 'pointer' : undefined}
        onClick={onItemClick}
        isActive={isActive}
        isCompleted={isCompleted}
      />
      <Box
        key={`label-${value}`}
        ml={6}
        mt={1}
        gridRow="span 2"
        color={isDisabled ? '#A0A2A4' : undefined}
      >
        <Text cursor={hasOnClick ? 'pointer' : undefined} onClick={onItemClick}>
          {children}
        </Text>
      </Box>
    </>
  );
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

interface StepIconProps extends IconProps {
  isActive?: boolean;
  isCompleted?: boolean;
}

function StepIcon({ isActive, isCompleted, ...props }: StepIconProps) {
  if (isActive) {
    return (
      <Icon {...props} color="secondary.100" viewBox="0 0 32 32">
        <CircleSvg />
        <circle cx="16" cy="16" r="5" fill="currentColor" />
      </Icon>
    );
  }

  if (isCompleted) {
    return <Icon {...props} as={CheckCircleIcon} color="green.100" />;
  }

  return (
    <Icon {...props} color="secondary.100" viewBox="0 0 32 32">
      <CircleSvg />
    </Icon>
  );
}
