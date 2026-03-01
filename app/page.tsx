import Container from "./components/container";
import Items from "./components/items";

export default function Home() {
  const clients = [
    {
      name: "service",
      description: "Manage service requests",
      image: "/service.svg",
      route: "/service",
    },
    {
      name: "P.M Status",
      description: "Preventive maintenance",
      image: "/pm.svg",
      route: "/pmstatus",
    },
    {
      name: "Workdone Report",
      description: "Completed work reports",
      image: "/report.svg",
      route: "/reports",
    },
    {
      name: "Spare Parts List",
      description: "Inventory management",
      image: "/parts.svg",
      route: "/spareparts",
    },
    {
      name: "Setup",
      description: "Hospital and equipment setup",
      image: "/setup.svg",
      route: "/setup",
    },
    {
      name: "Cargo Management",
      description: "Incoming and outgoing shipments",
      image: "/cargo.svg",
      route: "/cargo",
    },
    {
      name: "Tools",
      description: "Tool inventory and management",
      image: "/tools.svg",
      route: "/tools",
    },
    {
      name: "Settings",
      description: "System configuration",
      image: "/settings.svg",
      route: "/settings",
    },
  ];
  return (
    <Container>
      <Items clients={clients} />
    </Container>
  );
}
