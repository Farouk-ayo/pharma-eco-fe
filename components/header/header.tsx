import {
  BottomLeftIcon,
  BottomRightIcon,
  TopLeftIcon,
  TopRightIcon,
} from "../icons";

interface HeaderProps {
  title: string;
  description: React.ReactNode;
}

export default function Header({ title, description }: HeaderProps) {
  return (
    <div className="relative   top-24 px-4 lg:px-28 py-40 min-h-[600px] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full z-10"
        style={{
          backgroundImage: "url(./header-bg-texture.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0  bg-primary " />

      <div className="relative w-full md:w-[90%] mx-auto p-5 z-20 md:p-10 flex flex-col gap-5 text-center">
        <div className="absolute top-0 left-0 ">
          <TopLeftIcon />
        </div>
        <div className="absolute top-0 right-0 ">
          <TopRightIcon />{" "}
        </div>
        <div className="absolute bottom-0 left-0 ">
          <BottomLeftIcon />{" "}
        </div>
        <div className="absolute bottom-0 right-0 ">
          <BottomRightIcon />{" "}
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-secondary">
          {title}
        </h1>
        {description}
      </div>
    </div>
  );
}
