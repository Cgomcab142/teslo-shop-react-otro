import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/product.interface";
import { sleep } from "@/lib/sleep";

export const createUpdateProductAction = async (
  productLike: Partial<Product> & { files?: File[] },
): Promise<Product> => {
  await sleep(1000);

  const { id, user, images = [], files = [], ...data } = productLike;

  const isCreating = id === "new";

  data.stock = Number(data.stock || 0);
  data.price = Number(data.price || 0);


  if (files.length > 0) {
     const newImageNames =  await uploadFiles(files);
     images.push(...newImageNames);
  }

  const imagesToSave = images.map(image => {

    if (image.includes('http')) return image.split('/').pop() || '';
    return image;

  })



  const { data: api } = await tesloApi<Product>({
    url: isCreating ? "/products" : `/products/${id}`,
    method: isCreating ? "POST" : "PATCH",
    data: {
      ...data,
      images: imagesToSave
    },
  });

  return {
    ...api,
    images: api.images.map((image) => {
      if (image.includes("http")) return image;

      return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
    }),
  };
};




export interface FileUploadResponse {
  secureUrl: string;
  fileName: string;
}

const uploadFiles = async (files: File[]) => {
  const uploadPromise = files.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await tesloApi<FileUploadResponse>({
      url: "/files/product",
      method: "POST",
      data: formData,
    });
    return data.fileName;
  });
  const uploadFilesNames = await Promise.all(uploadPromise);
  return uploadFilesNames;
};
