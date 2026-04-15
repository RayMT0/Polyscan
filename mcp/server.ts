import express from "express";
import { tools } from "./tools";

const app = express();
app.use(express.json());

app.post("/mcp", async (req, res) => {
  const { tool, input } = req.body;

  if (!tools[tool as keyof typeof tools]) {
    return res.status(400).json({ error: "Tool not found" });
  }

  try {
    const selectedTool = tools[tool as keyof typeof tools];
    const parsed = selectedTool.inputSchema.parse(input);
    const result = await selectedTool.handler(parsed);

    res.json({ result });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log("MCP server running on port 3001");
});