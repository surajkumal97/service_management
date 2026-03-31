import Container from "../components/container";
import Items from "../components/items";
import { CornerUpLeft, Layers, RefreshCcw, ShoppingCart } from "lucide-react";

const SpareParts = () => {
  const spareParts = [
    {
      name: "Return Parts",
      description: "Record parts being returned",
      icon: "corner-up-left" as const,
      route: "/spareparts/return",
    },
    {
      name: "Available Parts",
      description: "View parts currently in stock",
      icon: "layers" as const,
      route: "/spareparts/available",
    },
    {
      name: "Parts Replacement",
      description: "Replace faulty parts",
      icon: "refresh-ccw" as const,
      route: "/spareparts/replacement",
    },
    {
      name: "Parts Required",
      description: "Request parts needed",
      icon: "shopping-cart" as const,
      route: "/spareparts/required",
    },
  ];

  return (
    <Container>
      <Items clients={spareParts} cols={2} />
    </Container>
  );
};

export default SpareParts;
