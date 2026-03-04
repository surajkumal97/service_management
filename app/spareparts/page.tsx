import Container from "../components/container";
import Items from "../components/items";
import { IconName } from "lucide-react/dynamic";

const SpareParts = () => {
  interface SparePart {
    name: string;
    description: string;
    icon: IconName;
    route: string;
  }

  const spareParts: SparePart[] = [
    {
      name: "Return Parts",
      description: "Record parts being returned",
      icon: "corner-up-left",
      route: "returnparts",
    },
    {
      name: "Available Parts",
      description: "View parts currently in stock",
      icon: "layers",
      route: "availableparts",
    },
    {
      name: "Parts Replacement",
      description: "Replace faulty parts",
      icon: "refresh-ccw",
      route: "partsreplacement",
    },
    {
      name: "Parts Required",
      description: "Request parts needed",
      icon: "shopping-cart",
      route: "partsrequired",
    },
  ];

  return (
    <Container>
      <Items clients={spareParts} cols={2} />
    </Container>
  );
};

export default SpareParts;