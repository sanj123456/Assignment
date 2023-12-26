import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthGuard from './AuthGuard';
import { routes } from './routes';

const Router = () => {
    return (
        <Routes>
            {routes.map((ele, i) => {
                return (
                    <Route
                        key={"route_" + i}
                        path={ele.path}
                        element={
                            <AuthGuard
                                routeElement={ele.element}
                                privatePage={ele.private}
                                authPage={ele.authPage}
                            />}
                    />
                )
            })}
        </Routes>
    )
}

export default Router