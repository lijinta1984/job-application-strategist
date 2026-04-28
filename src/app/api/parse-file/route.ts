import { NextRequest, NextResponse } from "next/server";
import { extractText, getDocumentProxy } from "unpdf";
import mammoth from "mammoth";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const fileName = file.name.toLowerCase();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let text = "";

    if (fileName.endsWith(".pdf")) {
      const pdf = await getDocumentProxy(new Uint8Array(arrayBuffer));
      const result = await extractText(pdf, { mergePages: true });
      text = result.text as string;
    } else if (fileName.endsWith(".docx")) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else if (fileName.endsWith(".doc")) {
      // .doc (legacy Word) is not supported by mammoth — extract what we can
      // Fall back to raw text extraction attempt
      text = buffer.toString("utf-8").replace(/[^\x20-\x7E\n\r\t]/g, " ").replace(/\s{2,}/g, " ").trim();
      if (text.length < 50) {
        return NextResponse.json(
          { error: "Legacy .doc format is not well supported. Please save the file as .docx and try again." },
          { status: 422 }
        );
      }
    } else if (fileName.endsWith(".txt")) {
      text = buffer.toString("utf-8");
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload a .pdf, .docx, or .txt file." },
        { status: 400 }
      );
    }

    // Clean up extracted text
    text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();

    if (!text || text.length < 10) {
      return NextResponse.json(
        { error: "Could not extract text from the file. The file may be image-based or empty." },
        { status: 422 }
      );
    }

    return NextResponse.json({ text });
  } catch (err) {
    console.error("File parsing error:", err);
    return NextResponse.json(
      { error: "Failed to parse file. Please try pasting the text directly." },
      { status: 500 }
    );
  }
}
