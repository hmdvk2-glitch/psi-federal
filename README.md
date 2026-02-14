<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy the PSI Federal simulation app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Deploy to Render

I have added a `render.yaml` blueprint file to make deployment seamless.

1. **GitHub/GitLab**: Push this code to a repository.
2. **Render Dashboard**: 
   - Go to [dashboard.render.com](https://dashboard.render.com).
   - Click **New** > **Blueprint**.
   - Connect your repository.
   - Render will automatically detect the `render.yaml` and set up the Static Site with the following settings:
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `dist`
3. **Finish**: Your site will be live at a `.onrender.com` URL within a few minutes.
