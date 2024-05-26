import { React } from 'react'
import { useState } from 'react'
import { useFormik } from 'formik'
import '../../App.css'
import ChangeProfilePicture from './ChangeProfilePicture';



const validate = values => {

    const errors = {};

    if (!values.email) {
        errors.email = 'Required';

    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.fullName) {
        errors.fullName = 'Required';
    } else if (values.fullName.length > 15) {
        errors.fullName = 'Must be 15 characters or less';
    }

    if (!values.userName) {
        errors.userName = 'Required';
    } else if (values.userName.length > 20) {
        errors.userName = 'Must be 20 characters or less';
    }

    if (!values.password) {
        errors.userName = 'Required';
    } else if (values.password.length > 20) {
        errors.password = "Please Enter Valid Password";
    }

    return errors;
};

const EditProfile = (props) => {
    const [state, setMyState] = useState(false);
     const{close}=props;
    const formik = useFormik({
        initialValues: {
            fullName: '',
            userName: '',
            password: '',
        },
        validate,
        onSubmit: values => {
        }
    });

    return (
        <div className='border h-screen bg-white px-10'>
            <div>
                <ChangeProfilePicture/> 
                <button onClick={close}>Close</button>
            </div>
            <div>
                <form onSubmit={formik.handleSubmit} className="mt-4">

                    <div className='flex'>
               
                        <aside className='px-8 basis-1/3 text-right'><label>Name</label></aside>
                        <div className={state === 1 ? 'slw basis-3/5' : 'slws basis-3/5'} onClick={() => setMyState(1)} >
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.fullName}
                                placeholder="Enter your Full Name"
                                className='outline-none bg-transparent w-full text-sm font-normal'

                            />
                        </div>
                    </div>

                    <div className='flex'>
                    <aside className='px-8 basis-1/3 text-right'><label>UserName</label></aside>
                        <div className={state === 2 ? 'slw basis-3/5' : 'slws basis-3/5'} onClick={() => setMyState(2)}>
                            <input
                                id="userName"
                                name="userName"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.userName}
                                placeholder="Enter your userName"
                                className='outline-none bg-transparent w-full text-sm font-normal'
                            />
                        </div>
                    </div>
                    {/* {formik.errors.fullName ? <div className='text-red-400'>This Field is {formik.errors.fullName}</div> : null} */}
                    <div className='flex'>
                    <aside className='px-8 basis-1/3 text-right'><label>Website</label></aside>
                        <div className={state === 3 ? 'slw basis-3/5' : 'slws basis-3/5'} onClick={() => setMyState(3)}>
                            <input
                                id="website"
                                name="website"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.website}
                                placeholder="Website"
                                className='outline-none bg-transparent w-10/12 text-sm font-normal'
                            />
                        </div>
                    </div>

                    <div className='flex'>
                    <aside className='px-8 basis-1/3 text-right'><label>Bio</label></aside>
                        <div className={state === 4 ? 'slw basis-3/5' : 'slws basis-3/5'} onClick={() => setMyState(4)}>
                            <input
                                id="Bio"
                                name="Bio"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.bio}
                                placeholder="Bio"
                                className='outline-none bg-transparent w-full text-sm font-normal'
                            />
                        </div>
                    </div>

                    <div className='flex'>
                    <aside className='px-8 basis-1/3 text-right'><label>Email</label></aside>
                        <div className={state === 4 ? 'slw basis-3/5' : 'slws basis-3/5'} onClick={() => setMyState(4)}>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.bio}
                                placeholder="Email"
                                className='outline-none bg-transparent w-full text-sm font-normal'
                            />
                        </div>
                    </div>

                    <div className='flex'>
                    <aside className='px-8 basis-1/3 text-right'><label>PhoneNumber</label></aside>
                        <div className={state === 5 ? 'slw basis-3/5' : 'slws basis-3/5'} onClick={() => setMyState(5)}>
                            <input
                                id="phoneNumber"
                                name="gender"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.bio}
                                placeholder="PhoneNumber"
                                className='outline-none bg-transparent w-full text-sm font-normal'
                            />
                        </div>
                        
                    </div>

                    <div className='flex'>
                    <aside className='px-8 basis-1/3 text-right'><label>Gender</label></aside>
                        <div className={state === 4 ? 'slw basis-3/5' : 'slws basis-3/5'} onClick={() => setMyState(4)}>
                            <input
                                id="Gender"
                                name="gender"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.bio}
                                placeholder="Gender"
                                className='outline-none bg-transparent w-full text-sm font-normal'
                            />
                        </div>
                        
                    </div>
                    
                    <div className='text-center text-white'>
                    <button type="submit" className='bg-sky-500 px-4 py-1 rounded-sm w-4/12'>Submit</button>
                    </div>

                    {/* <div className="text-gray-400 text-xs text-center">
                        <div className="mb-3">People who use our service may have uploaded your contact information to Instagram. Learn More</div>
                        <div className="mb-3">By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</div>
                    </div> */}
                    
                </form>

            </div>
        </div>
    );
};

export default EditProfile;