"use client";
import React, { useEffect, useMemo, useState } from "react";
import Button from "@/components/buttons";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { showToast } from "@/lib/util";
import { z } from "zod";
import { ArticleCard, ArticleResponse } from "@/lib/types";
import LoadingSkeleton from "@/components/loadingSkeleton";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";

interface ArticleFormProps {
  initialData?: ArticleResponse;
  onSubmit?: (data: ArticleCard) => void;
  onDelete?: () => void;
  isFetching?: boolean;
  isLoading?: boolean;
  type?: "view" | "edit" | "add";
}

const ArticleForm: React.FC<ArticleFormProps> = ({
  initialData,
  onSubmit,
  onDelete,
  isFetching,
  isLoading,
  type: initialType,
}) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill-new"), { ssr: false }),
    []
  );
  const [formData, setFormData] = useState({
    Title: "",
    Author: "",
    Caption: "",
    Subtitle1: "",
    Subtitle2: "",
    Subtitle3: "",
    Subtitle4: "",
    Content1: "",
    Content2: "",
    Content3: "",
    Content4: "",
    articleImage1: "",
    articleImage2: "",
    articleImage3: "",
    articleImage4: "",
    images: [null, null, null, null] as (File | null)[],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        Title: initialData.Title || "",
        Author: initialData.Author || "",
        Caption: initialData.Caption || "",
        Subtitle1: initialData.Subtitle1 || "",
        Subtitle2: initialData.Subtitle2 || "",
        Subtitle3: initialData.Subtitle3 || "",
        Subtitle4: initialData.Subtitle4 || "",
        Content1: initialData.Content1 || "",
        Content2: initialData.Content2 || "",
        Content3: initialData.Content3 || "",
        Content4: initialData.Content4 || "",
        articleImage1: initialData.articleImage1Url || "",
        articleImage2: initialData.articleImage2Url || "",
        articleImage3: initialData.articleImage3Url || "",
        articleImage4: initialData.articleImage4Url || "",
        images: [null, null, null, null] as (File | null)[],
      });
      setPreviewUrls([
        initialData.articleImage1Url || null,
        initialData.articleImage2Url || null,
        initialData.articleImage3Url || null,
        initialData.articleImage4Url || null,
      ]);
    }
  }, [initialData]);

  const [previewUrls, setPreviewUrls] = useState<(string | null)[]>(() => [
    null,
    null,
    null,
    null,
  ]);
  const [type, setType] = useState(initialType);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => url && URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (file: File, index: number) => {
    try {
      const previewUrl = URL.createObjectURL(file);
      const newPreviewUrls = [...previewUrls];
      newPreviewUrls[index] = previewUrl;
      setPreviewUrls(newPreviewUrls);

      // Compress image
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        initialQuality: 0.8,
      });

      // Convert compressed image to base64
      const base64String = await convertToBase64(compressedFile);

      // Update formData with base64 string
      setFormData((prev) => ({
        ...prev,
        [`articleImage${index + 1}`]: base64String,
        images: prev.images.map((img, i) =>
          i === index ? compressedFile : img
        ),
      }));

      URL.revokeObjectURL(previewUrl);
    } catch (error) {
      showToast.error("Error processing image");
      console.error("Image processing error:", error);
    }
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    if (index !== undefined) {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          showToast.error("Please upload an image file");
          return;
        }
        handleImageChange(file, index);
      }
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleEditorChange = (content: string, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: content }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (
        !formData.Title ||
        !formData.Caption ||
        !formData.Subtitle1 ||
        !formData.Content1
      ) {
        showToast.error("Please fill in all required fields");
        return;
      }
      if (!formData.articleImage1 || !formData.articleImage2) {
        showToast.error("Please upload the first two images (required)");
        return;
      }

      const payload = {
        Title: formData.Title,
        Author: formData.Author,
        Caption: formData.Caption,
        Subtitle1: formData.Subtitle1,
        Subtitle2: formData.Subtitle2,
        Subtitle3: formData.Subtitle3,
        Subtitle4: formData.Subtitle4,
        Content1: formData.Content1,
        Content2: formData.Content2,
        Content3: formData.Content3,
        Content4: formData.Content4,
        articleImage1: formData.articleImage1,
        articleImage2: formData.articleImage2,
        articleImage3: formData.articleImage3,
        articleImage4: formData.articleImage4,
      };

      console.log(payload);
      if (onSubmit) {
        console.log(payload);
        onSubmit(payload);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        showToast.error(error.errors[0].message);
      } else {
        showToast.error("An error occurred while submitting the article");
      }
    }
  };

  if (isFetching) {
    return <LoadingSkeleton type="Article" count={1} />;
  }
  const handleEdit = () => {
    setType("edit");
    showToast.info("You can now edit the article.");
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "blockquote",
    "link",
  ];

  return (
    <div className="mx-auto p-4 md:p-6 bg-gray-50 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="my-6 flex flex-col md:flex-row gap-5 justify-between md:items-center">
          <h2 className="text-primary font-semibold text-lg">Add Article</h2>
          <div>
            {type === "edit" && (
              <Button
                type="submit"
                isLoading={isLoading}
                className="bg-primaryDark text-white w-40 py-2 rounded-lg"
              >
                Save
              </Button>
            )}
            {type === "add" && (
              <Button
                type="submit"
                isLoading={isLoading}
                className="bg-primaryDark text-white w-40 py-2 rounded-lg"
              >
                Add
              </Button>
            )}
            {type === "view" && (
              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={handleEdit}
                  className="bg-primaryDark text-white w-40 py-2 rounded-lg"
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  className="bg-red-600 hover:bg-red-500 text-white w-40 py-2 rounded-lg"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-300 bg-white rounded-lg h-96 w-full relative text-center">
          <label className="cursor-pointer flex flex-col items-center relative h-full w-full">
            <input
              disabled={type === "view"}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleChange(e, 0)}
            />

            {/* Display uploaded image */}
            {previewUrls[0] ? (
              <Image
                src={previewUrls[0]}
                alt="Uploaded file"
                layout="fill"
                objectFit="cover"
                className=" backdrop-brightness-0"
              />
            ) : null}

            {formData.images[0] || formData.articleImage1 ? (
              <div className="w-full h-full relative z-30 flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center w-full h-full"></div>
                <div className="w-20 h-20 relative z-30 flex items-center justify-center">
                  <Image
                    src={"/camera.svg"}
                    alt="Camera Icon"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col absolute inset-0  items-center justify-center bg-white  rounded-full">
                <div className="w-20 h-20 rounded-full  flex items-center justify-center text-white bg-primary text-6xl ">
                  +
                </div>
                <p className="mt-2 text-sm text-center text-gray-600">
                  Click here to upload a file or drag it in
                </p>
              </div>
            )}
          </label>
        </div>

        {/* Input Fields */}
        <div className="grid  mt-5">
          <label className="block  mt-4  text-sm font-semibold text-gray-700">
            Author
          </label>
          <input
            disabled={type === "view"}
            type="text"
            name="Author"
            placeholder="Enter author name"
            value={formData.Author}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <label className="block  mt-4  text-sm font-semibold text-gray-700">
            Title
          </label>
          <input
            disabled={type === "view"}
            type="text"
            name="Title"
            placeholder="Enter title"
            value={formData.Title}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />

          <label className="block  mt-4  text-sm font-semibold text-gray-700">
            Caption
          </label>
          <input
            disabled={type === "view"}
            type="text"
            name="Caption"
            placeholder="Enter small caption on the website"
            value={formData.Caption}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />

          <label className="block  mt-4  text-sm font-semibold text-gray-700">
            Subtitle 1
          </label>
          <input
            disabled={type === "view"}
            type="text"
            name="Subtitle1"
            placeholder="Enter subtitle 1"
            value={formData.Subtitle1}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <label className="block  mt-4  text-sm font-semibold text-gray-700">
            Content 1
          </label>

          {type === "view" ? (
            <div
              className="w-full border px-4 py-2 rounded-md bg-gray-50 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: formData.Content1 }}
            />
          ) : (
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={formData.Content1}
              onChange={(content) => handleEditorChange(content, "Content1")}
              className="bg-white border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary mb-6"
              placeholder="Enter content 1"
            />
          )}

          <label className="block  mt-4  text-sm font-semibold text-gray-700">
            Subtitle 2
          </label>
          <input
            disabled={type === "view"}
            type="text"
            name="Subtitle2"
            placeholder="Enter subtitle 2"
            value={formData.Subtitle2}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <label className="block  mt-4  text-sm font-semibold text-gray-700">
            Content 2
          </label>
          {type === "view" ? (
            <div
              className="w-full border px-4 py-2 rounded-md bg-gray-50 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: formData.Content2 }}
            />
          ) : (
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={formData.Content2}
              onChange={(content) => handleEditorChange(content, "Content2")}
              className="bg-white border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary mb-6"
              placeholder="Enter content 2"
            />
          )}

          <label className="block  mt-4  text-sm font-semibold text-gray-700">
            Subtitle 3 (Optional)
          </label>
          <input
            disabled={type === "view"}
            type="text"
            name="Subtitle3"
            placeholder="Enter subtitle 3"
            value={formData.Subtitle3}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <label className="block  mt-4  text-sm font-semibold text-gray-700">
            Content 3 (Optional)
          </label>

          {type === "view" ? (
            <div
              className="w-full  border px-4 py-2 rounded-md bg-gray-50 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: formData.Content3 }}
            />
          ) : (
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={formData.Content3}
              onChange={(content) => handleEditorChange(content, "Content3")}
              className="bg-white border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary mb-6"
              placeholder="Enter content 3"
            />
          )}

          <label className="block  mt-4  text-sm font-semibold text-gray-700">
            Subtitle 4 (Optional)
          </label>
          <input
            disabled={type === "view"}
            type="text"
            name="Subtitle4"
            placeholder="Enter subtitle 4"
            value={formData.Subtitle4}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <label className="block  mt-4  text-sm font-semibold text-gray-700">
            Content 4 (Optional)
          </label>
          {type === "view" ? (
            <div
              className="w-full border px-4 py-2 rounded-md bg-gray-50 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: formData.Content4 }}
            />
          ) : (
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={formData.Content4}
              onChange={(content) => handleEditorChange(content, "Content4")}
              className="bg-white border rounded-md mb-6 px-4 py-2  focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Enter content 4"
            />
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2  lg:grid-cols-4 gap-6 mt-6">
          {formData.images.map((image, index) => (
            <label
              key={index}
              className="cursor-pointer flex flex-col items-center"
            >
              <input
                disabled={type === "view"}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleChange(e, index)}
              />

              <div className="relative w-40 h-40 rounded-full border-2 border-dashed border-gray-400 bg-gray-200 flex items-center justify-center overflow-hidden">
                {previewUrls[index] ? (
                  <Image
                    src={previewUrls[index] || "/"}
                    alt={` `}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : null}

                {previewUrls[index] ? (
                  <div className="w-full h-full relative z-30 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center w-full h-full"></div>
                    <div className="w-10 h-10 relative z-30 flex items-center justify-center">
                      <Image
                        src={"/camera.svg"}
                        alt="Camera Icon"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-green-600 text-2xl font-bold">
                    +
                  </div>
                )}
              </div>

              <p className="mt-2 text-sm font-semibold text-gray-700">
                Content {index + 1} Img {index >= 2 ? "(Optional)" : ""}
              </p>
            </label>
          ))}
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;
