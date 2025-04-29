
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    bio: 'Passionate about making education accessible to everyone.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Michael Chen',
    role: 'Head of Education',
    bio: 'Expert in curriculum development and online learning.',
    imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Community Manager',
    bio: 'Building bridges between learners and educators.',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

export default function About() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              About Open Minds
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              We're on a mission to democratize education and make high-quality learning accessible to
              everyone, everywhere.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
              <CardDescription>
                To provide free, high-quality education to anyone who wants to learn, breaking down
                barriers to education and fostering a global community of lifelong learners.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                We believe that education is a fundamental human right and that everyone deserves access
                to quality learning resources, regardless of their background or circumstances.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
              <CardDescription>
                A world where quality education is accessible to all, empowering individuals to reach
                their full potential and contribute to their communities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                We envision a future where geographical location, economic status, or social background
                are no longer barriers to accessing world-class education.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Meet Our Team
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            We're a passionate team of educators, technologists, and lifelong learners dedicated to
            making education accessible to all.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {teamMembers.map((person) => (
            <li key={person.name}>
              <img
                className="aspect-[3/2] w-full rounded-2xl object-cover"
                src={person.imageUrl}
                alt=""
              />
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                {person.name}
              </h3>
              <p className="text-base leading-7 text-primary-600">{person.role}</p>
              <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">{person.bio}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Join Our Mission
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Be part of our community and help us make education accessible to everyone. Start learning
            or share your knowledge today.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild>
              <Link to="/courses">Explore Courses</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/community">Join Community</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 