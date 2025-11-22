"use client";

import React from "react";
import { useGetArticles, useGetRegisterUsers } from "@/lib/api/queries";
import StatisticsCard from "./components/statisticsCard";
import UserCard from "./users/usersCard";
import ArticlesSection from "./articles/articlesCard";
import Button from "@/components/buttons";
import { ArticlesIcon, UsersIcon } from "@/components/icons";
import LoadingSkeleton from "@/components/loadingSkeleton";

const Dashboard = () => {
  const { data: users, isPending: isLoadingUsers } = useGetRegisterUsers();
  const { data: articles, isPending: isLoadingArticles } = useGetArticles();

  return (
    <div className="md:py-14 py-10 px-4 md:px-8 space-y-6">
      <h2 className="text-xl font-bold mb-4 text-primary">Statistics</h2>
      {isLoadingUsers || isLoadingArticles ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LoadingSkeleton count={2} type="card" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <StatisticsCard
            icon={<UsersIcon className="w-20 h-20 " />}
            title="Registered Users"
            value={users?.length || 0}
            color="white"
          />
          <StatisticsCard
            icon={<ArticlesIcon className="w-20 h-20 " />}
            title="Articles Uploaded"
            value={articles?.length || 0}
            color="white"
          />
        </div>
      )}
      <div>
        <h2 className="text-xl font-bold mb-4 text-primary">
          Registered Users
        </h2>
        <div className="grid gap-4">
          {isLoadingUsers ? (
            <LoadingSkeleton count={3} />
          ) : (
            users
              ?.slice(0, 1)
              .map((user, index) => <UserCard key={index} user={user} />)
          )}
          {!isLoadingUsers && (users?.length ?? 0) > 1 && (
            <Button
              variant="primary"
              href="/dashboard/users"
              className="text-sm bg-transparent hover:bg-transparent text-primary text-right font-semibold hover:underline"
            >
              View all
            </Button>
          )}
        </div>
      </div>
      <h2 className="text-xl font-bold mb-4 text-primary">Articles Uploaded</h2>
      {isLoadingArticles ? (
        <div className="space-y-4">
          <LoadingSkeleton count={5} type="table" />
        </div>
      ) : (
        <ArticlesSection articles={articles} />
      )}{" "}
    </div>
  );
};

export default Dashboard;
