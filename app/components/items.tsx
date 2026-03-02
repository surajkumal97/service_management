import Link from "next/link";
import { IconRenderer } from "./icons/IconRenderer";
import { IconName } from "lucide-react/dynamic";

interface Client {
  name: string;
  description: string;
  icon: IconName;
  route: string;
}

const Items = ({ clients, cols }: { clients: Client[]; cols: 2 | 4 }) => {
  const column: Record<2 | 4, string> = {
    2: "grid gap-6 grid-cols-2",
    4: "grid gap-6 grid-cols-4",
  };

  return (
    <div className={`${column[cols]}`}>
      {clients.map((client, index) => {
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-200"
          >
            <div className="bg-blue-100 p-4 rounded-full mb-4 flex justify-center items-center">
              <IconRenderer
                name={client.icon}
                className="w-8 h-8 text-blue-600"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {client.name}
            </h3>
            <p className="text-gray-500 mb-6">{client.description}</p>
            <Link
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 mt-auto"
              href={client.route}
            >
              View
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Items;
