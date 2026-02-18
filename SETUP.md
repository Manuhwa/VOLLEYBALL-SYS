# Bulldogs Volleyball Club — Form setup

## 1. Google Sheets backend (recommended)

1. Go to [Google Drive](https://drive.google.com) and create a **new Google Sheet**.
2. Rename the first sheet tab to **Submissions** (if it isn’t already).
3. Go to **Extensions → Apps Script**. Delete any sample code and paste in the full contents of **Code.gs** from this folder. Save (Ctrl+S).
4. Click **Deploy → New deployment**. Choose **Web app**:
   - **Description:** Bulldogs Form
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Click **Deploy**. Copy the **Web app URL** (looks like `https://script.google.com/macros/s/.../exec`).

## 2. Connect the form

1. Open **config.js** in this folder.
2. Set **SUBMIT_URL** and **VIEW_URL** to that same Web app URL:
   ```js
   SUBMIT_URL: 'https://script.google.com/macros/s/YOUR_ID/exec',
   VIEW_URL: 'https://script.google.com/macros/s/YOUR_ID/exec',
   ```
3. If you host the form on a website, set **FORM_URL** to the full public form URL (e.g. `https://yoursite.github.io/volleyball-form/`) so “Share on WhatsApp” uses the correct link.

## 3. Coach password

- Open **coach.html** in an editor and find the line:  
  `var COACH_PASSWORD = 'bulldogs2025';`  
- Change `bulldogs2025` to a password only the coach knows. Share the coach page link only with the coach.

## 4. Hosting (so WhatsApp and view work)

Opening **index.html** from your computer (file://) works for testing, but:

- **Share on WhatsApp** will use a file path that others can’t open.
- **View submissions** and **Coach** pages may not load data from Google if the browser blocks cross-origin requests.

So for real use:

1. Host the folder on the web, e.g.:
   - **GitHub Pages**: put the project in a repo and enable Pages.
   - **Netlify**: drag the folder into [Netlify Drop](https://app.netlify.com/drop).
2. Use the hosted URL as **FORM_URL** in config.js (e.g. `https://yourusername.github.io/volleyball-form/`).
3. Share that form URL with players (e.g. via WhatsApp).

## 5. What each page does

| Page        | Who uses it | Purpose |
|------------|-------------|---------|
| **index.html** | Players     | Self-evaluation form. Submit ratings; no comments field. |
| **view.html**  | Anyone     | View all submissions (read-only). Coach comments column is visible. |
| **coach.html** | Coach only | Log in with coach password; add or edit **Coach comment** for each submission. |

Players get the form link (e.g. via WhatsApp) → they rate themselves and submit → submissions are stored in the Google Sheet. Everyone can open **view.html** to see submissions. Only the coach opens **coach.html**, logs in, and adds/edits comments.
