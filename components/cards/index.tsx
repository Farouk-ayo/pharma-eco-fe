import Image from "next/image";

interface CardProps {
  image: string;
  title: string;
  description: string;
  id: string;
}
export const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  id,
}) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col justify-between">
    <div className="relative w-full h-48 overflow-hidden">
      <Image
        src={image}
        alt={title}
        className="object-cover object-left"
        fill={true}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
      />
    </div>
    <div className="p-6 flex-col flex justify-between min-h-[20rem] items-center text-center">
      <div className="flex flex-col items-center text-center">
        <h3 className="text-xl font-bold text-green-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
      </div>
      <a
        href={`/articles/${id}`}
        className="text-primary font-semibold hover:underline flex items-center"
      >
        Read More <span className="ml-2 text-primary ">&rarr;</span>
      </a>
    </div>
  </div>
);
