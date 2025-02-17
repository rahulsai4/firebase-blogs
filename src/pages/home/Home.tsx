import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import Post from "./Post";

export interface Post {
    id: string;
    userId: string;
    title: string;
    username: string;
    description: string;
}

const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const collectionRef = collection(db, "posts");
    const getPosts = async () => {
        const data = await getDocs(collectionRef);
        setPosts(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
        );
    };
    getPosts();

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div>
            {posts.map((post) => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    );
};

export default Home;
