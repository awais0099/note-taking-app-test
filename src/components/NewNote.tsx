import NoteForm from "./NoteForm";
import { NoteData, Tag } from "../App";

type NewNotePropsType = {
	onSubmit: (data: NoteData) => void,
	onAddTag: (data: Tag) => void,
	tags: Tag[]
}

function NewNote({onSubmit, onAddTag, tags}: NewNotePropsType) {
	return (
		<>
			<h1>NewNote</h1>
			<NoteForm onSubmit={onSubmit} onAddTag={onAddTag} tags={tags} />
		</>
	)
}

export default NewNote;