import React from "react";

const MessageBubble = ({
  message,
  currentUserId,
  showAvatar = false,
  avatarUrl = "",
}) => {
  const isOwnMessage = message.sender === currentUserId;

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = () => {
    if (!isOwnMessage) return null;

    switch (message.status) {
      case "sent":
        return "✓";
      case "delivered":
        return "✓✓";
      case "seen":
        return "✓✓ (Seen)";
      default:
        return "";
    }
  };

  return (
    <div
      style={{
        ...styles.container,
        justifyContent: isOwnMessage ? "flex-end" : "flex-start",
      }}
    >
      {/* Avatar (optional) */}
      {!isOwnMessage && showAvatar && (
        <img
          src={avatarUrl || "https://via.placeholder.com/35"}
          alt="avatar"
          style={styles.avatar}
        />
      )}

      <div
        style={{
          ...styles.bubble,
          backgroundColor: isOwnMessage ? "#ff3864" : "#f1f1f1",
          color: isOwnMessage ? "#fff" : "#000",
          borderTopRightRadius: isOwnMessage ? "0px" : "16px",
          borderTopLeftRadius: isOwnMessage ? "16px" : "0px",
        }}
      >
        <p style={styles.text}>{message.content}</p>

        <div style={styles.footer}>
          <span style={styles.time}>
            {formatTime(message.createdAt)}
          </span>

          {isOwnMessage && (
            <span style={styles.status}>
              {getStatusIcon()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------------------- STYLES ---------------------- */
const styles = {
  container: {
    display: "flex",
    marginBottom: "10px",
    alignItems: "flex-end",
  },
  bubble: {
    maxWidth: "70%",
    padding: "10px 14px",
    borderRadius: "16px",
    fontSize: "14px",
    position: "relative",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },
  text: {
    margin: 0,
    wordWrap: "break-word",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "5px",
    fontSize: "11px",
    opacity: 0.7,
    gap: "6px",
  },
  time: {},
  status: {
    fontSize: "12px",
  },
  avatar: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    marginRight: "8px",
  },
};

export default MessageBubble;
