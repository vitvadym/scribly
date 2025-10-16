const categories = [
  { value: 'technology', label: 'Technology', color: '#1f77b4' }, // blue
  { value: 'health', label: 'Health', color: '#2ca02c' }, // green
  { value: 'lifestyle', label: 'Lifestyle', color: '#9467bd' }, // purple
  { value: 'travel', label: 'Travel', color: '#17becf' }, // teal
  { value: 'food', label: 'Food', color: '#ff7f0e' }, // orange
  { value: 'business', label: 'Business', color: '#7f7f7f' }, // gray
  { value: 'education', label: 'Education', color: '#bcbd22' }, // olive
  { value: 'entertainment', label: 'Entertainment', color: '#e377c2' }, // pink
  { value: 'sports', label: 'Sports', color: '#d62728' }, // red
  { value: 'finance', label: 'Finance', color: '#8c564b' }, // brown
  { value: 'fashion', label: 'Fashion', color: '#f39c12' }, // golden yellow
];

export const seedCategories = () => {
  return categories.map(({ color, label, value }) => ({
    label,
    value,
    color,
  }));
};
