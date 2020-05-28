import { CartStore } from './cart-store';
import { TestBed } from '@angular/core/testing';
import { initialState } from './cart-state';
import { CartItem } from './cart-item';

describe('CartStore', () => {
  let cartStore: CartStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartStore]
    });

    cartStore = TestBed.get(CartStore);

  });

  it('should create an instance', () => {
    expect(cartStore).toBeTruthy();
  });

  it('can add item into cart state', () => {
    //const cartStore = new CartStore(); this goes to the top
    const currentState = initialState;// start arrangment 
    expect(currentState.cartItems.length)
    .toBe(0);

    const cartItem: CartItem = {
        productId: 1,
        imgUrl: 'img/apple',
        price: 2,
        quantity: 10,
        itemTotal: 20,
        name: 'Apple'
    };//end arrangment

    //Act something
    cartStore.addCartItem(cartItem);

    const expectedState = {
      cartItems: [cartItem]
    };

    //Assert
    expect(cartStore.state).toEqual(expectedState);
  });
  
});
