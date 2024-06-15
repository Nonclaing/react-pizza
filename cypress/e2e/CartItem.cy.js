const getId = () => cy.get('.pizza-block[data-id]').first().invoke('data', 'id');

const addItem = () => {
  cy.visit('/');
  cy.intercept({
    pathname: '**/items',
    method: 'GET',
  }).as('items');
  cy.wait('@items');
};

describe('Тестирование CartItem', () => {
  it('Проверка соответствия данных и работы каунтера', () => {
    addItem();
    getId().then((id) => {
      cy.get(`.pizza-block[data-id="${id}"] [data-testid="add"]`).first().should('exist').click();
      cy.get('.header__cart').should('exist').click();
      cy.window()
        .its('store')
        .invoke('getState')
        .its('cart')
        .then(({ items }) => {
          const { count, price, title, imageUrl } = items[id];

          cy.get('.pizza-block__image').invoke('attr', 'src').should('eq', imageUrl);
          cy.get('.cart__item-info').contains(title);

          cy.get('.cart__item-info').contains(title);
          cy.get('.cart__item [data-testid="count"]').contains(count);
          cy.get('.cart__item [data-testid="price"]').contains(count * price);

          cy.get('.cart__item [data-testid="add"]').click();
          cy.get('.cart__item [data-testid="count"]').contains(count + 1);
          cy.get('.cart__item [data-testid="price"]').contains((count + 1) * price);

          cy.get('.cart__item [data-testid="remove"]').click();
          cy.get('.cart__item [data-testid="count"]').contains(count);
          cy.get('.cart__item [data-testid="price"]').contains(count * price);

          cy.get('.cart__item [data-testid="remove"]').click();

          cy.get('[data-testid="cart-item"]').should('not.exist');
        });
    });
  });

  it('Удаление товара через каунтер', () => {
    addItem();
    getId().then((id) => {
      cy.get(`.pizza-block[data-id="${id}"] [data-testid="add"]`).first().should('exist').click();
      cy.get('.header__cart').should('exist').click();
      cy.get('.cart__item [data-testid="clear"]').click();
      cy.get('[data-testid="cart-item"]').should('not.exist');
    });
  });
});
