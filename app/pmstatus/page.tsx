import { IconName } from "lucide-react/dynamic";
import Container from "../components/container";
import Items from "../components/items";
import StatsDashboard from "../components/status";

const PMStatus = () => {
  interface Client {
    name: string;
    description: string;
    icon: IconName;
    route: string;
  }
  const clients: Client[] = [
    {
      name: "Pending PM",
      description: "PMs awaiting completion",
      icon: "clock",
      route: "",
    },
    {
      name: "PM Done",
      description: "Completed PM records",
      icon: "circle-check",
      route: "",
    },
    {
      name: "Incomplete PM",
      description: "PMs requiring follow-up",
      icon: "circle-alert",
      route: "",
    },
    {
      name: "Add PM",
      description: "Create new PM records",
      icon: "circle-plus",
      route: "",
    },
  ];
  return (
    <>
      <Container>
        <StatsDashboard />
      </Container>
      <Container>
        <Items clients={clients} cols={4} />
      </Container>
    </>
  );
};
export default PMStatus;
