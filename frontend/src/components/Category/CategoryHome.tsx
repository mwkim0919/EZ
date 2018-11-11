import * as React from 'react';
import { Category } from 'src/types/budget';

interface Props {
  categories: Category[];
}

const CategoryHome = (props: Props) => {
  const categories = [
    {
      id: 1,
      name: 'TRANSPORTATION',
      categoryLimit: '200.00',
      parentCategory: null,
      createDatetime: '2018-11-11T10:37:23.000Z',
    },
    {
      id: 2,
      name: 'FOOD',
      categoryLimit: '400.00',
      parentCategory: null,
      createDatetime: '2018-11-11T10:37:23.000Z',
    },
    {
      id: 3,
      name: 'ENTERTAINMENT',
      categoryLimit: '130.00',
      parentCategory: null,
      createDatetime: '2018-11-11T10:37:23.000Z',
    },
    {
      id: 4,
      name: 'Coffee',
      categoryLimit: '100.00',
      parentCategory: {
        id: 2,
        name: 'FOOD',
        categoryLimit: '400.00',
        parentCategory: null,
        createDatetime: '2018-11-11T10:37:23.000Z',
      },
      createDatetime: '2018-11-11T10:37:23.000Z',
    },
    {
      id: 10,
      name: 'Starbucks',
      categoryLimit: '20.00',
      parentCategory: {
        id: 4,
        name: 'Coffee',
        categoryLimit: '100.00',
        parentCategory: {
          id: 2,
          name: 'FOOD',
          categoryLimit: '400.00',
          parentCategory: null,
          createDatetime: '2018-11-11T10:41:39.000Z',
        },
        createDatetime: '2018-11-11T10:41:39.000Z',
      },
      createDatetime: '2018-11-11T10:41:39.000Z',
    },
  ];

  return (
    <div>
      This is category home.
    </div>
  );
};

export default CategoryHome;
