import {FaSearch} from 'react-icons/fa'
import { Link, Links } from 'react-router-dom';
const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/"> 
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Ifiinsho</span>
          <span className="text-slate-700">Auto</span>
        </h1> 
        </Link>
        <form className='flex iteam-center bg-slate-100 rounded-lg p-3'>
          <input type='text' placeholder='search...' className='bg-transparents focus:outline-none w-24 sm:w-64' />
          <FaSearch className='text-slate-600' />
        </form>
        <ul className='flex gap-4'>
          <Link 
          className='hidden sm:inline text-slate-700 hover:underline' to="/"
          >
          Home
          </Link>
          <Link className='text-slate-700 hover:underline' to="/About">About</Link>
          <Link className='text-slate-700 hover:underline' to="/Signing">Signing</Link>
          
      
        </ul>

      </div>
    </header>
  );
};

export default Header;