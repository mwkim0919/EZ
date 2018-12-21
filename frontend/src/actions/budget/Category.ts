import { ThunkResult, CategoryRequest, Category } from 'src/types';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { REQUEST, FAILURE, SUCCESS } from 'src/constants';
import {
  FETCH_CATEGORIES,
  CREATE_CATEGORIES,
  UPDATE_CATEGORY,
  DELETE_CATEGORIES,
} from 'src/constants/budget';

// ********************
// **  Category APIs **
// ********************
export const fetchCategories = (): ThunkResult<Promise<void>> => {
  return (dispatch, getState) => {
    const {
      currentUser: { userId },
    } = getState();
    dispatch({ type: FETCH_CATEGORIES[REQUEST] });
    return axios.get(`/api/users/${userId}/categories`).then(
      (response: AxiosResponse) => {
        dispatch({
          type: FETCH_CATEGORIES[SUCCESS],
          payload: response.data,
        });
      },
      (err: AxiosError) => {
        dispatch({ type: FETCH_CATEGORIES[FAILURE], payload: err });
      }
    );
  };
};

export const createCategories = (
  categories: CategoryRequest[]
): ThunkResult<Promise<void>> => {
  return (dispatch, getState) => {
    const {
      currentUser: { userId },
    } = getState();
    dispatch({ type: CREATE_CATEGORIES[REQUEST] });
    return axios.post(`/api/users/${userId}/categories`, categories).then(
      (response: AxiosResponse) => {
        dispatch({ type: CREATE_CATEGORIES[SUCCESS], payload: response.data });
      },
      (err: AxiosError) => {
        dispatch({ type: CREATE_CATEGORIES[FAILURE], payload: err });
      }
    );
  };
};

export const updateCategory = (
  category: Category
): ThunkResult<Promise<void>> => {
  return (dispatch, getState) => {
    const {
      currentUser: { userId },
    } = getState();
    dispatch({ type: UPDATE_CATEGORY[REQUEST] });
    return axios
      .put(`/api/users/${userId}/categories/${category.id}`, category)
      .then(
        (response: AxiosResponse) => {
          dispatch({ type: UPDATE_CATEGORY[SUCCESS], payload: response.data });
        },
        (err: AxiosError) => {
          dispatch({ type: UPDATE_CATEGORY[FAILURE], payload: err });
        }
      );
  };
};

export const deleteCategories = (
  categories: Category[]
): ThunkResult<Promise<void>> => {
  return (dispatch, getState) => {
    const {
      currentUser: { userId },
    } = getState();
    dispatch({ type: DELETE_CATEGORIES[REQUEST] });
    const categoryIds = categories
      .map((category: Category) => category.id)
      .join(',');
    const deleteURL = `/api/users/${userId}/categories`.concat(categoryIds);
    return axios.delete(deleteURL).then(
      (response: AxiosResponse) => {
        dispatch({ type: DELETE_CATEGORIES[SUCCESS], payload: response.data });
      },
      (err: AxiosError) => {
        dispatch({ type: DELETE_CATEGORIES[FAILURE], payload: err });
      }
    );
  };
};
