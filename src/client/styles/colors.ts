export type Color
  = 'primary'
  | 'gray-1'
  | 'gray-2'
  | 'gray-3'
  | 'gray-4'
  | 'gray-5'
  | 'base-text'
  | 'primary-light';

export const Colors: {[key in Color]: string} = {
  'primary': '#4A90E2',
  'gray-1': '#F3F3F3',
  'gray-2': '#D4D4D4',
  'gray-3': '#AFAFAF',
  'gray-4': '#676767',
  'gray-5': '#494949',
  'base-text': '#393939',
  'primary-light': 'rgba(74, 144, 226, .5)',
};
