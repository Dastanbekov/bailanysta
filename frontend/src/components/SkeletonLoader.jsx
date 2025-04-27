import React from 'react';

function SkeletonLoader({ type = 'post', count = 1 }) {
  // Create a post skeleton
  const renderPostSkeleton = (key) => (
    <div className="skeleton-post" key={key}>
      <div className="skeleton-post-header">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-author">
          <div className="skeleton-line-small"></div>
          <div className="skeleton-line-xsmall"></div>
        </div>
      </div>
      <div className="skeleton-content">
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line-medium"></div>
      </div>
      <div className="skeleton-post-actions">
        <div className="skeleton-action-btn"></div>
        <div className="skeleton-action-btn"></div>
        <div className="skeleton-action-btn"></div>
      </div>
    </div>
  );
  
  // Create a profile skeleton
  const renderProfileSkeleton = () => (
    <div className="skeleton-profile">
      <div className="skeleton-profile-header">
        <div className="skeleton-avatar-large"></div>
        <div className="skeleton-line-medium"></div>
        <div className="skeleton-line-small"></div>
      </div>
      <div className="skeleton-profile-stats">
        <div className="skeleton-stat-item"></div>
        <div className="skeleton-stat-item"></div>
        <div className="skeleton-stat-item"></div>
      </div>
      <div className="skeleton-profile-content">
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line-medium"></div>
      </div>
    </div>
  );

  // Create items based on type and count
  const renderItems = () => {
    const items = [];
    for (let i = 0; i < count; i++) {
      switch (type) {
        case 'post':
          items.push(renderPostSkeleton(i));
          break;
        case 'profile':
          items.push(renderProfileSkeleton(i));
          break;
        default:
          items.push(renderPostSkeleton(i));
      }
    }
    return items;
  };

  return <div className="skeleton-loader">{renderItems()}</div>;
}

export default SkeletonLoader; 