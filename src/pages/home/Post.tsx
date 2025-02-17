import { useEffect, useState } from "react";
import { Post as PostI } from "./Home";
import {
    addDoc,
    deleteDoc,
    collection,
    query,
    where,
    getDocs,
    doc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
    post: PostI;
}

interface Like {
    userId: string;
    likeId: string;
}

const Post = (props: Props) => {
    const { post } = props;
    const [user] = useAuthState(auth);
    const likesRef = collection(db, "likes");
    const [likes, setLikes] = useState<Like[]>([]);

    const likesDoc = query(likesRef, where("postId", "==", post.id));
    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(
            data.docs.map((doc) => ({
                userId: doc.data().userId,
                likeId: doc.id,
            }))
        );
    };

    useEffect(() => {
        getLikes();
    }, []);

    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, {
                postId: post.id,
                userId: user?.uid,
            });
            if (user) {
                setLikes((prev) =>
                    prev
                        ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
                        : [{ userId: user?.uid, likeId: newDoc.id }]
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query(
                likesRef,
                where("postId", "==", post.id),
                where("userId", "==", user?.uid)
            );
            const likeToDeleteData = await getDocs(likeToDeleteQuery);

            const likeToDelete = doc(db, "likes", likeToDeleteData.docs[0].id);
            const likeId = likeToDeleteData.docs[0].id;

            await deleteDoc(likeToDelete);
            if (user) {
                setLikes((prev) =>
                    prev.filter((like) => like.likeId !== likeId)
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const hasUserLiked = likes.find((like) => like.userId === user?.uid);

    return (
        <div className="post">
            <div className="post-title">
                <h1>{post.title}</h1>
            </div>
            <div className="post-body">
                <p>{post.description}</p>
            </div>
            <div className="post-footer">
                <>@{post.username}</>
                {"    "}
                <button onClick={hasUserLiked ? removeLike : addLike}>
                    {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
                </button>
                <p>likes : {likes.length}</p>
            </div>
        </div>
    );
};

export default Post;
