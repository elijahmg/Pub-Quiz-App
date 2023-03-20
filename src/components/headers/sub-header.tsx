import Header from './header';
import type { Props as HeaderProps } from './header';

export default function SubHeader({ children, ...props }: HeaderProps) {
  return (
    <Header as="h2" size="lg" color={undefined} {...props}>
      {children}
    </Header>
  );
}
