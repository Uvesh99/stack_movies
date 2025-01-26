import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer>
        <div className='container'>
          <div className='box'>
            <ul className='flex'>
              <li><Link to="/terms-of-use">Terms of Use</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/watch-list">Watch List</Link></li>
            </ul>
            <p>Welcome to Movie Stack! We strive to bring you the best movie-watching experience, offering a seamless platform to explore and book tickets for your favorite movies. Thank you for choosing us as your go-to destination for entertainment.</p>
          </div>
          <div className='box'>
            <h3>Follow Us</h3>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className='fab fa-facebook-f'></i></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className='fab fa-twitter'></i></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"><i className='fab fa-github'></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className='fab fa-instagram'></i></a>
          </div>
          <div className='box'>
            <h3>Streamit App</h3>
            <div className='img flexSB'>
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                <img src='https://img.icons8.com/color/48/000000/apple-app-store--v3.png' alt="App Store" />
                <span>App Store</span>
              </a>
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                <img src='https://img.icons8.com/fluency/48/000000/google-play.png' alt="Google Play Store" />
                <span>Google Play Store</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer;
