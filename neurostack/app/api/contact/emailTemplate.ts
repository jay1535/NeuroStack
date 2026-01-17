export function contactEmailTemplate({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  return `
  <div style="
    font-family: Inter, -apple-system, BlinkMacSystemFont, Arial, sans-serif;
    background:#0b0b0b;
    padding:32px 12px;
  ">
    <div style="
      width:100%;
      max-width:620px;
      margin:0 auto;
      background:#111111;
      border-radius:18px;
      padding:28px 22px;
      box-sizing:border-box;
      box-shadow:
        0 0 0 1px rgba(255,255,255,0.06),
        0 16px 32px rgba(0,0,0,0.6);
    ">

      <!-- Header -->
      <div style="text-align:center;margin-bottom:28px">
        <div style="
          display:inline-block;
          padding:6px 14px;
          border-radius:999px;
          font-size:10.5px;
          letter-spacing:1px;
          color:#d4d4d8;
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          margin-bottom:12px;
        ">
          NEW CONTACT MESSAGE
        </div>

        <h2 style="
          margin:0;
          font-size:20px;
          font-weight:600;
          color:#ffffff;
          letter-spacing:0.3px;
        ">
          NeuroStack
        </h2>

        <p style="
          margin-top:6px;
          font-size:12.5px;
          color:#9ca3af;
        ">
          Someone reached out via your contact page
        </p>
      </div>

      <!-- Meta -->
      <div style="
        margin-bottom:22px;
        padding:16px;
        border-radius:14px;
        background:#0f0f0f;
        border:1px solid rgba(255,255,255,0.06);
        font-size:13.5px;
        color:#e5e7eb;
        line-height:1.5;
      ">
        <p style="margin:6px 0">
          <strong style="color:#ffffff">Name</strong><br />
          ${name}
        </p>

        <p style="margin:12px 0 4px">
          <strong style="color:#ffffff">Email</strong><br />
          <a
            href="mailto:${email}"
            style="
              color:#c084fc;
              text-decoration:none;
              word-break:break-all;
            "
          >
            ${email}
          </a>
        </p>
      </div>

      <!-- Message -->
      <div style="
        padding:18px;
        background:#0c0c0c;
        border-radius:14px;
        color:#e5e7eb;
        line-height:1.6;
        font-size:14px;
        border:1px solid rgba(255,255,255,0.08);
        white-space:pre-wrap;
        word-break:break-word;
      ">
        ${message}
      </div>

      <hr style="
        margin:28px 0 20px;
        border:none;
        border-top:1px solid rgba(255,255,255,0.08);
      " />

      <!-- Footer -->
      <p style="
        font-size:11.5px;
        color:#9ca3af;
        text-align:center;
        margin:0;
        line-height:1.5;
      ">
        This message was sent from the
        <strong style="color:#ffffff"> NeuroStack </strong>
        contact page.<br />
        Reply directly to respond to the sender.
      </p>

    </div>
  </div>
  `;
}
