import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Flex, FlexProps } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import SecondaryButton from './buttons/secondary-button';

interface Props extends FlexProps {
  routeList: string[];
  onNext?: () => Promise<boolean | void>;
  onPrevious?: () => Promise<boolean | void>;
}

export default function RouteNavigation({
  routeList,
  onNext,
  onPrevious,
  ...props
}: Props) {
  const router = useRouter();

  const routeIndex = routeList.indexOf(router.route);

  const handleNavigate = (newRoute: string) => {
    router.push({ pathname: newRoute, query: router.query });
  };

  const handlePrevious = async () => {
    const prevent = (await onPrevious?.()) === false;
    if (prevent) return;
    handleNavigate(routeList[routeIndex - 1]);
  };

  const handleNext = async () => {
    const prevent = (await onNext?.()) === false;
    if (prevent) return;
    handleNavigate(routeList[routeIndex + 1]);
  };

  return (
    <Flex gap={2} mt="auto" alignSelf="end" {...props}>
      {routeIndex > 0 && (
        <SecondaryButton
          testId="PreviousStep_Button"
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
          testId="NextStep_Button"
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
