import React, { useState, useRef } from "react";

const SwipeCard = ({ user, onLike, onDislike }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const cardRef = useRef(null);
  const startX = useRef(0);

  /* ---------------- START DRAG ---------------- */
  const handleStart = (clientX) => {
    setIsDragging(true);
    startX.current = clientX;
  };

  /* ---------------- DRAGGING ---------------- */
  const handleMove = (clientX) => {
    if (!isDragging) return;

    const deltaX = clientX - startX.current;
    setPosition({ x: deltaX, y: 0 });
  };

  /* ---------------- END DRAG ---------------- */
  const handleEnd = () => {
    setIsDragging(false);

    if (position.x > 120) {
      // Swipe Right (Like)
      animateOut("right");
      onLike && onLike(user._id);
    } else if (position.x < -120) {
      // Swipe Left (Dislike)
      animateOut("left");
      onDislike && onDislike(user._id);
    } else {
      // Reset position
      setPosition({ x: 0, y: 0 });
    }
  };

  /* ---------------- ANIMATE OUT ---------------- */
  const animateOut = (direction) => {
    const finalX = direction === "right" ? 1000 : -1000;
    setPosition({ x: finalX, y: 0 });

    setTimeout(() => {
      setPosition({ x: 0, y: 0 });
    }, 300);
  };

  /* ---------------- MOUSE EVENTS ---------------- */
  const onMouseDown = (e) => handleStart(e.clientX);
  const onMouseMove = (e) => handleMove(e.clientX);
  const onMouseUp = () => handleEnd();

  /* ---------------- TOUCH EVENTS ---------------- */
  const onTouchStart = (e) => handleStart(e.touches[0].clientX);
  const onTouchMove = (e) => handleMove(e.touches[0].clientX);
  const onTouchEnd = () => handleEnd();

  const rotate = position.x / 20;

  return (
    <div style={styles.wrapper}>
      <div
        ref={cardRef}
        style={{
          ...styles.card,
          transform: `translateX(${position.x}px) rotate(${rotate}deg)`,
          transition: isDragging ? "none" : "transform 0.3s ease",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={handleEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Image */}
        <img
          src={user.profilePic || "https://via.placeholder.com/400"}
          alt={user.name}
          style={styles.image}
        />

        {/* Overlay Info */}
        <div style={styles.info}>
          <h2 style={styles.name}>
            {user.name}, {user.age}
          </h2>

          {user.location && (
            <p style={styles.location}>📍 {user.location}</p>
          )}

          {user.bio && (
            <p style={styles.bio}>{user.bio}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={styles.actions}>
        <button
          style={styles.dislikeBtn}
          onClick={() => onDislike && onDislike(user._id)}
        >
          ❌
        </button>

        <button
          style={styles.likeBtn}
          onClick={() => onLike && onLike(user._id)}
        >
          ❤️
        </button>
      </div>
    </div>
  );
};

/* ---------------------- STYLES ---------------------- */
const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  card: {
    width: "350px",
    height: "500px",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    position: "relative",
    backgroundColor: "#fff",
    cursor: "grab",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  info: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
    color: "#fff",
    padding: "20px",
  },
  name: {
    margin: 0,
  },
  location: {
    fontSize: "14px",
  },
  bio: {
    fontSize: "13px",
    marginTop: "5px",
  },
  actions: {
    marginTop: "20px",
    display: "flex",
    gap: "40px",
  },
  likeBtn: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "none",
    fontSize: "22px",
    backgroundColor: "#ff3864",
    color: "#fff",
    cursor: "pointer",
  },
  dislikeBtn: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "none",
    fontSize: "22px",
    backgroundColor: "#eee",
    cursor: "pointer",
  },
};

export default SwipeCard;
