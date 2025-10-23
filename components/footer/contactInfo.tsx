import { MapPin, Mail, Phone, Rocket } from "lucide-react";

const ContactInfo = () => {
  return (
    <div>
      <h3 className="text-xl font-bold text-primaryDark mb-4">Contact Info</h3>
      <ul className="space-y-4">
        <li className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 !text-white fill-black mt-1 flex-shrink-0" />
          <span className="text-gray-600">OAU, Ile-Ife, Osun State</span>
        </li>
        <li className="flex items-center space-x-3 flex-wrap">
          <Phone className="w-5 h-5 !text-white fill-black flex-shrink-0" />
          <a
            href="tel:+2348079508822"
            className="text-gray-600 hover:text-primary transition"
          >
            +2348079508822
          </a>
          <span className="text-gray-600">/</span>
          <a
            href="tel:+2349039539042"
            className="text-gray-600 hover:text-primary transition"
          >
            +2349039539042
          </a>
        </li>
        <li className="flex items-center space-x-3">
          <Mail className="w-5 h-5 !text-white fill-black flex-shrink-0" />
          <a
            href="mailto:pharmabin@gmail.com"
            className="text-gray-600 hover:text-primary transition"
          >
            pharmabin@gmail.com
          </a>
        </li>
      </ul>
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-primaryDark mb-3">
          Subscribe To Our Newsletter
        </h4>
        <div className="flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-none bg-white rounded-l focus:outline-none"
          />
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">
            <Rocket className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
