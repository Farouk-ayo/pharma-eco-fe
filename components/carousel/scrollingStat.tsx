"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useGetRegisterUsers } from "@/lib/hooks/api/queries";

export default function ScrollingStats() {
  const { data: users, isPending: isLoadingUsers } = useGetRegisterUsers();
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
    { id: 1, icon: "/regYellow.svg" },
    { id: 2, icon: "/regGreen.svg" },
    { id: 3, icon: "/regWhite.svg" },
  ];

  const duplicatedData = [...usersData, ...usersData];

  if (!isReady) {
    return;
  }

  return (
    <div
      className="w-full overflow-hidden relative"
      style={{
        backgroundImage: "url('./regBg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#023022E8]/95 via-[#157D18B8]/48 to-[#157D18B8]/70 bg-[#157D18]/50 md:bg-transparent" />
      <motion.div
        key={isReady ? "ready" : "loading"}
        className="flex w-max whitespace-nowrap gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        }}
      >
        {duplicatedData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center min-w-[300px]"
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
      </motion.div>
    </div>
  );
}
