const ModerateLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div>
      <div>{children}</div>;
    </div>
  );
};

export default ModerateLayout;
