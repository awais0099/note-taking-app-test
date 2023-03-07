import { useState } from 'react'
import { Button, Card, Col, Modal, Row, Stack } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';
import { Tag } from '../App';
import NoteCard from './NoteCard';
import EditTagsModal from './EditTagsModal';

type simplifiedNote = {
    id: string,
    title: string,
    tags: Tag[],
}

type NoteListProps = {
    availableTags: Tag[],
    notes: simplifiedNote[],
    onDeleteTag: (id: string) => void,
    onUpdateTag: (id: string, label: string) => void,
    onAddTag: (data: Tag) => void,
    modalData: {show: boolean, handleClose: (show: false|true) => void, handleShow: (show: false|true) => void}
}

function NoteList({ availableTags, notes, onDeleteTag, onUpdateTag, onAddTag, modalData }: NoteListProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState<string>('');

    const filteredNotes = notes && notes.filter((note) => {
        return (
            (note.title.toLowerCase().includes(title.toLowerCase())) &&
            (selectedTags.length === 0 || selectedTags.every(tag => {
                return note.tags.some(notetag => notetag.id === tag.id);
            }))
        )
    });

    return (
        <>
            <Row className='align-items-center mb-4'>
                <Col><h1>Note</h1></Col>
                <Col xs='auto'>
                    <Stack gap={2} direction='horizontal'>
                        <Link to="/new">
                            <Button type="button" variant='primary'>Create</Button>
                        </Link>
                        <Button type="button" variant='outline-secondary' onClick={() => modalData.handleShow(true)}>Edit Tags</Button>
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className='mb-4'>
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type='text' value={title} onChange={e => setTitle(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='tags'>
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect
                                isMulti
                                options={availableTags.map(tag => ({ label: tag.label, value: tag.id }))}
                                onChange={(selectOptions) => {
                                    setSelectedTags(
                                        selectOptions.map(option => {
                                            return { id: option.value, label: option.label }
                                        })
                                    )
                                }}
                                value={selectedTags.map(tag => ({ label: tag.label, value: tag.id }))}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row xs={1} sm={2} lg={3} xl={4} className='g-3'>
                {filteredNotes.map(note => (
                    <Col key={note.id}>
                        <NoteCard id={note.id} title={note.title} tags={note.tags} />
                    </Col>
                ))}
            </Row>
           
            <EditTagsModal
                tags={availableTags}
                onDeleteTag={onDeleteTag}
                onUpdateTag={onUpdateTag}
                onAddTag={onAddTag}
                modalData={modalData}
            />
        </>
    )
}

export default NoteList