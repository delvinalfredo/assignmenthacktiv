import React, { createContext, useState } from 'react';

export const WishContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  return (
    <WishContext.Provider value={{ wishlist, setWishlist }}>
      {children}
    </WishContext.Provider>
  );
};

