export const STACK_SPACING = 4;

export const POINTS_OPTIONS = [0, 0.5, 1];

export const ADMIN_CREATE_BASE_ROUTE = '/admin/create';

export const ADMIN_CREATE_ROUTE_LIST = [
  `${ADMIN_CREATE_BASE_ROUTE}`,
  `${ADMIN_CREATE_BASE_ROUTE}/rounds`,
  `${ADMIN_CREATE_BASE_ROUTE}/questions`,
  `${ADMIN_CREATE_BASE_ROUTE}/final`,
];

export const ADMIN_CREATOR_STEPS = [
  { value: 'main', label: 'Main info' },
  { value: 'rounds', label: 'Rounds' },
  { value: 'questions', label: 'Questions' },
  { value: 'final', label: 'Final check & create' },
];
