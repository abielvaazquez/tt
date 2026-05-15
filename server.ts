import express from "express";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;
  const distPath = path.resolve(process.cwd(), "dist");

  // API / Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", env: process.env.NODE_ENV });
  });

  // Use a more robust check for production
  const isProd = process.env.NODE_ENV === "production" || process.env.VITE_USER_NODE_ENV === "production";

  if (!isProd) {
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
      console.log("Vite middleware active");
    } catch (e) {
      console.warn("Vite not found, falling back to static serving");
      app.use(express.static(distPath));
    }
  } else {
    console.log("Production mode: serving static files from", distPath);
    app.use(express.static(distPath));
  }

  // CRITICAL: SPA Fallback
  // This handles refreshes on routes like /discover
  app.get("*", (req, res) => {
    // Avoid recursion for static assets that are actually missing
    if (req.path.includes(".") && !req.path.endsWith(".html")) {
      return res.status(404).send("Not found");
    }
    
    const indexPath = path.join(distPath, "index.html");
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error("Error sending index.html:", err);
        res.status(500).send("Index file not found. Please ensure the app is built.");
      }
    });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on 0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical server error:", err);
  process.exit(1);
});
