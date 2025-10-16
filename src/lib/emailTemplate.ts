export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to Scribbly</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        color: #333333;
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
      }
      .header h1 {
        margin: 0;
        color: #4a4a4a;
      }
      .body {
        font-size: 16px;
        line-height: 1.6;
      }
      .body p {
        margin-bottom: 16px;
      }
      .cta-button {
        display: inline-block;
        margin-top: 20px;
        background-color: #5e60ce;
        color: #ffffff !important;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 4px;
        font-weight: bold;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #999999;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Welcome to Scribbly, {{name}}!</h1>
      </div>
      <div class="body">
        <p>
          We're thrilled to have you join <strong>Scribbly</strong> — your new favorite place to
          share ideas, tell stories, and connect with curious minds.
        </p>
        <p>
          Whether you're starting your writing journey or continuing your blog, Scribbly is here to
          support you every step of the way.
        </p>
        <p>
          You don’t need to be a professional — just bring your voice. We believe everyone has a
          story worth sharing.
        </p>
        <p>
          <a href="http://localhost:3000" class="cta-button">Get started</a>
        </p>
        <p>Thanks for joining us — let’s make something amazing together.</p>
        <p>— The Scribbly Team</p>
      </div>
      <div class="footer">
        &copy; {{year}} Scribbly · <a href="mailto:support@scribbly.blog">support@scribbly.blog</a>
      </div>
    </div>
  </body>
</html>

`;
