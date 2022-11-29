import Sider from "antd/es/layout/Sider";
import { Menu, MenuProps } from "antd";
import { MyRoutes } from "../route/MyRoutes";
import { SERVER_BASE_URL } from "../constants";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface ICategory {
  id: number;
  name: string;
  last_update: string;
}

const BaseSideBar = () => {
  const token = localStorage.getItem("panda-token");
  let navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const currentCategory = searchParams.get("category") ?? "";

  const allCategory: ICategory = {
    id: 0,
    name: "All",
    last_update: "",
  };

  const [categories, setCategories] = useState<ICategory[]>([allCategory]);

  const initCategories = async (t: string) => {
    const res = await fetch(`${SERVER_BASE_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
    const text = await res.text();
    const parsedRes = JSON.parse(text);
    if (parsedRes instanceof Array<ICategory>) {
      setCategories([allCategory].concat(parsedRes));
    }
  };

  useEffect(() => {
    if (token) {
      initCategories(token);
    }
  }, [token]);

  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group",
    onClick?: Function
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
      onClick,
    } as MenuItem;
  }

  return (
    <Sider
      breakpoint="md"
      className="site-fixed-sidebar"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <img className="app-logo" src="/logo192.png" alt="logo" height={64} />
      <Menu
        mode="inline"
        theme="dark"
        defaultOpenKeys={["All"]}
        selectedKeys={[currentCategory || "All"]}
        items={categories.map((category) =>
          getItem(
            category.name,
            category.name,
            undefined,
            undefined,
            undefined,
            () => {
              if (category.id) {
                navigate(MyRoutes.secret + `?category=${category.name}`);
              } else {
                navigate(MyRoutes.secret);
              }
            }
          )
        )}
      ></Menu>
    </Sider>
  );
};

export default BaseSideBar;
