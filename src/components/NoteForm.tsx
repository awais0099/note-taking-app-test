import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CreatableReactSelect from 'react-select/creatable';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useRef, useState } from 'react';
import { Tag } from '../App';
import { NoteData } from '../App';
import { v4 as uuidV4 } from 'uuid';

type NoteFormProps = {
	onSubmit: (data: NoteData) => void,
	onAddTag: (data: Tag) => void,
	tags: Tag[]
}

function NoteForm({onSubmit, onAddTag, tags}: NoteFormProps) {
	const inputTitleRef = useRef<HTMLInputElement>(null);
	const markdownRef = useRef<HTMLTextAreaElement>(null);
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const navigate = useNavigate();

	// console.log({tags});

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		onSubmit({
			title: inputTitleRef.current!.value,
			markdown: markdownRef.current!.value,
			tags: [...selectedTags],
		});
		navigate("..");
	}

	// console.log({selectedTags});

	return (
		<Form onSubmit={handleSubmit}>
			<Stack gap={4}>
				<Row>
					<Col>
						<Form.Group controlId='title'>
							<Form.Label>Title</Form.Label>
							<Form.Control ref={inputTitleRef} required />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='tags'>
							<Form.Label>Tags</Form.Label>
							<CreatableReactSelect 
								isMulti
								onCreateOption={label => {
									const newTag = {id: uuidV4(), label: label};
									onAddTag(newTag);
									setSelectedTags(prevSelectedTags => {
										return [...prevSelectedTags, newTag];
									});
								}}
								options={tags.map(tag => ({ label: tag.label, value: tag.id }))}
								onChange={tags => {
									setSelectedTags(
										tags.map(tag => ({id: tag.value, label: tag.label}))
									)
								}}
								value={selectedTags.map(tag => {
									return { label: tag.label, value: tag.id }
								})}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Form.Group controlId='markdown'>
					<Form.Label>Body</Form.Label>
					<Form.Control ref={markdownRef} required as="textarea" rows={15} />
				</Form.Group>
				<Stack direction='horizontal' gap={2} className='justify-content-end'>
					<Button type="submit" variant='primary'>Save</Button>
					<Link to='..'>
						<Button type='button' variant='outline-secondary'>Cancel</Button>
					</Link>
				</Stack>
			</Stack>
		</Form>
	);
}

export default NoteForm;