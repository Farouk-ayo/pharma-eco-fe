import { RocketIcon } from "../icons";

const ContactInfo = () => {
  return (
    <div className="lg:col-span-3">
      <h3 className="text-xl md:text-2xl font-semibold text-primaryDark mb-4 ">
        Subscribe To Our Newsletter
      </h3>

      <div className="flex relative">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 border border-none bg-primary/15 text-textPrimary rounded-b-[40px] rounded-t-[15px] focus:outline-none"
        />
        <button className=" absolute right-0 top-0 z-50 bg-primary text-white px-2 rounded hover:bg-primary/90 rounded-br-[40px] rounded-t-[15px] rounded-bl-[15px] transition-colors scale-75">
          <RocketIcon />
        </button>
      </div>
    </div>
  );
};

export default ContactInfo;
