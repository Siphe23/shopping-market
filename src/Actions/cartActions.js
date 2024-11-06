import { setCartItems, setLoading } from './cartSlice';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebaseConfig';

export const fetchCartItems = (userId) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const cartDoc = await getDoc(doc(db, 'carts', userId));

    if (cartDoc.exists()) {
      dispatch(setCartItems(cartDoc.data().items)); // Load cart items from Firestore
    } else {
      dispatch(setCartItems([])); // No cart found, initialize as empty
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
  }

  dispatch(setLoading(false));
};
