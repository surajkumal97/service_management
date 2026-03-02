import { DynamicIcon, IconName } from "lucide-react/dynamic";
interface IconRendererProps {
  name: IconName;
  className?: string;
}

export function IconRenderer({
  name,
  className = "w-8 h-8 text-blue-600",
}: IconRendererProps) {
  console.log(name);
  return <DynamicIcon name={name} className={className} />;
}
