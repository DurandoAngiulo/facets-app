"use client";

const AppFooter = () => {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      &copy; {currentYear} | Facets
    </footer>
  );
};

export default AppFooter;
