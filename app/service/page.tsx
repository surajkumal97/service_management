import Container from "../components/container";
import Items from "../components/items";
import { IconName } from "lucide-react/dynamic";

const Service = () => {
  interface Service {
    name: string;
    description: string;
    icon: IconName;
    route: string;
  }
  const services: Service[] = [
    {
      name: "Breakdown Report",
      description: "Document equipment failure",
      icon: "alert-circle",
      route: "breakdown",
    },
    {
      name: "PM Report",
      description: "Preventive maintenance records",
      icon: "wrench",
      route: "breakdown",
    },
    {
      name: "Installation Report",
      description: "New equipment setup records",
      icon: "hammer",
      route: "breakdown",
    },
    {
      name: "Update Report",
      description: "Equipment upgrade records",
      icon: "rotate-cw",
      route: "breakdown",
    },
  ];
  return (
    <Container>
      <Items clients={services} cols={2} />
    </Container>
  );
};
export default Service;
