import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.string(),
  quantity: z.string(),
  category: z.string(),
});

export default function New() {
  const { data: categories } = useLoaderData();
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  const handleFileChange = (e) => {
    const files = e.target.files;

    if (files) {
      [...files].map((file) => {
        const reader = new FileReader();

        reader.onload = (evt) => {
          setImages((prev) => [
            ...prev,
            { id: crypto.randomUUID(), src: evt.target.result },
          ]);
        };

        reader.readAsDataURL(file);
      });
    }
  };

  const deleteImage = (id) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  };

  const onSubmit = async (data) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/products`,
        { ...data, images: images.map((image) => image.src) },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-5 mb-5" style={{ width: 800, marginInline: "auto" }}>
      <Button variant="dark" onClick={() => navigate(-1)} className="mb-3">
        Go back
      </Button>
      <h1 className="mb-5">Create a product</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-3">
          <div className="col-2 text-right d-flex align-items-center justify-content-end">
            <label htmlFor="">Product name</label>
          </div>
          <div className="col-10">
            <Form.Control type="text" {...register("title")} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-2 text-right d-flex align-items-center justify-content-end">
            <label htmlFor="">Description</label>
          </div>
          <div className="col-10">
            <Form.Control as={"textarea"} {...register("description")} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-2 text-right d-flex align-items-center justify-content-end">
            <label htmlFor="">Price</label>
          </div>
          <div className="col-10">
            <InputGroup>
              <InputGroup.Text>&#8377;</InputGroup.Text>
              <Form.Control type="number" {...register("price")} />
            </InputGroup>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-2 text-right d-flex align-items-center justify-content-end">
            <label htmlFor="">Product stock</label>
          </div>
          <div className="col-10">
            <Form.Control type="number" {...register("quantity")} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-2 text-right d-flex align-items-center justify-content-end">
            <label htmlFor="">Category</label>
          </div>
          <div className="col-10">
            <Form.Select {...register("category")}>
              <option value="0">--Select Category--</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-2 text-right d-flex align-items-center justify-content-end">
            <label htmlFor="">Product images</label>
          </div>
          <div className="col-10">
            <Form.Control type="file" multiple onChange={handleFileChange} />
          </div>
        </div>
        {images.length > 0 && (
          <div className="row mb-3">
            <div className="col-2 text-right d-flex align-items-center justify-content-end">
              <div className="visually-hidden">image previews</div>
            </div>
            <div className="col-10">
              <div className="row">
                {images.map((img) => (
                  <div key={img.id} className="col-3">
                    <div className="p-relative">
                      <img src={img.src} style={{ maxWidth: "100%" }} />
                      <Button
                        variant="danger"
                        onClick={() => deleteImage(img.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="d-flex justify-content-end">
          <Button type="submit" className="rounded-pill">
            Create product
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function newLoader() {
  const response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/categories`
  );
  return { data: response.data };
}
