import { useEffect, useState } from "react";
import "./App.css";

import Auth from "./components/Auth";

import { db, auth, storage } from "./config/firebase";

import {
	getDocs,
	collection,
	addDoc,
	deleteDoc,
	doc,
	updateDoc,
} from "firebase/firestore";

import { ref, uploadBytes } from "firebase/storage";

function App() {
	const [movieList, setMovieList] = useState([]);

	// New movie
	const [newMovie, setNewMovie] = useState({
		title: "",
		releaseDate: "",
		oscar: false,
	});

	const [newTitle, setNewTitle] = useState("");

	// File upload
	const [fileUpload, setFileUpload] = useState(null);

	const movieCollectionRef = collection(db, "movies");

	const getMovieList = async () => {
		// Read the data from the db
		// Set the movie list to the state

		try {
			const data = await getDocs(movieCollectionRef);
			const filteredData = data.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));

			setMovieList(filteredData);
		} catch (err) {
			console.error(err);
		}
	};

	const addMovie = (data) => {
		// console.log(data.value)
		setNewMovie((prev) => ({
			...prev,
			[data.name]: data.name === "oscar" ? data.checked : data.value,
		}));
	};

	const submitMovie = async () => {
		try {
			await addDoc(movieCollectionRef, {
				...newMovie,
				userId: auth?.currentUser?.uid,
			});
			getMovieList();
		} catch (err) {
			console.error(err);
		}
	};

	const deleteMovie = async (id) => {
		try {
			const movieDoc = doc(db, "movies", id);
			await deleteDoc(movieDoc);
			getMovieList();
		} catch (err) {
			console.error(err);
		}
	};

	const updateTitle = async (id) => {
		const movieDoc = doc(db, "movies", id);
		await updateDoc(movieDoc, { title: newTitle });
		getMovieList();
	};

	const uploadFile = async () => {
		if (!fileUpload) return;

		const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);

		try {
			await uploadBytes(filesFolderRef, fileUpload);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getMovieList();
	}, []);

	return (
		<div>
			<Auth />
			<div>
				<input
					type="text"
					name="title"
					placeholder="Movie title"
					onChange={(e) => addMovie(e.target)}
				/>
				<input
					type="number"
					name="releaseDate"
					placeholder="release date"
					onChange={(e) => addMovie(e.target)}
				/>
				<input
					type="checkbox"
					name="oscar"
					onChange={(e) => addMovie(e.target)}
				/>
				<label htmlFor="">Recieved an Oscar</label>
				<button onClick={submitMovie}>Submit Movie</button>
			</div>
			<div>
				{movieList.map((movie) => {
					return (
						<div key={movie.id}>
							<h1
								style={{
									color: movie.oscar ? "green" : "red",
								}}
							>
								{movie.title}
							</h1>
							<p>Date: {movie.releaseDate}</p>
							<button onClick={() => deleteMovie(movie.id)}>
								Delete movie
							</button>

							<input
								type="text"
								placeholder="new title"
								onChange={(e) => setNewTitle(e.target.value)}
							/>
							<button onClick={() => updateTitle(movie.id)}>
								update title
							</button>
						</div>
					);
				})}
			</div>
			<div>
				<input
					type="file"
					onChange={(e) => setFileUpload(e.target.files[0])}
				/>
				<button onClick={uploadFile}>Upload file</button>
			</div>
		</div>
	);
}

export default App;
