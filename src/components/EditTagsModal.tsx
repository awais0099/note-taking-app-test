import { useState } from 'react'
import { Button, Col, Modal, Row, Stack } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import CreatableReactSelect from 'react-select/creatable';
import { Tag } from '../App';
import { v4 as uuidV4 } from 'uuid';
import ReactDOM from 'react-dom';

type EditTagsModalProps = {
    tags: Tag[],
    onDeleteTag: (id: string) => void,
    onUpdateTag: (id: string, label: string) => void,
    onAddTag: (data: Tag) => void,
    modalData: { show: boolean, handleClose: (show: false | true) => void, handleShow: (show: false | true) => void }
}

function EditTagsModal({ tags, onDeleteTag, onUpdateTag, onAddTag, modalData }: EditTagsModalProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    return (
        <>
            <Modal show={modalData.show} onHide={() => modalData.handleClose(true)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Row className='mb-4'>
                            <Col>
                                <Form.Group controlId='tags'>
                                    <Form.Label>Tags</Form.Label>
                                    <CreatableReactSelect
                                        isMulti
                                        onCreateOption={label => {
                                            const newTag = { id: uuidV4(), label: label };
                                            onAddTag(newTag);
                                            setSelectedTags(prevSelectedTags => {
                                                return [...prevSelectedTags, newTag];
                                            });
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Stack gap={3}>
                            {tags.map(tag => (
                                <Row key={tag.id}>
                                    <Col>
                                        <Form.Control
                                            type='text'
                                            defaultValue={tag.label}
                                            onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                                        />
                                    </Col>
                                    <Col xs='auto'>
                                        <Button type='button' onClick={() => onDeleteTag(tag.id)}>X</Button>
                                    </Col>
                                </Row>
                            ))}
                        </Stack>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button type='button' variant="secondary" onClick={() => modalData.handleClose(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default EditTagsModal