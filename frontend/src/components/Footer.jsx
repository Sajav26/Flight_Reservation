const Footer = () => {
  return (
    <footer className="footer">
      <h3>SkyBook</h3>
      <p>Your journey starts with us.</p>

      <p className="footer-copy">
        © {new Date().getFullYear()} SkyBook. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;