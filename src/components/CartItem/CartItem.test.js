import CartItem from './CartItem';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import * as reduxHooks from 'react-redux';
import * as action from '../../redux/slices/cartSlice';
import { addItem, removeItem } from '../../redux/slices/cartSlice';

jest.mock('react-redux');

const mockDispatch = jest.spyOn(reduxHooks, 'useDispatch');

describe('Тест компонента CartItem', () => {
  it('Рендер', () => {
    useSelector.mockReturnValue({
      count: 1,
      items: [
        {
          id: '0',
          type: 0,
          sizes: 26,
          title: 'Пепперони Фреш с перцем',
          price: 803,
          imageUrl:
            'https://media.dodostatic.net/image/r:584x584/11EE7D6130241E75B0AB33725248C0D0.avif',
        },
      ],
    });
    mockDispatch.mockReturnValue(jest.fn());

    const { items, count } = useSelector(action.selectCart);
    const { id, title, price, imageUrl, sizes, type } = items[0];

    const component = render(
      <CartItem
        id={id}
        title={title}
        price={price}
        imageUrl={imageUrl}
        count={count}
        sizes={sizes}
        type={type}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('Диспат action', () => {
    const dispatch = jest.fn();
    mockDispatch.mockReturnValue(dispatch);

    const mockedClearItemComplete = jest.spyOn(action, 'clearItem');
    const mockedAddItemComplete = jest.spyOn(action, 'addItem');
    const mockedRemoveItemComplete = jest.spyOn(action, 'removeItem');

    const { items, count } = useSelector(action.selectCart);
    const { id, title, price, imageUrl, sizes, type } = items[0];

    render(
      <CartItem
        id={id}
        title={title}
        price={price}
        imageUrl={imageUrl}
        count={count}
        sizes={sizes}
        type={type}
      />,
    );

    fireEvent.click(screen.getByTestId('clear'));

    expect(dispatch).toHaveBeenCalledTimes(1);

    expect(mockedClearItemComplete).toHaveBeenCalledTimes(1);
    expect(mockedClearItemComplete).toHaveBeenCalledWith({ item: { id } });

    fireEvent.click(screen.getByTestId('add'));

    expect(mockedAddItemComplete).toHaveBeenCalledTimes(1);
    expect(mockedAddItemComplete).toHaveBeenCalledWith({
      item: { id, title, price, imageUrl, sizes, type, count },
    });

    fireEvent.click(screen.getByTestId('remove'));

    expect(mockedRemoveItemComplete).toHaveBeenCalledTimes(1);
    expect(mockedRemoveItemComplete).toHaveBeenCalledWith({ item: { id } });
  });
});
