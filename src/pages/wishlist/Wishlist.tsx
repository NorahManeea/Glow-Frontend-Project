import { useEffect } from 'react';
//** Redux */
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlistThunk } from '../../redux/slices/wishlistSlice';
import { AppDispatch, RootState } from '../../redux/store';

export default function Wishlist() {
  const dispatch = useDispatch<AppDispatch>();
  const wishlist = useSelector((state: RootState) => state.wishlist.wishlist);

  useEffect(() => {
    dispatch(fetchWishlistThunk());
  }, [dispatch]);

  return (
    <div className="bg-gray-100">
    
    </div>

  );
}
