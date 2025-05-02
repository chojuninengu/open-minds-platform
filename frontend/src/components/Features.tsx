import { BookOpenIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Card } from './common/Card';

const features = [
  {
    name: 'Comprehensive Courses',
    description: 'Access high-quality courses designed for African students, covering essential skills and knowledge.',
    icon: BookOpenIcon,
  },
  {
    name: 'Community Learning',
    description: 'Join a vibrant community of learners, collaborate on projects, and grow together.',
    icon: UserGroupIcon,
  },
  {
    name: 'AI-Powered Learning',
    description: 'Get personalized assistance from Nova, our AI learning companion, available 24/7.',
    icon: SparklesIcon,
  },
];

export const Features = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Learning Made Easy</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to succeed
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform combines modern technology with proven learning methods to help you achieve your goals.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.name} className="p-6">
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
                    <feature.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              </Card>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}; 