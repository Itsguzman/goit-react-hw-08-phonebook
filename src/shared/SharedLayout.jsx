// import { Navigation } from 'components/Navigation/Navigation';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const SharedLayout = () => {
  return (
    <div>
      {/* <Navigation /> */}
      <Outlet />
    </div>
  );
};
