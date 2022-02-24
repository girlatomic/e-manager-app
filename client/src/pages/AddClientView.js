import React, { useState } from 'react';


function AddUserView(props) {
    const [userName, setUserName] = useState('');

    function handleChange(event) {
        setUserName(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.addUserCb(userName);
        setUserName('');
    }

    return (
        <div className="AddUserView">
            <h2>Add Client</h2>
            <form onSubmit={handleSubmit}>
                <label>Name
                    <input
                        type="text"
                        value={userName}
                        onChange={handleChange}
                        required
                    />
                </label>
                
                <button type="submit">Add User</button>
            </form>
        </div>
    );
}

export default AddUserView;