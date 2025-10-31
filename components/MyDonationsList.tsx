"use client";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";
import toast from "react-hot-toast";

interface Post {
  id: string;
  title: string;
  description: string;
  amount: string;
  walletAddress: string;
}

interface Props {
  walletAddress: string;
}

export default function ListPosts({ walletAddress }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const q = query(
        collection(db, "posts"),
        where("creator", "==", walletAddress)
      );
      const querySnapshot = await getDocs(q);
      const postData = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as Post[];

      setPosts(postData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    try {
      await deleteDoc(doc(db, "posts", id));
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Post deleted!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete post");
    }
  };

  useEffect(() => {
    if (walletAddress) fetchPosts();
  }, [walletAddress]);

  if (loading)
    return <p className="text-gray-500 mt-4">Loading your posts...</p>;

  if (posts.length === 0)
    return <p className="text-gray-500 mt-4">No donation requests yet.</p>;

  return (
    <div className="w-full max-w-2xl mt-6">
      <h2 className="text-lg font-semibold mb-3">Your Active Donation Requests</h2>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4 shadow-sm">
            <h3 className="font-bold text-gray-800">{post.title}</h3>
            <p className="text-gray-600 mt-1">{post.description}</p>
            <p className="text-gray-700 mt-2 font-medium">
              Amount: {post.amount} APT
            </p>
            <button
              onClick={() => deletePost(post.id)}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
