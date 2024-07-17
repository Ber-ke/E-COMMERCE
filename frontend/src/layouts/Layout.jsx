import {isAdmin} from "../config/isAdmin.js";
import AdminLayout from "./AdminLayout.jsx";
import MainLayout from "./MainLayout.jsx";

export const Layout = isAdmin ? AdminLayout : MainLayout;