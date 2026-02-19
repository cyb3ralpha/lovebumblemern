import React from "react";

const Terms = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Terms & Conditions</h1>
        <p>Last Updated: {new Date().toLocaleDateString()}</p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using Love Bumble, you agree to be bound by these
            Terms & Conditions. If you do not agree, please do not use our
            platform.
          </p>
        </section>

        <section>
          <h2>2. Eligibility</h2>
          <p>
            You must be at least 18 years old to use Love Bumble. By creating
            an account, you confirm that you meet this requirement.
          </p>
        </section>

        <section>
          <h2>3. Account Responsibilities</h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            login credentials and for all activities that occur under your
            account.
          </p>
        </section>

        <section>
          <h2>4. User Conduct</h2>
          <ul>
            <li>No harassment, abuse, or hate speech.</li>
            <li>No sharing illegal, harmful, or explicit content.</li>
            <li>No impersonation of another person.</li>
            <li>No spam, scams, or fraudulent behavior.</li>
          </ul>
        </section>

        <section>
          <h2>5. Donations</h2>
          <p>
            Love Bumble operates as a donation-based platform. Donations are
            voluntary and non-refundable unless required by law.
          </p>
        </section>

        <section>
          <h2>6. Content Ownership</h2>
          <p>
            You retain ownership of your content. However, by posting content,
            you grant Love Bumble a limited license to display and distribute
            it within the platform.
          </p>
        </section>

        <section>
          <h2>7. Account Termination</h2>
          <p>
            We reserve the right to suspend or terminate accounts that violate
            these terms or harm other users.
          </p>
        </section>

        <section>
          <h2>8. Limitation of Liability</h2>
          <p>
            Love Bumble is not responsible for interactions between users. Use
            the platform at your own risk.
          </p>
        </section>

        <section>
          <h2>9. Privacy</h2>
          <p>
            Your use of the platform is also governed by our Privacy Policy.
          </p>
        </section>

        <section>
          <h2>10. Changes to Terms</h2>
          <p>
            We may update these terms from time to time. Continued use of the
            platform means you accept the updated terms.
          </p>
        </section>

        <section>
          <h2>11. Contact Us</h2>
          <p>
            If you have questions regarding these terms, please contact us at:
            support@lovebumble.com
          </p>
        </section>

        <div style={styles.footer}>
          <p>© {new Date().getFullYear()} Love Bumble. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "40px 20px",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    maxWidth: "900px",
    width: "100%",
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    lineHeight: "1.7",
  },
  footer: {
    marginTop: "40px",
    paddingTop: "20px",
    borderTop: "1px solid #eee",
    textAlign: "center",
    color: "#777",
    fontSize: "14px",
  },
};

export default Terms;
