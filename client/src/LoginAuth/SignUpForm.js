import { React,useState} from 'react'
import { useFormik } from 'formik'
import '../App.css'
import Auth from '../services/AuthService/auth.service'
import { useNavigate } from 'react-router-dom'

const validate = (values) => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Required'
    console.log('20')
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
    console.log('21')

  }

  if (!values.fullName) {
    errors.fullName = 'Required'
  } else if (values.fullName.length > 15) {
    errors.fullName = 'Must be 15 characters or less'
  }

  if (!values.userName) {
    errors.userName = 'Required'
  } else if (values.userName.length > 20) {
    errors.userName = 'Must be 20 characters or less'
  }

  if (!values.password) {
    errors.userName = 'Required'
  } else if (values.password.length > 20) {
    errors.password = 'Please Enter Valid Password'
  }

  return errors
}

const SignupForm = () => {
  const [state, setMyState] = useState(false)
  let navigate = useNavigate()
  console.log('helo')

  // const formik = useFormik({
  //   initialValues: {
  //     email: '',
  //     fullName: '',
  //     userName: '',
  //     password: '',
  //   },
  //   validate,
  //   onSubmit: (values) => {
  //     Auth.signUp(values)
  //       .then((res) => {
  //         console.log(res)
  //         if (res.status === 201) {
  //           console.log(res.status)
  //           navigate('/LoginAuth')
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   },
  // })
    const formik = useFormik({
     initialValues: {
       email: '',
       fullName: '',
       userName: '',
       password:''

     },
     validate,
     onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
       console.log(validate)
       Auth.signUp(values)
        .then((res) => {
          console.log(res)
          if (res.status === 201) {
            console.log(res.status)
            navigate('/LoginAuth')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
     },
   );

  return (
    <form onSubmit={formik.handleSubmit} className="mt-4">
      <div
        className={state === 1 ? 'slw' : 'slws'}
        onClick={() => setMyState(1)}
      >
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="Enter your Email"
          className="outline-none bg-transparent w-full text-sm font-normal"
        />
      </div>
      {formik.errors.email ? <div className='text-red-400'>This Field is {formik.errors.email}</div> : null}


      <div
        className={state === 2 ? 'slw' : 'slws'}
        onClick={() => setMyState(2)}
      >
        <input
          id="fullName"
          name="fullName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.fullName}
          placeholder="Enter your Full Name"
          className="outline-none bg-transparent w-full text-sm font-normal"
        />
      </div>
      {formik.errors.fullName ? <div className='text-red-400'>This Field is {formik.errors.fullName}</div> : null}

      <div
        className={state === 3 ? 'slw' : 'slws'}
        onClick={() => setMyState(3)}
      >
        <input
          id="userName"
          name="userName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.userName}
          placeholder="Enter Your User Name"
          className="outline-none bg-transparent w-full text-sm font-normal"
        />
      </div>
      
      {formik.errors.userName ? <div className='text-red-400'>This Field is {formik.errors.userName}</div> : null}

      <div
        className={state === 4 ? 'slw' : 'slws'}
        onClick={() => setMyState(4)}
      >
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Password"
          className="outline-none bg-transparent w-full text-sm font-normal"
        />
      </div>
      {formik.errors.password ? <div className='text-red-400'>This Field is {formik.errors.password}</div> : null}


      <div className="text-gray-400 text-xs text-center">
        <div className="mb-3">
          People who use our service may have uploaded your contact information
          to Instagram. Learn More
        </div>
        <div className="mb-3">
          By signing up, you agree to our Terms , Privacy Policy and Cookies
          Policy .
        </div>
      </div>
      <div className="text-center text-white">
        <button
          type="submit"
          className="bg-sky-500 px-4 py-1 rounded-sm w-full"
        >
          Signup
        </button>
      </div>
    </form>
  )
}

export default SignupForm
