import { BookOpenIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Courses',
    description: 'Learn from comprehensive courses',
    icon: BookOpenIcon,
  },
  {
    name: 'Community',
    description: 'Join fellow learners',
    icon: UserGroupIcon,
  },
  {
    name: 'AI Assistant',
    description: 'Get instant help',
    icon: SparklesIcon,
  },
];

export const Features = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-primary-600">Features</h2>
        <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Learn effectively
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-2xl sm:mt-16 lg:mt-20 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                <feature.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                {feature.name}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}; 