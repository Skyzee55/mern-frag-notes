import axios from "axios";
import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post("/notes/add", {
        title,
        content,
      });
      toast.success("Notes Success Create");
      navigate("/");
    } catch (error) {
      console.log(`Error Bang : ${error}`)
      if (error.response.status === 429) {
        toast.error("Slowdown Bitch", {
          duration: "4000",
        });
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8 ">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back To Home
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Notes</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="mb-2 block text-base font-medium text-gray-200">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="mb-2 block text-base font-medium text-gray-200">
                    Title
                  </label>
                  <textarea
                    placeholder="Write Your Notes Here..."
                    className="textarea textarea-bordered h-32 w-full"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end ">
                  <button className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? "Creating....." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
