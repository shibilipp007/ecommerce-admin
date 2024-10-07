import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const schema = z.object({
  title: z.string(),
});

export default function Add() {
  const [file, setFile] = useState();
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      axios.post(
        `${import.meta.env.VITE_SERVER_URL}/categories`,
        { ...data, file },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (event) => {
    const image = event.target.files?.[0];
    if (image) {
      const reader = new FileReader();

      reader.onload = (evt) => {
        setFile(evt.target.result);
      };
      reader.readAsDataURL(image);
    }
  };

  return (
    <>
      <div className="py-5 mb-5" style={{ width: 800, marginInline: "auto" }}>
        <Button variant="dark" onClick={() => navigate(-1)} className="mb-3">
          Go back
        </Button>
        <div>
          <h1>Add categories</h1>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-3">
            <div className="col-2 text-right d-flex align-items-center justify-content-end">
              <label htmlFor="">category Name</label>
            </div>
            <div className="col-10">
              <Form.Control type="text" {...register("title")} />
            </div>
            <div className="row mb-3">
              <div className="col-2 text-right d-flex align-items-center justify-content-end">
                <label htmlFor="">Product images</label>
              </div>
              <div className="col-10">
                <Form.Control type="file" onChange={handleFileChange} />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <Button type="submit" className="rounded-pill">
              Create product
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
