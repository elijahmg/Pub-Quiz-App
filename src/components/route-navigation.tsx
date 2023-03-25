import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Flex, FlexProps } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import SecondaryButton from './buttons/secondary-button';

interface Props extends FlexProps {
  routeList: string[];
  onNavigate?: (route: string) => void;
}

export default function RouteNavigation({
  routeList,
  onNavigate,
  ...props
}: Props) {
  const router = useRouter();

  const routeIndex = routeList.indexOf(router.route);

  const handleNavigate = (newRoute: string) => {
    if (typeof onNavigate === 'function') onNavigate(newRoute);
    router.push(newRoute);
  };

  const handlePrevious = () => {
    handleNavigate(routeList[routeIndex - 1]);
  };

  const handleNext = () => {
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
