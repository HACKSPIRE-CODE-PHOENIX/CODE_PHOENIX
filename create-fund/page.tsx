"use client";
import { useState } from "react";
import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface CreatePostProps {
  walletAddress: string;
}

export default function Page({ walletAddress }: CreatePostProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async () => {
    if (!title.trim() || !description.trim() || !goal.trim()) {
      showError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "posts"), {
        title,
        description,
        goal: parseFloat(goal),
        creator: walletAddress,
        createdAt: serverTimestamp(),
      });
      setSuccess("Donation request created successfully!");
      setTitle("");
      setDescription("");
      setGoal("");
      setTimeout(() => setSuccess(null), 2000);
    } catch (err) {
      console.error(err);
      showError("Error creating post.");
    } finally {
      setLoading(false);
    }
  };

  const showError = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(null), 2000);
  };

  return (
    <div className="mt-8 p-6 border rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Create Donation Request
      </h2>

      {error && (
        <div className="bg-red-500 text-white text-sm px-3 py-2 rounded mb-3">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-500 text-white text-sm px-3 py-2 rounded mb-3">
          {success}
        </div>
      )}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded-lg px-3 py-2 w-full mb-3"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded-lg px-3 py-2 w-full mb-3 resize-none"
      />
      <input
        type="number"
        placeholder="Goal Amount (APT)"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        className="border rounded-lg px-3 py-2 w-full mb-4"
      />

      <button
        onClick={handleCreatePost}
        disabled={loading}
        className={`w-full px-4 py-2 rounded-lg text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Creating..." : "Create Post"}
      </button>
    </div>
  );
}
