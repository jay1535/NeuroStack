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
    font-family: Inter, Arial, sans-serif;
    background:#0b0b0b;
    padding:40px;
  ">
    <div style="
      max-width:600px;
      margin:auto;
      background:#111111;
      border-radius:16px;
      padding:32px;
      box-shadow:0 0 0 1px rgba(255,255,255,0.05);
    ">

      <!-- Header -->
      <div style="text-align:center;margin-bottom:28px">
    
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
          font-size:13px;
          color:#9ca3af;
        ">
          New Message form Contact
        </p>
      </div>

      <!-- Meta -->
      <div style="
        margin-bottom:20px;
        font-size:14px;
        color:#e5e7eb;
      ">
        <p style="margin:6px 0">
          <strong style="color:#ffffff">Name:</strong> ${name}
        </p>
        <p style="margin:6px 0">
          <strong style="color:#ffffff">Email:</strong> ${email}
        </p>
      </div>

      <!-- Message -->
      <div style="
        margin-top:20px;
        padding:18px;
        background:#0f0f0f;
        border-radius:12px;
        color:#e5e7eb;
        line-height:1.6;
        font-size:14px;
        border:1px solid rgba(255,255,255,0.06);
      ">
        ${message}
      </div>

      <hr style="
        margin:32px 0;
        border:none;
        border-top:1px solid rgba(255,255,255,0.08);
      " />

      <!-- Footer -->
      <p style="
        font-size:12px;
        color:#9ca3af;
        text-align:center;
        margin:0;
      ">
        Sent from <strong style="color:#ffffff">NeuroStack</strong> contact page
      </p>
    </div>
  </div>
  `;
}
