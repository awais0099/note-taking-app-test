import { Card, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import style from './NoteList.module.css';
import Badge from 'react-bootstrap/esm/Badge';
import { Tag } from '../App';

type simplifiedNote = {
    id: string,
    title: string,
    tags: Tag[],
}

function NoteCard({ id, title, tags }: simplifiedNote) {
    return (
        <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${style.card}`}>
            <Card.Body>
                <Stack gap={1} className='align-items-center justify-content-center'>
                    <span className='fs-5'>{title}</span>
                    <Stack gap={1} direction='horizontal' className='justify-content-center align-items-center flex-wrap'>
                        {tags.map(tag => (
                            <Badge key={tag.id} className='text-truncate'>
                                {tag.label}
                            </Badge>
                        ))}
                    </Stack>
                </Stack>
            </Card.Body>
        </Card>
    );
}

export default NoteCard