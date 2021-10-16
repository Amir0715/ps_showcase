import {Box, Toolbar } from "@mui/material";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";

import CategoriesPage from "./CategoriesPage";
import DashboardPage from "./DashboardPage";
import OrdersPage from "./OrdersPage";
import ProductsPage from "./ProductsPage";
import UsersPage from "./UsersPage";
import StatisticsPage from "./StatisticsPage";
import SettingsPage from "./SettingsPage";
import { AddPage } from "./AddPage";

import { AppBar } from "../components/appBar";
import { NavBar } from "../components/navBar";

const drawerWidth = 200; // px

const MainPage = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

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
                    <Route path="/add">
                        <AddPage />
                    </Route>
                    <Route path="/orders">
                        <OrdersPage />
                    </Route>
                    <Route path="/categories">
                        <CategoriesPage />
                    </Route>
                    <Route path="/products">
                        <ProductsPage />
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
                </Switch>
            </Box>
        </Box>
    );
};

export default MainPage;