import { ToastProps, useToast } from '@chakra-ui/react';
import { TRPCClientErrorLike } from '@trpc/client';
import { AppRouter } from '../server/routers/_app';

type ToastOpts = Omit<ToastProps, 'description'>;

const useResponseToast = () => {
  const toast = useToast();

  const showResponseToast = (description: string, opts?: ToastOpts) => {
    toast({
      description,
      duration: 5000,
      isClosable: true,
      position: 'bottom-right',
      ...opts,
    });
  };

  const showErrorToast = (description: string, opts?: ToastOpts) => {
    showResponseToast(description, {
      title: 'Error',
      status: 'error',
      ...opts,
    });
  };

  const showWarningToast = (description: string, opts?: ToastOpts) => {
    showResponseToast(description, {
      title: 'Warning',
      status: 'warning',
      ...opts,
    });
  };

  const handleTRPCError = ({ message }: TRPCClientErrorLike<AppRouter>) => {
    showErrorToast(message);
  };

  return { showErrorToast, showWarningToast, handleTRPCError };
};

export default useResponseToast;
