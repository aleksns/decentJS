/**
 * Please, improve this component and fix all problems.
 *
 * What is important:
 * - design (extensibility, testability)
 * - code cleanliness, following best practices
 * - bugs
 * - consistency
 * - naming
 * - formatting
 *
 * Write your perfect code!
 */

import React, { useEffect, useState } from "react";

const url = "https://my-json-server.typicode.com/savayer/demo/posts";

export default function DecentJS() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(url);
      const json = await data.json();

      const fetchedPosts = json;

      function formatFetchedPosts() {
        fetchedPosts.forEach((post) => {
          post.body === null
            ? (post.body = {})
            : (post.body.en = formatBodyText(post.body.en));
        });
        function formatBodyText(text) {
          return text.slice(0, 50) + "...";
        }
      }

      formatFetchedPosts();
      setPosts(fetchedPosts);
    }

    fetchData();
  }, []);

  function Card(props) {
    const { post } = props;
    const linkClassName = post.id === 1 ? "card-link-red" : "";
    const target = post.id === 1 ? "_blank" : "";

    function analyticsTrackClick(link) {
      // sending clicked link url to analytics
      console.log(link);
    }

    return (
      <div className="card">
        <h4 className="card-title">{post.title.en}</h4>
        <p className="card-text">{post.body.en}</p>
        <a
          className={`card-link ${linkClassName}`}
          target={target}
          href={post.link}
          onClick={() => analyticsTrackClick(post.link)}
        >
          {post.link_title}
        </a>
      </div>
    );
  }

  return (
    <div className="posts">
      {posts && posts.map((post) => <Card key={post.id} post={post} />)}
    </div>
  );
}
