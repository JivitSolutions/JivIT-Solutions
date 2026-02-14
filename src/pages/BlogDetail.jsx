import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

const BlogDetail = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from('blogs')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (error) throw error;
                setPost(data);
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    if (loading) return (
        <div className="loading-state-full">
            <div className="premium-spinner"></div>
            <p>Decoding Perspectives...</p>
        </div>
    );

    if (!post) return (
        <div className="container" style={{ padding: '120px 0', textAlign: 'center' }}>
            <h2>Story not found</h2>
            <Link to="/blog" className="btn btn-outline" style={{ marginTop: '2rem' }}>Back to Editorial</Link>
        </div>
    );

    return (
        <main className="blog-detail-page">
            <article className="post-article">
                <header className="post-header">
                    <div className="container">
                        <Link to="/blog" className="back-link">← Back to Insights</Link>
                        <span className="post-category-tag">{post.category}</span>
                        <h1>{post.title}</h1>
                        <p className="post-meta">
                            {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>
                </header>

                <div className="post-hero-image">
                    <img src={post.image_url || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200"} alt={post.title} />
                </div>

                <div className="container post-container">
                    <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />

                    <footer className="post-footer">
                        <hr />
                        <div className="post-share">
                            <span>Share Perspective:</span>
                            {/* Social icons placeholder */}
                        </div>
                    </footer>
                </div>
            </article>
        </main>
    );
};

export default BlogDetail;
