import React from 'react';

export type CommentType = {
    id: number,
    name: string,
    email: string,
    body: string,
    removeComments: (id: number) => void
}

const Comment = (props: CommentType) => {
    return (
        <div className={'coment'}>
            <span><button onClick={()=> props.removeComments(props.id)}>remove</button></span>
            <div>
                {props.name}
            </div>
            <div>
                {props.email}
            </div>
            <div>
                {props.body}
            </div>

        </div>
    );
};

export default Comment;
