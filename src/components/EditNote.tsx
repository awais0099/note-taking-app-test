import React, { FormEvent, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CreatableReactSelect from 'react-select/creatable';
import { useNote } from './NoteLayout';
import { NoteData, Tag } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';

type EditNoteProps = {
	onSubmit: (id:string, data: NoteData) => void,
	onAddTag: (data: Tag) => void,
	tags: Tag[]
}

function EditNote({tags, onSubmit, onAddTag}:EditNoteProps) {
    const note = useNote();
    const inputTitleRef = useRef<HTMLInputElement>(null);
	const markdownRef = useRef<HTMLTextAreaElement>(null);
	const [selectedTags, setSelectedTags] = useState<Tag[]>([...note.tags]);
    const navigate = useNavigate();
    
        console.log({note});
        
        function handleSubmit(e: FormEvent) {
            e.preventDefault();
            onSubmit(note.id, {
                title: inputTitleRef.current!.value,
                markdown: markdownRef.current!.value,
                tags: [...selectedTags],
            });
            navigate("..");
        }

    return (
        <>
            <h1>Edit Note</h1>
            <Form onSubmit={handleSubmit}>
                <Row gap={3}>
                    <Col>
                        <Form.Group>
                            <Form.Label>title</Form.Label>
                            <Form.Control type='text' ref={inputTitleRef} defaultValue={note.title} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
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
					<Form.Control ref={markdownRef} required defaultValue={note.markdown} as="textarea" rows={15} />
				</Form.Group>
				<Stack direction='horizontal' gap={2} className='justify-content-end'>
					<Button type="submit" variant='primary'>Save</Button>
					<Link to='..'>
						<Button type='button' variant='outline-secondary'>Cancel</Button>
					</Link>
				</Stack>
            </Form>
        </>
    )
}

export default EditNote