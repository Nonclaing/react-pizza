import CartItem from './CartItem';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../utils/test-utils';
import { setupStore } from '../../redux/store';

const renderComponent = ({ id, title, price, imageUrl, sizes, type, count }) => {
  return render(
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
};

const getComponent = ({ id, title, price, imageUrl, sizes, type, count }) => {
  return (
    <CartItem
      id={id}
      title={title}
      price={price}
      imageUrl={imageUrl}
      count={count}
      sizes={sizes}
      type={type}
    />
  );
};

const defaultValue = ({
  count = 1,
  id = '0',
  type = 0,
  sizes = 26,
  title = 'Пепперони Фреш с перцем',
  price = 800,
  imageUrl = 'https://media.dodostatic.net/image/r:584x584/11EE7D6130241E75B0AB33725248C0D0.avif',
} = {}) => ({
  count,
  items: [{ id, type, sizes, title, price, imageUrl, count }],
});

describe('Тест компонента CartItem', () => {
  describe('Проверка на наличие данных в компоненте', () => {
    const { items, count } = defaultValue();
    const { id, title, price, imageUrl, sizes, type } = items[0];

    beforeEach(() => {
      renderWithProviders(getComponent({ id, title, price, imageUrl, sizes, type, count }));
    });

    test('Поиск заголовка', () => {
      expect(screen.queryByText(title)).toBeInTheDocument();
    });

    test('Поиск картинки', () => {
      const imgElement = screen.queryByTestId('img');
      expect(imgElement).toBeInTheDocument();
      expect(imgElement).toHaveAttribute('src', imageUrl);
    });

    test('Поиск количества', () => {
      const countElement = screen.queryByTestId('count');
      expect(countElement).toBeInTheDocument();
      expect(countElement).toHaveTextContent(count);
    });

    test('Поиск цены', () => {
      const priceElement = screen.queryByTestId('price');
      expect(priceElement).toBeInTheDocument();
      expect(priceElement).toHaveTextContent(count * price);
    });

    test('Поиск каунетра', () => {
      const removeElement = screen.queryByTestId('remove');
      expect(removeElement).toBeInTheDocument();

      const addElement = screen.queryByTestId('add');
      expect(addElement).toBeInTheDocument();
    });

    test('Поиск удаление товара', () => {
      const clearElement = screen.queryByTestId('clear');
      expect(clearElement).toBeInTheDocument();
    });
  });

  describe('Проверка логики', () => {
    it('Добавление товара', async () => {
      const defaultVal = defaultValue();
      const { id, count, price } = defaultVal.items[0];
      const store = setupStore({
        cart: {
          totalPrice: price * count,
          items: {
            [id]: { ...defaultVal.items[0], count },
          },
          count,
        },
      });
      const { rerender } = renderWithProviders(
        getComponent({ ...store.getState().cart.items[id] }),
        {
          store,
        },
      );

      userEvent.click(screen.getByTestId('add'));
      rerender(getComponent({ ...store.getState().cart.items[id] }));

      const countElement = await screen.findByTestId('count');
      expect(countElement).toBeInTheDocument();
      expect(countElement).toHaveTextContent(count + 1);

      const priceElement = await screen.findByTestId('price');
      expect(priceElement).toBeInTheDocument();
      expect(priceElement).toHaveTextContent((count + 1) * price);
    });

    it('Уменьшение товара', async () => {
      const defaultVal = defaultValue({ count: 2 });
      const { id, count, price } = defaultVal.items[0];
      const store = setupStore({
        cart: {
          totalPrice: price * count,
          items: {
            [id]: { ...defaultVal.items[0], count },
          },
          count,
        },
      });
      const { rerender } = renderWithProviders(
        getComponent({ ...store.getState().cart.items[id] }),
        {
          store,
        },
      );

      userEvent.click(screen.getByTestId('remove'));
      rerender(getComponent({ ...store.getState().cart.items[id] }));

      const countElement = await screen.findByTestId('count');
      expect(countElement).toBeInTheDocument();
      expect(countElement).toHaveTextContent(count - 1);

      const priceElement = await screen.findByTestId('price');
      expect(priceElement).toBeInTheDocument();
      expect(priceElement).toHaveTextContent((count - 1) * price);
    });

    it('Удаление товара', async () => {
      const defaultVal = defaultValue();
      const { id, count, price } = defaultVal.items[0];
      const store = setupStore({
        cart: {
          totalPrice: price * count,
          items: {
            [id]: { ...defaultVal.items[0], count },
          },
          count,
        },
      });
      const { rerender } = renderWithProviders(
        getComponent({ ...store.getState().cart.items[id] }),
        {
          store,
        },
      );

      userEvent.click(screen.getByTestId('clear'));
      rerender(getComponent({ ...store.getState().cart.items[id] }));
      expect(screen.queryByTestId('cart-item')).not.toBeInTheDocument();
    });

    it('Удаление товара через каунтер', async () => {
      const defaultVal = defaultValue();
      const { id, count, price } = defaultVal.items[0];
      const store = setupStore({
        cart: {
          totalPrice: price * count,
          items: {
            [id]: { ...defaultVal.items[0], count },
          },
          count,
        },
      });
      const { rerender } = renderWithProviders(
        getComponent({ ...store.getState().cart.items[id] }),
        {
          store,
        },
      );

      userEvent.click(screen.getByTestId('remove'));
      rerender(getComponent({ ...store.getState().cart.items[id] }));
      expect(screen.queryByTestId('cart-item')).not.toBeInTheDocument();
    });
  });
});
