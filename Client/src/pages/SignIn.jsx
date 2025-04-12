// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';
// import AuthCard from '../components/AuthCard.jsx';
// import graphImg from '../assets/vaultt.png.png';
// import logo from '../assets/Alphafinancelogo.jpeg';
// import './sign.css'

// export default function SignIn() {
//   const [formData, setFormData] = useState({});
//   const { loading, error } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(signInStart());
//       const res = await fetch('http://localhost:3000/api/auth/signin', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(signInFailure(data.message));
//         return;
//       }

//       dispatch(signInSuccess(data));
//       navigate('/');
//     } catch (error) {
//       dispatch(signInFailure(error.message));
//     }
//   };

//   return (
//     <div className="container">
//       <div className="form-section">
//         <AuthCard
//           onSubmit={handleSubmit}
//           error={error}
//           footer={
//             <>
//               Don't have an account?
//               <Link to="/sign-up"><span className="signup-link"> Sign Up</span></Link>
//             </>
//           }
//         >
//           {/* ✅ Logo on top */}
//           <div style={{ display: 'flex', justifyContent: 'start', marginBottom: '1.5rem' }}>
//             <img src={logo} alt="AlphaFinance Logo" style={{ width: '150px' }} />
//           </div>

//           <div className="input-group">
//             <label>Email</label>
//             <input
//               type="email"
//               id="email"
//               placeholder="you@example.com"
//               value={formData.email || ''}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <label>Password</label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Password"
//               value={formData.password || ''}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </AuthCard>
//       </div>

//       <div className="visual-section">
//         <img src={graphImg} alt="Vault" className="vault-image" />
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import AuthCard from '../components/AuthCard.jsx';
import graphImg from '../assets/vaultt.png.png';
import logo from '../assets/Alphafinancelogo.jpeg';
import styles from './sign.module.css';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles['form-section']}>
        <AuthCard
          onSubmit={handleSubmit}
          error={error}
          footer={
            <>
              Don't have an account?
              <Link to="/sign-up">
                <span className={styles['signup-link']}> Sign Up</span>
              </Link>
            </>
          }
        >
          <div style={{ display: 'flex', justifyContent: 'start', marginBottom: '1.5rem' }}>
            <a href="/"> <img src={logo} alt="AlphaFinance Logo" style={{ width: '150px' }} /> </a>
          </div>

          <div className={styles['input-group']}>
            <label>Email</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={formData.email || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles['input-group']}>
            <label>Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password || ''}
              onChange={handleChange}
              required
            />
          </div>
        </AuthCard>
      </div>

      <div className={styles['visual-section']}>
        <img src={graphImg} alt="Vault" className={styles['vault-image']} />
      </div>
    </div>
  );
}
