"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useGetRegisterUsers } from "@/lib/api/queries";

export default function ScrollingStats() {
  const { data: users, isPending: isLoadingUsers } = useGetRegisterUsers();
  console.log(users);
  const [usersCount, setUsersCount] = useState<number>(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (users) {
      setUsersCount(users.length);
    }
  }, [users]);

  useEffect(() => {
    if (!isLoadingUsers) {
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoadingUsers]);

  const usersData = [
    { id: 1, icon: "/regYellow.webp" },
    { id: 2, icon: "/regGreen.webp" },
  ];

  if (!isReady) {
    return;
  }

  return (
    <section className="px-4 lg:px-16 ">
      <div className="w-full overflow-hidden relative bg-primary flex gap-5 items-center justify-center rounded-t-[8px] rounded-b-[60px]">
        {usersData.map((item, index) => (
          <div
            key={index}
            className="hidden md:flex items-center justify-center"
          >
            <div className="flex items-center ">
              <div className="p-3 rounded-full">
                <Image
                  src={item.icon}
                  alt="Stat Icon"
                  width={40}
                  height={40}
                  className="rounded-full object-contain"
                />
              </div>
              <p className="text-white font-semibold text-base md:text-lg whitespace-nowrap">
                Number Of Registered Users:{" "}
                {isLoadingUsers ? "..." : usersCount}
              </p>
            </div>
          </div>
        ))}
        <div className="flex md:hidden items-center justify-center">
          <div className="flex items-center ">
            <div className="p-3 rounded-full">
              <Image
                src={usersData[0].icon}
                alt="Stat Icon"
                width={40}
                height={40}
                className="rounded-full object-contain"
              />
            </div>
            <p className="text-white font-semibold text-base md:text-lg whitespace-nowrap">
              Number Of Registered Users: {isLoadingUsers ? "..." : usersCount}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
