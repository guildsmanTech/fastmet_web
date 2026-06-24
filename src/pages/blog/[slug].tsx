import {useParams, Link, useNavigate} from "react-router-dom";
import {CalendarDays, Clock, ArrowLeft, ArrowRight, Tag} from "lucide-react";
import type {IBlogPost} from "@/types/blog";
import {useBlog} from "@/hooks/useBlogQueries";

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-PH", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const tagColors: Record<string, string> = {
  Announcement: "bg-primary/10 text-primary",
  Drivers: "bg-sky-100 text-sky-700",
  Users: "bg-violet-100 text-violet-700",
  Guide: "bg-green-100 text-green-700",
  Updates: "bg-amber-100 text-amber-700",
};

// ── Skeleton ──────────────────────────────────────────────────────────────

function BlogPostSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Banner skeleton */}
      <div className="w-full h-64 md:h-[480px] bg-gray-200 mb-10" />
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex gap-12">
          <div className="flex-1 space-y-4">
            <div className="h-4 w-24 bg-gray-200 rounded-full" />
            <div className="h-8 w-full bg-gray-200 rounded" />
            <div className="h-8 w-3/4 bg-gray-200 rounded" />
            <div className="space-y-2 pt-6">
              {Array.from({length: 8}).map((_, i) => (
                <div
                  key={i}
                  className={`h-3 bg-gray-100 rounded ${i % 4 === 3 ? "w-2/3" : "w-full"}`}
                />
              ))}
            </div>
          </div>
          <div className="hidden lg:block w-72 shrink-0 space-y-3">
            <div className="h-32 bg-gray-100 rounded-2xl" />
            <div className="h-48 bg-gray-100 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Related post card ─────────────────────────────────────────────────────

function RelatedCard({post}: {post: IBlogPost}) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-150"
    >
      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
        <img
          src={post.heroImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit mb-1 ${tagColors[post.tag] ?? "bg-gray-100 text-gray-500"}`}
        >
          {post.tag}
        </span>
        <p className="text-xs font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </p>
        <span className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
          <Clock className="size-2.5" />
          {post.readTime} min read
        </span>
      </div>
    </Link>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────

export default function BlogPost() {
  const {slug} = useParams<{slug: string}>();
  const navigate = useNavigate();
  const {data: post, isLoading, isError} = useBlog(slug!);

  if (isLoading)
    return (
      <section className="min-h-screen bg-gray-50 pt-16">
        <BlogPostSkeleton />
      </section>
    );

  if (isError || !post)
    return (
      <section className="min-h-screen bg-gray-50 pt-20 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 text-sm">
          Post not found or failed to load.
        </p>
        <Link
          to="/blog"
          className="text-xs font-semibold text-primary hover:underline"
        >
          Back to all posts
        </Link>
      </section>
    );

  return (
    <section className="min-h-screen bg-gray-50 ">
      {/* ── Full-bleed hero banner ───────────────────────────────────────── */}
      <div className="relative w-full h-64 md:h-[520px] overflow-hidden">
        <img src={post.heroImage} alt={post.title} className="w-full h-full" />
        {/* Gradient overlay — darker at bottom so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Back button on top of banner */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-20 left-4 md:left-8 lg:left-12 flex items-center gap-1.5 text-xs font-medium text-white/80 hover:text-white transition-colors cursor-pointer bg-black/20 hover:bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full"
        >
          <ArrowLeft className="size-3.5" />
          Back to Blog
        </button>

        {/* Title overlaid on banner bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 lg:px-12 pb-8 max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${tagColors[post.tag] ?? "bg-gray-100 text-gray-500"}`}
            >
              <Tag className="size-3 inline mr-1" />
              {post.tag}
            </span>
            <span className="text-[11px] text-white/70 flex items-center gap-1">
              <CalendarDays className="size-3" />
              {formatDate(post.createdAt)}
            </span>
            <span className="text-[11px] text-white/70 flex items-center gap-1">
              <Clock className="size-3" />
              {post.readTime} min read
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-white leading-tight max-w-3xl drop-shadow-md">
            {post.title}
          </h1>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-10">
        <div className="flex gap-12 items-start">
          {/* ── Main content ──────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Excerpt */}
            <p className="text-base text-gray-500 leading-relaxed border-l-4 border-primary pl-4 mb-8 italic">
              {post.excerpt}
            </p>

            {/* TipTap HTML content */}
            <div
              className="
                prose prose-sm md:prose-base max-w-none
                prose-headings:font-black prose-headings:text-gray-900 prose-headings:tracking-tight
                prose-p:text-gray-600 prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-2xl prose-img:shadow-md prose-img:w-full
                prose-ul:text-gray-600 prose-ol:text-gray-600
                prose-strong:text-gray-800
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:text-gray-500 prose-blockquote:italic
                prose-li:marker:text-primary
                mb-10
              "
              dangerouslySetInnerHTML={{__html: post.content}}
            />

            {/* CTA — inline on mobile */}
            {post.cta?.label && post.cta?.url && (
              <div className="lg:hidden bg-gradient-to-r from-primary/10 to-orange-50 border border-primary/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {post.cta.title ?? "Ready to get started?"}
                  </p>
                  {post.cta.description && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {post.cta.description}
                    </p>
                  )}
                </div>
                <Link
                  to={post.cta.url}
                  target="_blank"
                  className="shrink-0 bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
                >
                  {post.cta.label}
                </Link>
              </div>
            )}

            {/* Related posts — inline on mobile */}
            {post.relatedPosts?.length > 0 && (
              <div className="lg:hidden">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                  Related Posts
                </p>
                <div className="flex flex-col divide-y divide-gray-100 border border-gray-100 rounded-2xl bg-white overflow-hidden">
                  {post.relatedPosts.map((related) => (
                    <RelatedCard key={related.slug} post={related} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sticky sidebar — desktop only ─────────────────────────── */}
          <aside className="hidden lg:flex flex-col gap-5 w-72 shrink-0 sticky top-24">
            {/* CTA card */}
            {post.cta?.label && post.cta?.url && (
              <div className="bg-gradient-to-br from-primary/10 to-orange-50 border border-primary/20 rounded-2xl p-5">
                <p className="text-sm font-black text-gray-900 leading-tight mb-2">
                  {post.cta.title ?? "Ready to get started?"}
                </p>
                {post.cta.description && (
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                    {post.cta.description}
                  </p>
                )}
                <Link
                  to={post.cta.url}
                  target="_blank"
                  className="flex items-center justify-center gap-1.5 w-full bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
                >
                  {post.cta.label}
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            )}

            {/* Related posts */}
            {post.relatedPosts?.length > 0 && (
              <div className="bg-white border border-gray-100 rounded-2xl p-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2 px-1">
                  Related Posts
                </p>
                <div className="divide-y divide-gray-50">
                  {post.relatedPosts.map((related) => (
                    <RelatedCard key={related.slug} post={related} />
                  ))}
                </div>
              </div>
            )}

            {/* Back to blog */}
            <Link
              to="/blog"
              className="flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-primary transition-colors py-2"
            >
              <ArrowLeft className="size-3.5" />
              Back to all posts
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
