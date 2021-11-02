import {Box, Toolbar } from "@mui/material";
import { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import CategoriesPage from "./CategoriesPage";
import DashboardPage from "./DashboardPage";
import OrdersPage from "./OrdersPage";
import ProductsPage from "./ProductsPage";
import UsersPage from "./UsersPage";
import StatisticsPage from "./StatisticsPage";
import SettingsPage from "./SettingsPage";
import ProfilePage from "./ProfilePage";
import { AddPage } from "./AddPage";

import { AppBar } from "../components/appBar";
import { NavBar } from "../components/navBar";
import store from "../store/store";
import ProductPage from "./ProductPage";

const drawerWidth = 200; // px

const MainPage = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;
    if (!store.getState().authorized) {
        return <Redirect to="/login" />;
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} title="Главная страница" />
            <NavBar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} container={container}/>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Switch>
                    <Route exact path="/">
                        <DashboardPage />
                    </Route>
                    <Route path="/orders">
                        <OrdersPage />
                    </Route>
                    <Route path="/categories">
                        <CategoriesPage />
                    </Route>
                    <Route path="/products/add/:id">
                        <AddPage />
                    </Route>
                    <Route path="/products/add">
                        <AddPage />
                    </Route>
                    <Route path="/products">
                        <ProductsPage />
                    </Route>
                    <Route path="/product">
                        <ProductPage />
                    </Route>
                    <Route path="/users">
                        <UsersPage />
                    </Route>
                    <Route path="/statistics">
                        <StatisticsPage />
                    </Route>
                    <Route path="/settings">
                        <SettingsPage />
                    </Route>
                    <Route path="/profile">
                        <ProfilePage />
                    </Route>
                </Switch>
            </Box>
        </Box>
    );
};

export default MainPage;