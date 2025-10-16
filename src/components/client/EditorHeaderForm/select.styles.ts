import { StylesConfig } from 'react-select';

export const selectStyles: StylesConfig = {
  control: (base) => ({
    ...base,
    width: '200px',
    borderColor: 'var(--color-border)',
    borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg)',
    boxShadow: 'none',
    outline: 'none',
  }),

  option: (base) => ({
    ...base,
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text)',
    '&:hover': {
      backgroundColor: 'var(--color-border)',
      cursor: 'pointer',
    },
  }),
  input: (base) => ({
    ...base,
    color: 'var(--color-text)',
  }),

  singleValue: (base) => ({
    ...base,
    color: 'var(--color-text)',
  }),

  menu: (base) => ({
    ...base,
    backgroundColor: 'var(--color-bg)',
  }),
};
