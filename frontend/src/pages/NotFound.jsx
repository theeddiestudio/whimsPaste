import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-outline hover:bg-amber-800 hover:text-[#ece3ca]">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;