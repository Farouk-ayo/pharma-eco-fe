import Image from "next/image";
import { VerticalLine } from "../icons";

interface CardProps {
  image: string;
  title: string;
  description: string;
  id: string;
  backgroundColor: string;
  num: number;
}
export const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  backgroundColor,
  id,
  num,
}) => (
  <div className="relative flex flex-col items-center w-full">
    {/* Numbered/Lettered circle */}
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg z-20 mb-2"
      style={{
        backgroundColor: backgroundColor,
        boxShadow: `0 0 0 6px ${backgroundColor}50 `,
      }}
    >
      {num}
    </div>

    {/* Vertical line */}
    <div className="mb-2">
      <VerticalLine color={backgroundColor} fill={backgroundColor} />
    </div>
    <div className="bg-white  rounded-b-[120px] rounded-t-[30px] border overflow-hidden hover:shadow-lg transition flex flex-col justify-between">
      <div className="relative w-full h-72 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="p-6 flex-col flex justify-between min-h-[10rem] items-center text-center">
        <div className="flex flex-col items-center text-center">
          <h3 className="text-xl font-bold text-textPrimary mb-2">{title}</h3>

          <div
            className="text-gray-600 mb-4 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: description || "" }}
          />
        </div>
        <a
          href={`/articles/${id}`}
          className="text-primary font-semibold hover:underline flex items-center"
        >
          Read More <span className="ml-2 text-primary ">&rarr;</span>
        </a>
      </div>
    </div>
  </div>
);
