import { ArrowLeftIcon } from 'lucide-react'
import {user} from '../lib/axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'

const Login = () => {
  
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [registering, setRegistering] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    if (!email.trim() || !password.trim()) {
      toast.error("All fields are required");
      return false;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (password.length < 6 || password.length > 12) {
      toast.error("Password length must be 6 to 12 characters!");
      return false;
    }
    return true;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setRegistering(true);
    try {
      await user.post("/new", {
        email,
        password
      })
      toast.success("Register Successful");
      navigate("/");
    } catch (error) {
      console.log("Error on register:", error);
      if(error.response.status === 429) {
        toast.error("Too many requests", {
          duration: 4000,
          icon: "💀"
        });
      } else if (error.response.status === 400) {
        toast.error("User already exists!");
      } else {
        toast.error("Incorrect password!");
      }
    } finally {
      setRegistering(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await user.post("/", {
        email,
        password
      })
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.log("Error on login:", error);
      if(error.response.status === 429) {
        toast.error("Too many requests", {
          duration: 4000,
          icon: "💀"
        });
      } else if (error.response.status === 404) {
        toast.error("User not found! Please register!");
      } else {
        toast.error("Incorrect password!");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <div className="card bg-base-100">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label htmlFor="email" className='label block'>
                    <span className='label-text'>Email</span>
                  </label>
                  <input type="text"
                    placeholder='Enter your email...'
                    id='email'
                    value={email}
                    className='input w-full input-bordered'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4">
                  <label htmlFor="password" className='label block'>
                    <span className='label-text'>Password</span>
                  </label>
                  <input type="password"
                    placeholder='Enter your password...'
                    id='password'
                    value={password}
                    className='input w-full input-bordered'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="card-actions justify-end">
                  <button type='submit' className='btn hover:bg-amber-800 hover:text-[#ece3ca]' disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                  </button>
                    <button type='button' className='btn hover:bg-amber-800 hover:text-[#ece3ca]' onClick={handleRegister} disabled={registering}>
                      {registering? "Loading..." : "Register"}
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
        
    </div>
  )
}

export default Login
