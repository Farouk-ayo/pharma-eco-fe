interface HeaderProps {
  title: string;
  description: React.ReactNode;
  bg: string;
}

export default function Header({ title, description, bg }: HeaderProps) {
  return (
    <div className="relative px-4 lg:px-16 py-20 md:py-32 min-h-[537px] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full "
        style={{
          backgroundImage: `url(.${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0  bg-primary/80 " />

      <div className="relative w-full md:w-[90%] mx-auto p-5 z-20 md:p-10 flex flex-col gap-5 text-center">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white">
          {title}
        </h1>
        {description}
      </div>
    </div>
  );
}
