import goku from '../../public/goku.png'
import auth from '../firebase/fire';
import { useEffect, useState } from 'react';

export default function Profile() {

    const [photoUrl, setPhotoURL] = useState(`${goku}`);

    function handleChange(){

    }

    function handleClick(){

    }

    useEffect(() =>{
        setPhotoURL(auth?.currentUser.photoURL)
    }, [auth?.currentUser])

    useEffect(() => {
        auth.currentUser.photoURL = photoUrl;
    }, [photoUrl])


    return (
        <div>
            <input type = "file" onChange = {handleChange} />
            <button onClick={handleClick}>Upload</button>
        </div>
    );
}