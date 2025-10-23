import {
  ArticleCard,
  CustomerService,
  LoginInputsPayload,
  RegisteredUser,
} from "@/lib/types";
import { showToast } from "@/lib/util";
import axiosInstance from "@/services/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const usePostRegister = () => {
  const mutationDetails = useMutation({
    mutationKey: ["post-register"],
    mutationFn: (registrationDetails: RegisteredUser) => {
      return axiosInstance.post("/register/add", registrationDetails);
    },
  });
  return mutationDetails;
};

export const usePostCustomer = () => {
  const mutationDetails = useMutation({
    mutationKey: ["post-customer"],
    mutationFn: (customerServiceDetails: CustomerService) => {
      return axiosInstance.post("/customer/add", customerServiceDetails);
    },
  });
  return mutationDetails;
};

export const usePostAdmin = () => {
  const mutationDetails = useMutation({
    mutationKey: ["post-admin"],
    mutationFn: (adminDetails: LoginInputsPayload) => {
      return axiosInstance.post("/admin/login", adminDetails);
    },
  });
  return mutationDetails;
};

export const useDeleteCustomerFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-customer-feedback"],
    mutationFn: (id: string) => {
      return axiosInstance.delete(`/customer/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-customer"] });
    },
    onError: (error) => {
      showToast.error(error.message);
    },
  });
};

export const useDeleteRegisteredUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-register-user"],
    mutationFn: (id: string) => {
      return axiosInstance.delete(`/register/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-register-user"] });
    },
    onError: (error) => {
      showToast.error(error.message);
    },
  });
};

export const usePatchRegisterUser = () => {
  const queryClient = useQueryClient();
  const mutationDetails = useMutation({
    mutationKey: ["update-register-user"],
    mutationFn: ({ _id, data }: { _id: string; data: RegisteredUser }) => {
      return axiosInstance.patch(`/register/${_id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-register-user"] });
      showToast.success("updated user successfully");
    },
    onError: (error: Error) => {
      showToast.error(error.message);
    },
  });
  return mutationDetails;
};

export const usePostArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["post-article"],
    mutationFn: (articleDetails: ArticleCard) => {
      return axiosInstance.post("/article/add", articleDetails);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-articles"] });
      showToast.success("Article posted successfully");
    },
    onError: (error: Error) => {
      showToast.error(error.message);
    },
  });
};

export const usePatchArticle = (articleId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["patch-article", articleId],
    mutationFn: (updatedDetails: ArticleCard) => {
      return axiosInstance.patch(`/article/${articleId}`, updatedDetails);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-articles"] });
      showToast.success("Article updated successfully!");
    },
    onError: (error: Error) => {
      showToast.error(error.message);
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-article"],
    mutationFn: (articleId: string) => {
      return axiosInstance.delete(`/article/${articleId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-articles"] });
      showToast.success("Article deleted successfully!");
    },
    onError: (error: Error) => {
      showToast.error(error.message);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["admin-logout"],
    mutationFn: async () => {
      return axiosInstance.post("/admin/logout");
    },
    onSuccess: () => {
      Cookies.remove("authToken");
      queryClient.invalidateQueries({ queryKey: ["admin-data"] });
      showToast.success("Logged out successfully!");
    },
    onError: (error: Error) => {
      showToast.error(error.message || "Logout failed!");
    },
  });
};
