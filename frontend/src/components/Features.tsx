import { BookOpenIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Comprehensive Courses',
    description: 'Access a wide range of courses across various subjects, all designed to help you learn effectively.',
    icon: BookOpenIcon,
  },
  {
    name: 'Community Learning',
    description: 'Join a vibrant community of learners, share knowledge, and grow together.',
    icon: UserGroupIcon,
  },
  {
    name: 'AI-Powered Assistant',
    description: 'Get instant help and personalized learning support from our AI assistant, Nova.',
    icon: SparklesIcon,
  },
];

export const Features = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-primary-600">Why Choose Us</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Everything you need to learn effectively
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Our platform combines the power of community learning with modern technology to provide you
          with the best learning experience possible.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                <feature.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                {feature.name}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                <p className="flex-auto">{feature.description}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}; 