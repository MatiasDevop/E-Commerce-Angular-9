import { CartStore } from './cart-store';
import { TestBed } from '@angular/core/testing';
import { initialState, CartState } from './cart-state';
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
    const currentState = initialState;// start arrangement 
    expect(currentState.cartItems.length)
    .toBe(0);

    const cartItem: CartItem = {
        id: 1,
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

  it('can clear cart', () => {
    //Arrange 
    const cartItem: CartItem = {
        id: 1,
        imgUrl: 'img/apple',
        price: 2,
        quantity: 10,
        itemTotal: 20,
        name: 'Apple'
    };
    cartStore.addCartItem(cartItem);
    const currentState ={
      cartItems: [cartItem]
    };

    expect(cartStore.state).toEqual(currentState);
    
    //end arrangment

    //Act something
    cartStore.clearCart();
   

    //Assert
    expect(cartStore.state).toEqual(initialState);
  });
  
  it('can restore cart', () => {
    //#region Arrange 
    const currentState = initialState;

    expect(cartStore.state).toEqual(currentState);
    const cartItem: CartItem = {
      id: 1,
      imgUrl: 'img/apple',
      price: 2,
      quantity: 10,
      itemTotal: 20,
      name: 'Apple'
    };
    const expectedState: CartState = {
      cartItems: [cartItem]
    }

    //#endregion

    //#region Act something
    cartStore.restoreCart(expectedState);
   //#endregion

    //#region Assert
    expect(cartStore.state).toEqual(expectedState);
    //#endregion
  });

  it('can remove cart item', () => {
    //#region Arrange 
    const cartItem: CartItem = {
      id: 1,
      imgUrl: 'img/apple',
      price: 2,
      quantity: 10,
      itemTotal: 20,
      name: 'Apple'
    };

    const cartItem1: CartItem = {
      id: 2,
      imgUrl: 'img/orange',
      price: 5,
      quantity: 2,
      itemTotal: 10,
      name: 'Orange'
    };
    const currentState: CartState = {
      cartItems: [cartItem, cartItem1]
    }

    cartStore.restoreCart(currentState);

    expect(cartStore.state).toEqual(currentState);
    //#endregion

    //#region Act something
    cartStore.removeCartItem(cartItem);
   //#endregion

    //#region Assert
    const expectedState: CartState ={
      cartItems: [cartItem1]
    }
    expect(cartStore.state).toEqual(expectedState);
    //#endregion
  });
  
  it('can update cart item', () => {
    //#region Arrange 
    const cartItem: CartItem = {
      id: 1,
      imgUrl: 'img/apple',
      price: 2,
      quantity: 10,
      itemTotal: 20,
      name: 'Apple'
    };

    const cartItem1: CartItem = {
      id: 2,
      imgUrl: 'img/orange',
      price: 5,
      quantity: 2,
      itemTotal: 10,
      name: 'Orange'
    };
    const currentState: CartState = {
      cartItems: [cartItem, cartItem1]
    }

    cartStore.restoreCart(currentState);

    expect(cartStore.state).toEqual(currentState);
    //#endregion

    //#region Act something
    const cartItemToUpdated: CartItem = {
      id: 2,
      imgUrl: 'img/orange',
      price: 5,
      quantity: 2,
      itemTotal: 40,
      name: 'Orange'
    };
    cartStore.updateCartItem(cartItemToUpdated);
   //#endregion

    //#region Assert
    const expectedState: CartState ={
      cartItems: [cartItem, cartItemToUpdated]
    }
    expect(cartStore.state).toEqual(expectedState);
    //#endregion
  });
});
