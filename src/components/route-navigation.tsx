import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Flex, FlexProps } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import SecondaryButton from './buttons/secondary-button';

interface Props extends FlexProps {
  routeList: string[];
  onNextHandler?: () => Promise<void>;
  onPreviousHandler?: () => Promise<void>;
}

export default function RouteNavigation({
  routeList,
  onNextHandler,
  onPreviousHandler,
  ...props
}: Props) {
  const router = useRouter();

  const routeIndex = routeList.indexOf(router.route);

  const handleNavigate = (newRoute: string) => {
    router.push({ pathname: newRoute, query: router.query });
  };

  const handlePrevious = async () => {
    await onPreviousHandler?.();
    handleNavigate(routeList[routeIndex - 1]);
  };

  const handleNext = async () => {
    await onNextHandler?.();
    handleNavigate(routeList[routeIndex + 1]);
  };

  return (
    <Flex gap={2} mt="auto" alignSelf="end" {...props}>
      {routeIndex > 0 && (
        <SecondaryButton
          borderColor="secondary.100"
          color="secondary.100"
          leftIcon={<ArrowBackIcon />}
          onClick={handlePrevious}
        >
          Previous step
        </SecondaryButton>
      )}
      {routeIndex < routeList.length - 1 && (
        <SecondaryButton
          borderColor="secondary.100"
          color="secondary.100"
          rightIcon={<ArrowForwardIcon />}
          onClick={handleNext}
        >
          Next step
        </SecondaryButton>
      )}
    </Flex>
  );
}
