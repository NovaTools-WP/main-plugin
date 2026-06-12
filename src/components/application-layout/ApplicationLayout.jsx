import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../Icons/Logo";
import { useLocation } from "react-router-dom";
import { Icons } from "../Icons/icons";
import { clsx } from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar/Avatar";
import { Button } from "../button/Button";
import { MenuItem, menuPopoverClass, menuContentClass } from "../menu/Menu";
import { MenuTrigger, Menu, Popover } from "react-aria-components";
import { ModeToggle } from "../mode-toggle";

const _startcase = (str) => {
  return str
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const iconMap = {
  Search: Icons.CommonSearchIcon || Icons.DashboardIcon,
  Settings: Icons.SettingsIcon,
  Dashboard: Icons.DashboardIcon,
  Inbox: Icons.CommonInboxIcon,
};

function getIcon(iconName) {
  return iconMap[iconName] || Icons.DashboardIcon;
}

const coreNavigation = [
  {
    name: "Dashboard",
    href: "dashboard",
    icon: Icons.DashboardIcon,
    current: true,
  },
  {
    name: "Inbox",
    href: "inbox",
    icon: Icons.CommonInboxIcon,
    current: false,
  },
  {
    name: "Settings",
    href: "settings",
    icon: Icons.SettingsIcon,
    current: false,
  },
];

const addonNavItems = (window.novaTools?.addonRoutes || [])
  .filter((route) => route.navLabel)
  .map((route) => ({
    name: route.navLabel,
    href: route.path,
    icon: route.icon ? getIcon(route.icon) : Icons.DashboardIcon,
    current: false,
  }));

const navigation = [...coreNavigation, ...addonNavItems];

const ApplicationLayout = () => {
  const showApplicationLayout = !myplugin.isAdmin;
  const navigate = useNavigate();
  let location = useLocation();
  const pageTitle = location.pathname.split("/")[1];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentHoverMenu, setCurrentHoverMenu] = useState(navigation[0].href);

  useEffect(() => {
    if ((!location.pathname || location.pathname === "/") && navigation.length > 0) {
      navigate(navigation[0].href);
    }
  }, []);

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

  useEffect(() => {
    if (pageTitle) {
      window.document.title = _startcase(pageTitle);
    } else {
      window.document.title = _startcase(navigation[0].href);
    }
  }, [pageTitle]);

  const handleLogout = (item) => {
    alert("logout");
  };

  return (
    <div className="dark:bg-gray-900">
      {showApplicationLayout ? (
        <div className="h-[calc(100vh-32px)] w-full absolute bg-white dark:bg-gray-900 !font-sans">
          <div className="flex flex-row  h-full w-full">
            <div className="w-60 border-r border-border-default">
              <div className="flex grow flex-col gap-y-5 overflow-y-auto  dark:bg-gray-900 bg-white pb-4">
                <div style={{marginBottom:'3px'}} className="flex h-10 shrink-0 items-center pt-4 px-6">
                  <Logo />
                  <p className="pl-2 font-semibold text-lg font-sans">
                    Plugin Name
                  </p>
                </div>

                <nav className="flex flex-1 flex-col">
                  <ul className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul className="space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name} className="flex flex-row">
                            <span
                              className={clsx(
                                "w-2 bg-transparen",
                                item.href === pageTitle && "bg-gray-800",
                              )}></span>

                            <NavLink
                              to={item.href}
                              className={clsx(
                                "focus:shadow-none w-full group flex gap-x-3 leading-6  pl-4 py-2 pb-2  border-b  border-t text-sm focus:text-gray-700",
                                item.href === pageTitle
                                  ? "text-gray-800 !border-border-default !shadow-border font-medium"
                                  : "border-transparent font-normal",
                              )}>
                              <item.icon
                                className={clsx(
                                  item.href === pageTitle
                                    ? "stroke-blue-700 font-medium"
                                    : "stroke-gray-600 font-normal",
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="w-full  flex flex-col">
              <div className="sticky flex justify-between h-16  items-center gap-x-4 border-b dark:bg-gray-900 bg-white border-border-default px-4 shadow-border sm:gap-x-6 sm:px-6">
                <div className="font-medium text-xl">
                  {_startcase(pageTitle)}
                </div>
                <div className="flex flex-row gap-2 items-center justify-center">
                  <MenuTrigger>
                    <Button intent="icon">
                      <div className="flex flex-row gap-2 items-center justify-center">
                        <div className="flex gap-4">
                        <ModeToggle />
                          <Avatar>
                            <AvatarImage
                              src={novaTools.userInfo.avatar}
                              alt={novaTools.userInfo.username}
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="text-neutral-600 text-xs font-medium leading-none">
                          {novaTools.userInfo.username}
                        </div>
                        <div className="text-neutral-600 text-xs font-medium leading-none">
                          <Icons.DownIcon />
                        </div>
                      </div>
                    </Button>

                    <Popover className={menuPopoverClass()}>
                      <Menu
                        selectionMode="single"
                        onSelectionChange={(key) => handleLogout("helo")}
                        className={menuContentClass()}>
                        <MenuItem id="logout">Log out</MenuItem>
                      </Menu>
                    </Popover>
                  </MenuTrigger>
                </div>
              </div>
              <div>
                <main className="dark:bg-gray-900 bg-white  top-0 b-0 ">
                  <Outlet />
                </main>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <main className="bg-white dark:bg-gray-900 w-full  h-[calc(100vh-32px)] absolute">

              <div className="sticky flex justify-between h-16  items-center gap-x-4 border-b dark:bg-gray-900 bg-white border-border-default px-4 shadow-border sm:gap-x-6 sm:px-6">
                <div className="font-medium text-xl">
                  {_startcase(pageTitle)}
                </div>
                <div className="flex flex-row gap-2 items-center justify-center">
                <ModeToggle />
                </div>
              </div>
              <div>
                <main className=" bg-white  top-0 b-0 ">
                  <Outlet />
                </main>
              </div>



          </main>
        </div>
      )}
    </div>
  );
};

export default ApplicationLayout;
