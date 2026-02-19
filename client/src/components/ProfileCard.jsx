import React from "react";

const ProfileCard = ({
  user,
  currentUserId,
  onLike,
  onDislike,
  onEdit,
}) => {
  const isOwnProfile = user._id === currentUserId;

  return (
    <div style={styles.card}>
      {/* Profile Image */}
      <div style={styles.imageContainer}>
        <img
          src={user.profilePic || "https://via.placeholder.com/300"}
          alt={user.name}
          style={styles.image}
        />
      </div>

      {/* User Info */}
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

        {/* Interests */}
        {user.interests && user.interests.length > 0 && (
          <div style={styles.interestsContainer}>
            {user.interests.map((interest, index) => (
              <span key={index} style={styles.interestTag}>
                {interest}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div style={styles.actions}>
          {!isOwnProfile ? (
            <>
              <button
                style={styles.dislikeBtn}
                onClick={() => onDislike && onDislike(user._id)}
              >
                ❌ Dislike
              </button>

              <button
                style={styles.likeBtn}
                onClick={() => onLike && onLike(user._id)}
              >
                ❤️ Like
              </button>
            </>
          ) : (
            <button
              style={styles.editBtn}
              onClick={() => onEdit && onEdit()}
            >
              ✏️ Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------------------- STYLES ---------------------- */
const styles = {
  card: {
    maxWidth: "350px",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    margin: "20px auto",
    display: "flex",
    flexDirection: "column",
  },
  imageContainer: {
    width: "100%",
    height: "300px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  info: {
    padding: "20px",
  },
  name: {
    margin: "0 0 5px 0",
  },
  location: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "10px",
  },
  bio: {
    fontSize: "14px",
    marginBottom: "15px",
    lineHeight: "1.5",
  },
  interestsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "15px",
  },
  interestTag: {
    backgroundColor: "#ffe4ea",
    color: "#ff3864",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  likeBtn: {
    flex: 1,
    backgroundColor: "#ff3864",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  dislikeBtn: {
    flex: 1,
    backgroundColor: "#eee",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  editBtn: {
    width: "100%",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default ProfileCard;
