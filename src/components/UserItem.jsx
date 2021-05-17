import React from 'react';
import './UserItem.css';

function UserItem(props) {
    const {name, email, isGoldClient, salary, alt, img, deleteUser, id} = props;

    return (
        <div className = "user-item">
            <img src={img} alt={alt} />
            <h3 className ="user-item-name">{ name }</h3>
            <p className ="user-item-email">{ email }</p>
            <p className="user-item-salary">{salary} </p>
           <div className="user-item-isgoldclient">
           { isGoldClient
                ? <h3>Client GOLD</h3>
                : null
            }
           </div>
           <button className ="user-item-button" onClick={ () => deleteUser(id)}>DELETE USER!</button>

    
        </div>
    );
}

export default UserItem;