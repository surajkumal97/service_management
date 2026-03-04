import Container from "../components/container";
import Items from "../components/items";
import { IconName } from "lucide-react/dynamic";

const SettingsDashboard = () => {
  interface Setting {
    name: string;
    description: string;
    icon: IconName;
    route: string;
  }

  const settings: Setting[] = [
    {
      name: "User Dashboard",
      description: "Customize your working environment",
      icon: "layout-dashboard",
      route: "userdashboard",
    },
    {
      name: "Role Management",
      description: "Define user permissions and access",
      icon: "users",
      route: "rolemanagement",
    },
    {
      name: "User Accounts",
      description: "Create and manage user profiles",
      icon: "user-check",
      route: "useraccounts",
    },
    {
      name: "System Settings",
      description: "Advanced configuration options",
      icon: "settings",
      route: "systemsettings",
    },
  ];

  return (
    <Container>
      <Items clients={settings} cols={2} />
    </Container>
  );
};

export default SettingsDashboard;