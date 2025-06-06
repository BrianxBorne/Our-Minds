import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { Story } from '@/utils/types';

interface FeaturedStoryProps {
  stories: Story[];
  isLoading: boolean;
}

export function FeaturedStory({ stories, isLoading }: FeaturedStoryProps) {
  // Select the first featured story, or fallback to the first story
  const featuredStory = stories.find(story => story.is_featured) || stories[0];

  if (isLoading) {
    return (
      <div className="rounded-xl overflow-hidden shadow-md h-full flex flex-col">
        <div className="relative flex-grow">
          <Skeleton className="w-full h-full" />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-6">
            <Skeleton className="h-8 w-2/3 bg-gray-400 mb-2" />
            <Skeleton className="h-6 w-1/2 bg-gray-400" />
          </div>
        </div>
        <div className="p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex items-center mt-6">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="ml-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24 mt-1" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!featuredStory) {
    return (
      <div className="rounded-xl overflow-hidden shadow-md bg-gray-100 h-full flex items-center justify-center">
        <p className="text-gray-500">No stories available</p>
      </div>
    );
  }

  // Helper to truncate content without cutting words
  const truncateContent = (text: string, maxLength: number) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, text.lastIndexOf(' ', maxLength)) + '...';
  };

  return (
    <Link to={`/story/${featuredStory.id}`} className="block h-full">
      <div className="rounded-xl overflow-hidden shadow-md h-full flex flex-col">
        {/* Image section */}
        <div className="relative flex-grow">
          <img
            src={featuredStory.cover_image}
            alt={featuredStory.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/public/lovable-uploads/7646df82-fc16-4ccb-8469-742a8722685b.png';
            }}
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-6">
            <div
              className="text-white text-sm py-1 px-3 rounded inline-block mb-2"
              style={{ backgroundColor: `var(--story-tag-${featuredStory.tag_type})` }}
            >
              {featuredStory.tags[0]}
            </div>
            <h1 className="text-white text-2xl font-bold">{featuredStory.title}</h1>
          </div>
        </div>

        {/* Story heading and content */}
        <div className="p-6 flex flex-col justify-between h-full">
          <div>
            <h2 className="text-xl font-bold mb-4">Featured Story</h2>
            <p className="text-gray-600 mb-4">
              {truncateContent(featuredStory.content, 300)}
            </p>
          </div>

          {/* Author info directly after content */}
          <div className="flex items-center">
            <Avatar>
              <AvatarImage src={featuredStory.authorImage} />
              <AvatarFallback>
                {(featuredStory.authorName || 'Anonymous').charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="font-medium">
                {featuredStory.authorName || 'Anonymous'}
              </p>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(featuredStory.published_at), { addSuffix: true })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FeaturedStory;