import React from 'react'
import PostListItem from '../post-list-item/post-list-item'
import { List, ListGroup, ListInlineItem } from 'reactstrap';
const PostList = ({props, onDelete, onToggleLiked, onToggleImportant}) => {
  
   const elements = props.map(element=> {
      const {id, ...elem} = element;
      return (
         <li key={id} className="list-group-item">
            <PostListItem 
            {...elem}
            onToggleLiked ={ () => onToggleLiked(id)}
            onToggleImportant ={ () => onToggleImportant(id)}
            onDelete={() => onDelete(id)}
            ></PostListItem>
         </li>
      )
   })

   return (
      <ListGroup className="app-list list-group">
         {elements}
      </ListGroup>
   )

} 
export default PostList;