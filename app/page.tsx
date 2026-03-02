import Container from "./components/container";
import Items from "./components/items";
import { IconName } from "lucide-react/dynamic";

export default function Home() {
  interface Client {
    name: string;
    description: string;
    icon: IconName;
    route: string;
  }
  const clients: Client[] = [
    {
      name: "service",
      description: "Manage service requests",
      icon: "wrench",
      route: "/service",
    },
    {
      name: "P.M Status",
      description: "Preventive maintenance",
      icon: "clipboard-check",
      route: "/pmstatus",
    },
    {
      name: "Workdone Report",
      description: "Completed work reports",
      icon: "file-chart-column",
      route: "/reports",
    },
    {
      name: "Spare Parts List",
      description: "Inventory management",
      icon: "package",
      route: "/spareparts",
    },
    {
      name: "Setup",
      description: "Hospital and equipment setup",
      icon: "settings",
      route: "/setup",
    },
    {
      name: "Cargo Management",
      description: "Incoming and outgoing shipments",
      icon: "truck",
      route: "/cargo",
    },
    {
      name: "Tools",
      description: "Tool inventory and management",
      icon: "hammer",
      route: "/tools",
    },
    {
      name: "Settings",
      description: "System configuration",
      icon: "cog",
      route: "/settings",
    },
  ];
  return (
    <Container>
      <Items clients={clients} cols={4} />
    </Container>
  );
}
