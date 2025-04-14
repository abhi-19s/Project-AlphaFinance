import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            // Use the Firebase user data directly
            const userData = {
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
                // Add any other relevant user data
            };

            dispatch(signInSuccess(userData)); // Dispatch to Redux
            navigate('/'); // Navigate to the home page

        } catch (error) {
            console.log('could not sign in with google', error);
        }
    };

    return (
        <button
            onClick={handleGoogleClick}
            type='button'
            className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
        >
            Continue with google
        </button>
    );
}