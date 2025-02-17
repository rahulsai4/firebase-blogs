import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreateFormData {
    title: string;
    description: string;
}

const CreateForm = () => {
    const [user] = useAuthState(auth);
    const schema = yup.object().shape({
        title: yup.string().required("you must add a title"),
        description: yup.string().required("you must add a description"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();

    const collectionRef = collection(db, "posts");
    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(collectionRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid,
        });
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit(onCreatePost)}>
            <input
                placeholder="title..."
                {...register("title")}
                className="title"
            />
            <br />
            {errors.title && <p className="error">{errors.title?.message}</p>}
            <textarea
                placeholder="description..."
                {...register("description")}
                className="description"
            />
            <br />
            {errors.description && (
                <p className="error">{errors.description?.message}</p>
            )}
            <input type="submit" />
        </form>
    );
};

export default CreateForm;
