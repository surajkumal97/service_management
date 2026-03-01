const Container = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  return <section className="max-w-7xl mx-auto px-4 py-6">{children}</section>;
};
export default Container;
