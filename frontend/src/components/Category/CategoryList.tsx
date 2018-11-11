import * as React from 'react';
import { Category } from 'src/types/budget';
import CategoryItem from 'src/components/Category/CategoryItem';

interface Props {
  fetchCategories: () => void;
  categories: Category[];
}

export default class CategoryList extends React.Component<Props> {
  render() {
    const { categories } = this.props;
    return (
      <div>
        {categories.map((category: Category) => {
          return <CategoryItem key={category.id} category={category} />;
        })}
      </div>
    );
  }
}
