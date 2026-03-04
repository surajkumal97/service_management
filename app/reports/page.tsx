import Container from "../components/container";
import Items from "../components/items";
import { IconName } from "lucide-react/dynamic";
const Reports = () => {
  interface Report {
    name: string;
    description: string;
    icon: IconName;
    route: string;
  }
  
  const Reports: Report[] = [
    {
      name: "Breakdown Reports",
      description: "Document equipment failure",
      icon: "alert-circle",
      route: "breakdownreports",
    },
    {
      name: "PM Work Done Reports",
      description: "Preventive maintenance records",
      icon: "wrench",
      route: "pmworkdonereports",
    },
    {
      name: "Installation Done Report",
      description: "New equipment setup records",
      icon: "hammer",
      route: "installationdonereport",
    },
    {
      name: "Update Done Reports",
      description: "Equipment upgrade records",
      icon: "rotate-cw",
      route: "updatedonereports",
    },
  ];

  return (
    <Container>
      <Items clients={Reports} cols={2} />
    </Container>
  );
};
export default Reports;