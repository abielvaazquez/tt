import express from "express";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

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
      console.log("Vite middleware mounted");
    } catch (e) {
      console.error("Failed to load Vite middleware:", e);
    }
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    console.log(`Serving static files from: ${distPath}`);
    
    app.use(express.static(distPath));
    
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server host: 0.0.0.0, port: ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical server error:", err);
  process.exit(1);
});
