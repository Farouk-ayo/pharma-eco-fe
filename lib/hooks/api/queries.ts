import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/axiosInstance";
import { ArticleResponse, CustomerService, RegisteredUser } from "@/lib/types";

export const useGetRegisterUsers = () => {
  return useQuery<RegisteredUser[]>({
    queryKey: ["get-register-user"],
    queryFn: async () => {
      const response = await axiosInstance.get("/register/get/");
      return response.data;
    },
  });
};

export const useGetArticles = () => {
  return useQuery<ArticleResponse[]>({
    queryKey: ["get-articles"],
    queryFn: async () => {
      const response = await axiosInstance.get("/article/get/");
      return response.data;
    },
  });
};

export const useGetArticle = (id: string) => {
  return useQuery<ArticleResponse>({
    queryKey: ["get-article", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/article/${id}`);
      return response.data;
    },
  });
};

export const useGetCustomer = () => {
  return useQuery<CustomerService[]>({
    queryKey: ["get-customer"],
    queryFn: async () => {
      const response = await axiosInstance.get("/customer/get/");
      return response.data;
    },
  });
};

export const useGetRegisterUser = (id: string) => {
  return useQuery<RegisteredUser>({
    queryKey: ["get-register-user", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/register/getuser/${id}`);
      return response.data;
    },
  });
};
