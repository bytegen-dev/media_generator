import { NextRequest, NextResponse } from "next/server";
import { generateImage } from "@/lib/imageEngines";

// In-memory storage for sessions (use Redis in production)
const sessions = new Map<
  string,
  {
    results: Array<{ engine: string; imageUrl?: string; error?: string }>;
    loadingStates: Record<string, boolean>;
    completed: boolean;
    prompt: string;
    engines: string[];
    size: string;
    numImages: number;
    keys: Record<string, string>;
  }
>();

export async function POST(request: NextRequest) {
  try {
    const { prompt, engines, size, numImages, keys } = await request.json();

    // Create session ID
    const sessionId = crypto.randomUUID();

    // Initialize session
    sessions.set(sessionId, {
      results: [],
      loadingStates: engines.reduce(
        (acc, engine) => ({ ...acc, [engine]: true }),
        {}
      ),
      completed: false,
      prompt,
      engines,
      size,
      numImages,
      keys,
    });

    // Start background processing
    processEnginesAsync(sessionId, engines, prompt, size, numImages, keys);

    return NextResponse.json({ sessionId });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to start image generation" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId || !sessions.has(sessionId)) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  const session = sessions.get(sessionId)!;

  return NextResponse.json({
    results: session.results,
    loadingStates: session.loadingStates,
    completed: session.completed,
  });
}

// Background processing function
async function processEnginesAsync(
  sessionId: string,
  engines: string[],
  prompt: string,
  size: string,
  numImages: number,
  keys: Record<string, string>
) {
  const session = sessions.get(sessionId);
  if (!session) return;

  // Process each engine
  for (const engine of engines) {
    try {
      const result = await generateImage(engine, prompt, size, numImages, keys);

      // Update session with result
      session.results.push({
        engine,
        imageUrl: result.imageUrl,
        error: result.error,
      });

      // Mark engine as completed
      session.loadingStates[engine] = false;
    } catch (error) {
      // Handle error
      session.results.push({
        engine,
        error: error instanceof Error ? error.message : "Unknown error",
      });

      session.loadingStates[engine] = false;
    }
  }

  // Mark session as completed
  session.completed = true;
}
