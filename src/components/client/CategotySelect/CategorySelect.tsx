import AsyncSelect from 'react-select/async';
import { selectStyles } from './select.styles';
import useSwr from 'swr';
import { fetcher } from '@/lib/fetcher';
import { Category } from '@/db/schema/category';
import { usePostFormValues, usePostStore } from '@/store/usePost';
export default function CategorySelect() {
  const { data } = useSwr('/api/categories', fetcher);
  const setCategory = usePostFormValues();
  const category = usePostStore((state) => state.category);

  const options = (inputValue: string) => {
    return new Promise<Category[] | []>((resolve) => {
      if (!data) {
        resolve([]);
      }

      const filteredOptions = data.filter((category: Category) =>
        category.label.toLowerCase().includes(inputValue.toLowerCase()),
      );
      resolve(filteredOptions);
    });
  };

  const handleChangeCategory = (newValue: unknown) => {
    const newOption = newValue as Category;
    if (newOption) {
      setCategory({ category: newOption });
    }
  };
  return (
    <AsyncSelect
      placeholder='Select category'
      styles={selectStyles}
      defaultOptions={data}
      cacheOptions
      value={category}
      loadOptions={options}
      onChange={handleChangeCategory}
    />
  );
}
