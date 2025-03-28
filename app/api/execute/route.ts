import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { exec } from "child_process";
import { writeFile } from "fs/promises";
import { join } from "path";
import { promisify } from "util";

const execAsync = promisify(exec);

const TIMEOUT = 10000; // 10 seconds

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { code, language } = await req.json();

    if (!code || !language) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Create temporary files for each language
    const tempDir = join(process.cwd(), "tmp");
    const timestamp = Date.now();
    let output = "";

    switch (language.toLowerCase()) {
      case "python":
        const pyFile = join(tempDir, `${timestamp}.py`);
        await writeFile(pyFile, code);
        output = await runWithTimeout(`python ${pyFile}`);
        break;

      case "javascript":
        const jsFile = join(tempDir, `${timestamp}.js`);
        await writeFile(jsFile, code);
        output = await runWithTimeout(`node ${jsFile}`);
        break;

      case "go":
        const goFile = join(tempDir, `${timestamp}.go`);
        await writeFile(goFile, code);
        output = await runWithTimeout(`go run ${goFile}`);
        break;

      default:
        return new NextResponse("Unsupported language", { status: 400 });
    }

    return NextResponse.json({ output });
  } catch (error: any) {
    console.error("[EXECUTE_POST]", error);
    return NextResponse.json({ 
      output: error.message || "An error occurred while executing the code" 
    }, { status: 500 });
  }
}

async function runWithTimeout(command: string): Promise<string> {
  try {
    const result = await Promise.race([
      execAsync(command),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Execution timed out")), TIMEOUT)
      ),
    ]) as { stdout: string; stderr: string };

    return result.stderr || result.stdout;
  } catch (error: any) {
    throw new Error(error.message || "Execution failed");
  }
}
