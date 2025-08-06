const Footer = () => {
  return (
    <footer className="footer">  
      <div className="footer-text">
        <p>
          &copy; {new Date().getFullYear()} Hangar Talk. All rights reserved.
          <br />       
          Made with ❤️ by the Hangar Talk Team.  
        </p>
      </div>
    </footer>
  );
}

export default Footer;