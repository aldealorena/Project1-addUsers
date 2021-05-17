import React from 'react';
import UserItem from './UserItem';
import './UserList.css';

function UserList(props) {
    const { users, salary, img, alt, deleteUser} = props;

    return (
        <div className="user-list">
            <h2>Lista utilizatorilor:</h2>
            { users.map((user, index) => {
                return <UserItem
                    id={ user.id }
                    name={ user.name }
                    email={ user.email }
                    isGoldClient={ user.isGoldClient }
                    salary = {salary}
                    img = { img}
                    alt={alt}
                    key={ index }
                    deleteUser={deleteUser} 

                />
            })}
        </div>
    );
}

export default UserList;