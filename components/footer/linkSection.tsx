import Link from "next/link";

interface QuickLinks {
  link: string;
  name: string;
}

interface LinkSectionProps {
  title: string;
  links: QuickLinks[];
}

const LinkSection: React.FC<LinkSectionProps> = ({ title, links }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-primaryDark mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((item) => (
          <li key={item.name}>
            <Link
              href={item.link}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default LinkSection;
