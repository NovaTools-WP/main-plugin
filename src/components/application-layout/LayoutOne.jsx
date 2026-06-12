// @ts-nocheck
import {
    CircleUser,
    Menu,
    CircleDot
} from "lucide-react"
import * as LucideIcons from "lucide-react"
import { useEffect } from "react";
import { Button } from "@/components/ui/button"
import { ModeToggle } from "../mode-toggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Logo from "../Icons/Logo";
import { clsx } from "clsx";

function getIcon(iconName) {
    return LucideIcons[iconName] || CircleDot;
}

// Navigation comes only from add-on plugins (e.g. NovaTools SEO).
const addonNavItems = (window['novaTools']?.addonRoutes || [])
    .filter(route => route.navLabel)
    .map(route => ({
        name: route.navLabel,
        href: route.path,
        icon: route.icon ? getIcon(route.icon) : CircleDot,
        current: false,
    }));

const navigation = [
    {
        name: "Dashboard",
        href: "/",
        icon: LucideIcons.LayoutDashboard || CircleDot,
        current: false,
    },
    ...addonNavItems
];

export default function LayoutOne() {
    let showApplicationLayout = !window['novaTools']?.isAdmin;
    let location = useLocation();
    const pageTitle = location.pathname === "/" ? "/" : location.pathname.split("/")[1];
    if(location.pathname === "/login") {
        showApplicationLayout = false;
    }

    useEffect(() => {
        // Sync WordPress admin menu active class based on the current hash route
        const adminMenu = document.getElementById("adminmenu");
        if (!adminMenu) return;

        const currentHash = window.location.hash.split("?")[0]; // e.g. #/polyglot/languages
        const hashBase = currentHash.split("/").slice(0, 2).join("/"); // e.g. #/polyglot or #/seo

        const submenuLinks = adminMenu.querySelectorAll(".wp-submenu a");
        submenuLinks.forEach((link) => {
            const href = link.getAttribute("href") || "";
            const parentLi = link.parentElement;
            if (!parentLi) return;

            // Check if the link's href matches the current route hash
            const hasHash = href.includes("#/");
            if (hasHash) {
                const linkHash = href.substring(href.indexOf("#/")); // e.g. #/polyglot
                const linkHashBase = linkHash.split("?")[0];
                if (hashBase === linkHashBase) {
                    parentLi.classList.add("current");
                } else {
                    parentLi.classList.remove("current");
                }
            } else {
                // If it's the core NovaTools link (no hash) e.g. admin.php?page=novatools
                // it should only be active if the current hash is empty or just #/
                if (!currentHash || currentHash === "#/" || currentHash === "#") {
                    if (href.endsWith("page=novatools") || href.includes("page=novatools&") || href.includes("page=novatools#")) {
                        parentLi.classList.add("current");
                    } else {
                        parentLi.classList.remove("current");
                    }
                } else {
                    // If we are on an addon subpage (has hash), the base (non-hash) link should NOT be active
                    if (href.endsWith("page=novatools") || href.includes("page=novatools&")) {
                        parentLi.classList.remove("current");
                    }
                }
            }
        });
    }, [location.pathname]);

    return (
        <div className={`grid min-h-screen w-full ${showApplicationLayout ? 'md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]' : ''}`}>
            {showApplicationLayout && <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <a href={navigation.length > 0 ? `#/${navigation[0].href}` : '#/'} className="flex items-center gap-2 font-semibold">
                            <Logo />
                            <span className="">NovaTools</span>
                        </a>

                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            {navigation.map((item,index) => {
                                return <NavLink
                                    to={item.href}
                                    key={index}
                                    className={
                                        clsx(
                                            "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary",
                                            item.href === pageTitle
                                                ? "text-primary bg-muted"
                                                : "text-muted-foreground"
                                        )
                                    }
                                >
                                    <item.icon className="h-5 w-5" />
                                    {item.name}
                                </NavLink>
                            })}


                        </nav>
                    </div>

                </div>
            </div>
            }
            <div className="flex flex-col">
                {showApplicationLayout &&
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium">
                                {navigation.map((item,index) => {
                                    return <NavLink
                                        to={item.href}
                                        key={index}
                                        className={
                                            clsx(
                                                "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary",
                                                item.href === pageTitle
                                                    ? "text-primary bg-muted"
                                                    : "text-muted-foreground"
                                            )
                                        }
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.name}
                                    </NavLink>
                                })}


                            </nav>

                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex items-center h-full">

                    </div>
                    <ModeToggle />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                }
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
