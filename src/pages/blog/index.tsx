import { Helmet } from "react-helmet-async";
import { useState } from "react";
import type { BlogTag } from "@/types/blog";
import { useBlogs } from "@/hooks/useBlogQueries";
import BlogCardSkeleton from "@/components/cards/BlogCardSkeleton";
import FeaturedCard from "@/components/cards/FeaturedCard";
import BlogCard from "@/components/cards/BlogCard";
import PageContainer from "@/components/PageContainer";

const TAGS = ["All", "Announcement", "Drivers", "Users", "Guide", "Updates"];

export default function BlogList() {
  const [activeTag, setActiveTag] = useState("All");
  const { data: posts, isLoading, isError } = useBlogs();

  const featured = posts?.find((p) => p.featured);
  const filtered = (posts ?? [])
    .filter((p) => !p.featured)
    .filter((p) => activeTag === "All" || p.tag === (activeTag as BlogTag));

  const showFeatured = activeTag === "All" && featured;

  return (
    <section className="min-h-screen bg-gray-50 pt-24 pb-16">
      <Helmet>
        <title>Blog – News, Guides & Updates | FastMet</title>
        <meta
          name="description"
          content="Stay up to date with FastMet news, driver guides, user tips, and company announcements. Everything happening at FastMet — straight from the team."
        />
        <link rel="canonical" href="https://fastmet.com.ph/blog" />
      </Helmet>
      <PageContainer>
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            FastMet Blog
          </p>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">
            News, guides & updates
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Everything happening at FastMet — straight from the team.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap mb-8">
          {TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                activeTag === tag
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-500 hover:border-primary/40 hover:text-primary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <p className="text-sm text-red-400 text-center py-20">
            Failed to load posts. Please try again later.
          </p>
        ) : filtered.length === 0 && !showFeatured ? (
          <div className="py-20 text-center text-gray-400 text-sm">
            No posts in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {showFeatured && <FeaturedCard post={featured!} />}
            {filtered.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </PageContainer>
    </section>
  );
}
