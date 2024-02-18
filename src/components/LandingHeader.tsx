import { FC } from 'react';

interface LandingHeaderProps {}

const LandingHeader: FC<LandingHeaderProps> = ({}) => {
  return (
    <div className="bg-gray-100 py-10 px-6 mb-3">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Welcome to the Study Hub Session Web App
        </h2>
        <p className="text-lg text-gray-600">
          Our web app provides a platform for students to collaborate and
          organize study sessions efficiently. Whether you&apos;re working on a
          group project, preparing for exams, or simply looking for study
          partners, our app offers the tools you need to succeed.
        </p>
      </div>
    </div>
  );
};

export default LandingHeader;
