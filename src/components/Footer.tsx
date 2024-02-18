import { FC } from 'react';

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; 2024 Study Hub Session. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
