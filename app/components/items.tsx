import Image from "next/image";
import Link from "next/link";

interface clients {
  name: string;
  description: string;
  image: string;
  route: string;
}
const Items = ({ clients }: { clients: clients[] }) => {
  return (
    <div className="grid gap-6 grid-cols-4">
      {clients.map((client, index) => {
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col items-center text-center"
          >
            <div className="bg-blue-100 p-4 rounded-full mb-4 card-icon">
              <Image
                src={client.image}
                alt="service"
                width={32}
                height={32}
                className="fas fa-wrench text-blue-600 text-3xl"
              ></Image>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {client.name}
            </h3>
            <p className="text-gray-500 mb-6">{client.description}</p>
            <Link
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center"
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
