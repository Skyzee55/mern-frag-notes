import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeft, Loader, TrashIcon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fecthNotes = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data.note);
      } catch (error) {
        toast.error("Failed Fetch Data");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fecthNotes();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <Loader className="animate-spin size-10" />
      </div>
    );
  }

  const handleDeleted = async () => {
    if(!window.confirm("Are you sure want delete this Notes?")) return

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Notes Success Deleted")
      navigate('/')
    } catch (error) {
      toast.error("Failed Delete Notes")
      console.log(error)
    }
  };
  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim()) {
      toast.error("Please add title or content")
      return
    }
    setSaving(true)

    try {
     await api.put(`/notes/${id}`, note) 
     toast.success('Success Update Notes')
     navigate('/')
    } catch (error) {
      toast.error('Failed Update Notes')
      console.log(error)
    }finally {
      setSaving(false)
    }
  };

  console.log("Notes", note);

  return (
    <div className="min-h-screen bg-base-200 ">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className=" btn btn-ghost">
              <ArrowLeft className="h-5 w-5" />
              Back To Notes
            </Link>
            <button
              onClick={handleDeleted}
              className="btn btn-error btn-outline">
              <TrashIcon className="size-5" />
              Deleted Notes
            </button>
          </div>

          {note && (
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label mb-2 block text-base font-medium text-gray-200">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered w-full"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label mb-2 block text-base font-medium text-gray-200 ">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32 w-full"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>


              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

            </div>
          </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
