import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Learn, Grow, and Share Knowledge
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Open Minds Platform is a free, community-driven learning platform where anyone can learn
            and share knowledge. Join us in making education accessible to everyone.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              to="/courses"
              className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Explore Courses
            </Link>
            <Link
              to="/about"
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}; 